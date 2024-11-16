# import json
from django.shortcuts import redirect
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
# from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (User, Individual, LegalEntity, Declaration,
                     DeclarationComment, Agreement, AgreementParticipant)
from .slizer import *
from trails import Wizrouter

wizrouter = Wizrouter()


def home(request):
    return redirect('api/')


@wizrouter.auto_route()
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSlizer
    permission_classes = [IsAuthenticated]

    # def get_permissions(self):
    #     if self.action == 'retrieve':
    #         return [AllowAny()]
    #     return super().get_permissions()


@wizrouter.auto_route()
class IndividualViewSet(ModelViewSet):
    queryset = Individual.objects.all()
    serializer_class = IndividualSlizer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        user_slizer = UserSlizer(data=request.data)
        if user_slizer.is_valid():
            user = user_slizer.save()  # Save the user first
            individual_data = request.data.copy()
            # Add the user ID to the individual data
            individual_data['user'] = user.id
            individual_slizer = IndividualSlizer(data=individual_data)
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
    serializer_class = LegalEntitySlizer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        user_slizer = UserSlizer(data=request.data)
        if user_slizer.is_valid():
            user = user_slizer.save()  # Save the user first
            leg_entity_data = request.data.copy()
            # Add the user ID to the individual data
            leg_entity_data['user'] = user.id
            leg_entity_slizer = LegalEntitySlizer(data=leg_entity_data)
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
    serializer_class = DeclarationSlizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.GET.get('user')
        if user_id:
            return Declaration.objects.filter(user=user_id)
        return Declaration.objects.all()

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [AllowAny()]
    #     return super().get_permissions()


@wizrouter.auto_route()
class DeclarationCommentViewSet(ModelViewSet):
    queryset = DeclarationComment.objects.all()
    serializer_class = DeclarationCommentSlizer


@wizrouter.auto_route()
class AgreementViewSet(ModelViewSet):
    queryset = Agreement.objects.all()
    serializer_class = AgreementSlizer


@wizrouter.auto_route()
class AgreementParticipantViewSet(ModelViewSet):
    queryset = AgreementParticipant.objects.all()
    serializer_class = AgreementParticipantSlizer


@wizrouter.auto_route()
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSlizer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_data = UserSlizer(user).data
        refresh = RefreshToken.for_user(user)
        return Response(
            {'refresh': str(refresh),
             'access': str(refresh.access_token),
             'user': user_data},
            status=status.HTTP_200_OK)


# class IndividualViews(APIView):

#     def get(self, request):
#         individuals = Individual.objects.all()
#         slized = IndividualSlizer(individuals, many=True)
#         return Response(slized.data)

#     def post(self, request):
#         user_slized = UserSlizer(data=request.data)
#         if user_slized.is_valid():
#             user = user_slized.save()  # Save the user first
#             individual_data = request.data
#             # Add the user ID to the individual data
#             individual_data['user'] = user.id
#             individual_ser = IndividualSlizer(data=individual_data)
#             if individual_ser.is_valid():
#                 individual_ser.save()
#                 return Response(individual_ser.data, status=201)
#             else:
#                 # Delete the user if the individual is not valid
#                 user.delete()
#                 return Response(individual_ser.errors, status=400)
#         return Response(user_slized.errors, status=400)


# class IndividualDetail(APIView):

#     def get(self, request, pk):
#         individual = Individual.objects.get(pk=pk)
#         slized = IndividualSlizer(individual)
#         return Response(slized.data)

#     def put(self, request, pk):
#         individual = Individual.objects.get(pk=pk)
#         slized = IndividualSlizer(individual, data=request.data)
#         if slized.is_valid():
#             slized.save()
#             return Response(slized.data, status=201)
#         return Response(slized.errors, status=400)

#     def delete(self, request, pk):
#         individual = Individual.objects.get(pk=pk)
#         individual.delete()
#         return Response(status=204)


# class LegalEntityViews(APIView):

#     def get(self, request):
#         leg_entities = LegalEntity.objects.all()
#         slized = LegalEntitySlizer(leg_entities, many=True)
#         return Response(slized.data)

#     def post(self, request):
#         user_slized = UserSlizer(data=request.data)
#         if user_slized.is_valid():
#             user = user_slized.save()  # Save the user first
#             leg_entity_data = request.data
#             # Add the user ID to the individual data
#             leg_entity_data['user'] = user.id
#             leg_entity_ser = LegalEntitySlizer(data=leg_entity_data)
#             if leg_entity_ser.is_valid():
#                 leg_entity_ser.save()
#                 return Response(leg_entity_ser.data, status=201)
#             else:
#                 user.delete()
#                 return Response(leg_entity_ser.errors, status=400)
#         return Response(user_slized.errors, status=400)


# class LegalEntityDetail(APIView):

#     def get(self, request, pk):
#         legal_entity = LegalEntity.objects.get(pk=pk)
#         slized = LegalEntitySlizer(legal_entity)
#         return Response(slized.data)

#     def put(self, request, pk):
#         legal_entity = LegalEntity.objects.get(pk=pk)
#         slized = LegalEntitySlizer(legal_entity, data=request.data)
#         if slized.is_valid():
#             slized.save()
#             return Response(slized.data, status=201)
#         return Response(slized.errors, status=400)

#     def delete(self, request, pk):
#         legal_entity = LegalEntity.objects.get(pk=pk)
#         legal_entity.delete()
#         return Response(status=204)

# @wizrouter.auto_route()
# @csrf_exempt  # to bypass CSRF for simplicity
# def multiply(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             number = data.get('number')
#             if number is not None:
#                 result = number * 2
#                 return JsonResponse({'result': result})
#             else:
#                 return JsonResponse({'error': 'No number provided'}, status=400)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)
