import json
from datetime import datetime
from django.shortcuts import redirect
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
# from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer
from .models import *
from .serializer import *
from trails import Wizrouter

wizrouter = Wizrouter()


def home(request):
    return redirect('api/')


@wizrouter.auto_route()
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


@wizrouter.auto_route()
class IndividualViewSet(ModelViewSet):
    queryset = Individual.objects.all()
    serializer_class = IndividualSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        user_slizer = UserSerializer(data=request.data)
        if user_slizer.is_valid():
            user = user_slizer.save()  # Save the user first
            individual_data = request.data.copy()
            # Add the user ID to the individual data
            individual_data['user'] = user.id
            individual_slizer = IndividualSerializer(data=individual_data)
            if individual_slizer.is_valid():
                individual_slizer.save()
                return Response(individual_slizer.data, status=status.HTTP_201_CREATED)
            else:
                # Delete the user if the individual is not valid
                user.delete()
                return Response(individual_slizer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(user_slizer.errors, status=status.HTTP_400_BAD_REQUEST)


@wizrouter.auto_route()
class LegalEntityViewSet(ModelViewSet):
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntitySerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        user_slizer = UserSerializer(data=request.data)
        if user_slizer.is_valid():
            user = user_slizer.save()  # Save the user first
            leg_entity_data = request.data.copy()
            # Add the user ID to the individual data
            leg_entity_data['user'] = user.id
            leg_entity_slizer = LegalEntitySerializer(data=leg_entity_data)
            if leg_entity_slizer.is_valid():
                leg_entity_slizer.save()
                return Response(leg_entity_slizer.data, status=status.HTTP_201_CREATED)
            else:
                user.delete()
                return Response(leg_entity_slizer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(user_slizer.errors, status=status.HTTP_400_BAD_REQUEST)


@wizrouter.auto_route()
class DeclarationViewSet(ModelViewSet):
    queryset = Declaration.objects.all()
    serializer_class = DeclarationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.GET.get('user')
        if user_id:
            return Declaration.objects.filter(user=user_id)
        return Declaration.objects.all()

    def list(self, request, *args, **kwargs):
        user_id = request.GET.get('user')
        declarations = Declaration.objects.filter(
            user=user_id).order_by('-created_at')
        serializer = DeclarationSerializer(declarations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@wizrouter.auto_route()
class DeclarationCommentViewSet(ModelViewSet):
    queryset = DeclarationComment.objects.all()
    serializer_class = DeclarationCommentSerializer


@wizrouter.auto_route()
class AgreementViewSet(ModelViewSet):
    queryset = Agreement.objects.all()
    serializer_class = AgreementSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        agreement_slizer = AgreementSerializer(data=request.data)
        if agreement_slizer.is_valid():
            agreement = agreement_slizer.save()
        else:
            return Response(agreement_slizer.errors, status=status.HTTP_400_BAD_REQUEST)
        for user in [agreement.sender, agreement.receiver]:
            if user is agreement.sender:
                notification_body = (
                    f'You have sent the Agreement Proposal #{agreement.id} to '
                    f'{agreement.receiver.full_name} '
                    f'(ID: {agreement.receiver.id}).')
            else:
                notification_body = (
                    f'You have received the Agreement Proposal #{
                        agreement.id} from '
                    f'{agreement.sender.full_name} '
                    f'(ID: {agreement.sender.id}).')
            try:
                Notification.objects.create(
                    user=user,
                    type='proposal',
                    body=notification_body,
                    agreement=agreement)
            except Exception as err:
                agreement.delete()  # Delete the proposal if the notification fails
                return Response({'error': str(err)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(agreement_slizer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<int:agreement_id>')
@csrf_exempt
def update_agreement_decision(request, agreement_id):
    agreement = Agreement.objects.get(id=agreement_id)
    data = json.loads(request.body)
    agreement.has_approved = data.get('has_approved')
    agreement.approved_at = datetime.now()
    agreement.save()
    for user in [agreement.sender, agreement.receiver]:
        if user is agreement.sender:
            if agreement.has_approved:
                notification_body = (
                    f'{agreement.receiver.full_name} '
                    f'(ID: {agreement.receiver.id}) has APPROVED your Agreement Proposal #{agreement.id}.')
            elif agreement.has_approved is False:
                notification_body = (
                    f'{agreement.receiver.full_name} '
                    f'(ID: {agreement.receiver.id}) has REJECTED your Agreement Proposal #{agreement.id}.')
        else:
            if agreement.has_approved:
                notification_body = (
                    f'You have APPROVED the Agreement Proposal #{
                        agreement.id} '
                    f'from {agreement.sender.full_name} (ID: {agreement.sender.id})')
            elif agreement.has_approved is False:
                notification_body = (
                    f'You have REJECTED the Agreement Proposal #{
                        agreement.id} '
                    f'from {agreement.sender.full_name} (ID: {agreement.sender.id})')
        try:
            Notification.objects.create(
                user=user,
                type='agreement decision',
                body=notification_body,
                agreement=agreement)
        except Exception as err:
            agreement.delete()  # Delete the proposal if the notification fails
            return JsonResponse({'error': str(err)}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'message': 'Agreement decision updated'}, status=status.HTTP_200_OK)


@wizrouter.auto_route()
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_data = UserSerializer(user).data
        refresh = RefreshToken.for_user(user)
        return Response(
            {'refresh': str(refresh),
             'access': str(refresh.access_token),
             'user_data': user_data},
            status=status.HTTP_200_OK)


@wizrouter.auto_route()
class TokenRefreshView(TokenRefreshView):
    pass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<int:user_id>')
def count_unread_notifications(request, user_id):
    count = Notification.objects.filter(
        user=user_id, is_read=False).count()
    return JsonResponse({'unread_count': count}, status=status.HTTP_200_OK)


# @permission_classes([AllowAny])
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<int:user_id>')
def get_notifications(request, user_id):
    notifications = Notification.objects.filter(
        user=user_id).order_by('-created_at')
    slizer = NotificationSerializer(notifications, many=True)
    data = {'notifications': slizer.data}
    return JsonResponse(data, status=status.HTTP_200_OK)


# @permission_classes([AllowAny])
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<int:notification_id>')
@csrf_exempt
def mark_notification_as_read(request, notification_id):
    try:
        notification = Notification.objects.get(id=notification_id)
        notification.is_read = True
        notification.save()
    except Notification.DoesNotExist:
        return JsonResponse({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)
    return JsonResponse({'message': 'Notification marked as read'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<int:user_id>')
@csrf_exempt
def get_approved_agreements_by_user(request, user_id):
    agreements = Agreement.objects.filter(
        Q(sender=user_id) | Q(receiver=user_id), has_approved=True)
    slizer = AgreementSerializer(agreements, many=True)
    data = {'agreements': slizer.data}
    return JsonResponse(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@wizrouter.auto_route(param='<str:term>')
def search_users_by_name(request, term):
    users = User.objects.filter(
        Q(individual__first_name__icontains=term) |
        Q(individual__last_name__icontains=term) |
        Q(legalentity__legal_name__icontains=term) |
        Q(legalentity__business_name__icontains=term))
    slizer = UserSerializer(users, many=True)
    data = {'users': slizer.data}
    return JsonResponse(data, status=status.HTTP_200_OK)
