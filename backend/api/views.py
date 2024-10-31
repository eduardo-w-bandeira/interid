import json
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
import trails
from .models import (User, Individual, LegalEntity, Declaration,
                     DeclarationComment, Agreement, AgreementParticipant)
from .slizer import *


wizroute = trails.Wizrouter()


def home(request):
    return redirect('api/')


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSlizer


class IndividualViewSet(ModelViewSet):
    queryset = Individual.objects.all()
    serializer_class = IndividualSlizer


class LegalEntityViewSet(ModelViewSet):
    queryset = LegalEntity.objects.all()
    serializer_class = LegalEntitySlizer


class DeclarationViewSet(ModelViewSet):
    queryset = Declaration.objects.all()
    serializer_class = DeclarationSlizer


class DeclarationCommentViewSet(ModelViewSet):
    queryset = DeclarationComment.objects.all()
    serializer_class = DeclarationCommentSlizer


class AgreementViewSet(ModelViewSet):
    queryset = Agreement.objects.all()
    serializer_class = AgreementSlizer


class AgreementParticipantViewSet(ModelViewSet):
    queryset = AgreementParticipant.objects.all()
    serializer_class = AgreementParticipantSlizer

# @wizroute.auto_reg()
# class IndividualViews(APIView):

#     def get(self, request):
#         individuals = Individual.objects.all()
#         slized = IndividualSlizer(individuals, many=True)
#         return Response(slized.data)

#     def post(self, request):
#         user_ser = UserSlizer(data=request.data)
#         if user_ser.is_valid():
#             user = user_ser.save()  # Save the user first
#             individual_data = request.data
#             # Add the user ID to the individual data
#             individual_data['user'] = user.id
#             individual_ser = IndividualSlizer(data=individual_data)
#             if individual_ser.is_valid():
#                 individual_ser.save()
#                 return Response(individual_ser.data, status=201)
#             else:
#                 user.delete()
#                 return Response(individual_ser.errors, status=400)
#         return Response(user_ser.errors, status=400)


# @wizroute.auto_reg(param="<int:id>")
# class IndividualDetail(APIView):

#     def get(self, request, id):
#         individual = Individual.objects.get(id=id)
#         slized = IndividualSlizer(individual)
#         return Response(slized.data)

#     def put(self, request, id):
#         individual = Individual.objects.get(id=id)
#         slized = IndividualSlizer(individual, data=request.data)
#         if slized.is_valid():
#             slized.save()
#             return Response(slized.data, status=201)
#         return Response(slized.errors, status=400)

#     def delete(self, request, id):
#         individual = Individual.objects.get(id=id)
#         individual.delete()
#         return Response(status=204)


@wizroute.auto_reg()
class LegalEntityViews(APIView):

    def get(self, request):
        leg_entities = LegalEntity.objects.all()
        slized = LegalEntitySlizer(leg_entities, many=True)
        return Response(slized.data)

    def post(self, request):
        user_ser = UserSlizer(data=request.data)
        if user_ser.is_valid():
            user = user_ser.save()  # Save the user first
            leg_entity_data = request.data
            # Add the user ID to the individual data
            leg_entity_data['user'] = user.id
            leg_entity_ser = LegalEntitySlizer(data=leg_entity_data)
            if leg_entity_ser.is_valid():
                leg_entity_ser.save()
                return Response(leg_entity_ser.data, status=201)
            else:
                user.delete()
                return Response(leg_entity_ser.errors, status=400)
        return Response(user_ser.errors, status=400)


@wizroute.auto_reg(param="<int:id>")
class LegalEntityDetail(APIView):

    def get(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        slized = LegalEntitySlizer(legal_entity)
        return Response(slized.data)

    def put(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        slized = LegalEntitySlizer(legal_entity, data=request.data)
        if slized.is_valid():
            slized.save()
            return Response(slized.data, status=201)
        return Response(slized.errors, status=400)

    def delete(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        legal_entity.delete()
        return Response(status=204)


@wizroute.auto_reg()
@csrf_exempt  # to bypass CSRF for simplicity
def multiply(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            number = data.get('number')
            if number is not None:
                result = number * 2
                return JsonResponse({'result': result})
            else:
                return JsonResponse({'error': 'No number provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSlizer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSlizer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.user_type == 'individual':
            individual = Individual.objects.get(user=user)
            data = IndividualSlizer(individual).data
        elif user.user_type == 'legal_entity':
            legal_entity = LegalEntity.objects.get(user=user)
            data = LegalEntitySlizer(legal_entity).data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_spec': data}, status=status.HTTP_200_OK)
