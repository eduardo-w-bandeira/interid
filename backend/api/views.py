import json
# from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import trails
# from django.views.decorators.http import require_POST
from . models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .ser import UserSer, IndividualSer, LegalEntitySer


router = trails.Router()


@router.auto_route()
class UserViews(APIView):

    def get(self, request):
        users = User.objects.all()
        ser = UserSer(users, many=True)
        return Response(ser.data)

    def post(self, request):
        ser = UserSer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)


@router.auto_route()
class IndividualViews(APIView):

    def get(self, request):
        individuals = Individual.objects.all()
        ser = IndividualSer(individuals, many=True)
        return Response(ser.data)

    def post(self, request):
        user_ser = UserSer(data=request.data)
        if user_ser.is_valid():
            user = user_ser.save()  # Save the user first
            individual_data = request.data
            # Add the user ID to the individual data
            individual_data['user'] = user.id
            individual_ser = IndividualSer(data=individual_data)
            if individual_ser.is_valid():
                individual_ser.save()
                return Response(individual_ser.data, status=201)
            else:
                user.delete()
                return Response(individual_ser.errors, status=400)
        return Response(user_ser.errors, status=400)


@router.auto_route(add_param="<int:id>")
class IndividualDetail(APIView):

    def get(self, request, id):
        individual = Individual.objects.get(id=id)
        ser = IndividualSer(individual)
        return Response(ser.data)

    def put(self, request, id):
        individual = Individual.objects.get(id=id)
        ser = IndividualSer(individual, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)

    def delete(self, request, id):
        individual = Individual.objects.get(id=id)
        individual.delete()
        return Response(status=204)


@router.auto_route()
class LegalEntityViews(APIView):

    def get(self, request):
        leg_entities = LegalEntity.objects.all()
        ser = LegalEntitySer(leg_entities, many=True)
        return Response(ser.data)

    def post(self, request):
        user_ser = UserSer(data=request.data)
        if user_ser.is_valid():
            user = user_ser.save()  # Save the user first
            leg_entity_data = request.data
            # Add the user ID to the individual data
            leg_entity_data['user'] = user.id
            leg_entity_ser = LegalEntitySer(data=leg_entity_data)
            if leg_entity_ser.is_valid():
                leg_entity_ser.save()
                return Response(leg_entity_ser.data, status=201)
            else:
                user.delete()
                return Response(leg_entity_ser.errors, status=400)
        return Response(user_ser.errors, status=400)


@router.auto_route(add_param="<int:id>")
class LegalEntityDetail(APIView):

    def get(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        ser = LegalEntitySer(legal_entity)
        return Response(ser.data)

    def put(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        ser = LegalEntitySer(legal_entity, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)

    def delete(self, request, id):
        legal_entity = LegalEntity.objects.get(id=id)
        legal_entity.delete()
        return Response(status=204)


@router.auto_route()
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


# def create_user(seed: Seed) -> User:
#     user = User.objects.create(
#         email=seed.email,
#         password=seed.password,
#         user_type=seed.user_type,
#         gov_id=seed.gov_id,
#         gov_id_type=seed.gov_id_type,
#         issuing_authority=seed.issuing_authority,
#         country=seed.country
#     )
#     return user


# @router.auto_route()
# @csrf_exempt
# @require_POST
# def post_user(request):
#     data: dict = json.loads(request.body)
#     seed = Seed(**data)
#     try:
#         user = create_user(seed)
#         user.save()
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=400)
#     seed.__dna__._create_dynamic_field("id")
#     seed.id = user.id
#     return JsonResponse({'message': f"User saved | {seed}"})


# @router.auto_route()
# @csrf_exempt
# @require_POST
# def post_individual(request):
#     data: dict = json.loads(request.body)
#     seed = Seed(**data)
#     seed.birth_date = trails.str_to_date(seed.birth_date)
#     try:
#         user = create_user(seed)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=400)
#     try:
#         individual = Individual.objects.create(
#             user=user,
#             first_name=seed.first_name,
#             last_name=seed.last_name,
#             birth_date=seed.birth_date)
#         individual.save()
#     except Exception as err:
#         return JsonResponse({'error': str(err)}, status=400)
#     return JsonResponse({'message': f"Individual saved | {seed}"})


# @router.auto_route()
# @csrf_exempt
# @require_POST
# def post_legal_entity(request):
#     data: dict = json.loads(request.body)
#     seed = Seed(**data)
#     seed.reg_date = trails.str_to_date(seed.reg_date)
#     try:
#         user = create_user(seed)
#     except Exception as err:
#         return JsonResponse({'error': str(err)}, status=400)
#     try:
#         legal_entity = LegalEntity.objects.create(
#             user=user,
#             legal_name=seed.legal_name,
#             business_name=seed.business_name,
#             reg_date=seed.reg_date
#         )
#         legal_entity.save()
#     except Exception as err:
#         return JsonResponse({'error': str(err)}, status=400)
#     return JsonResponse({'message': f"Legal entity saved | {seed}"})


# @router.auto_route()
# @csrf_exempt
# @require_POST
# def post_declaration(request):
#     data: dict = json.loads(request.body)
#     seed = Seed(**data)
#     user = User.objects.get(id=seed.user_id)
#     try:
#         declaration = Declaration.objects.create(
#             user=user,
#             title=seed.title,
#             content=seed.content,
#             allow_comments=seed.allow_comments
#         )
#         declaration.save()
#     except Exception as err:
#         return JsonResponse({'error': str(err)}, status=400)
#     return JsonResponse({'message': f"Declaration saved | {seed}"})
