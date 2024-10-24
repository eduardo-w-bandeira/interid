import json
# from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from databarn import Seed
import trails
from . models import *

from rest_framework.views import APIView
from rest_framework.response import Response
from .ser import UserSer


class UserView(APIView):

    def get(self, request):
        users = User.objects.all()
        serializer = UserSer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class IndividualView(APIView):

    def get(self, request):
        individuals = Individual.objects.all()
        serializer = UserSer(individuals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


router = trails.Router()


@router.autoendpoint()
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


def create_user(seed: Seed) -> User:
    user = User.objects.create(
        email=seed.email,
        password=seed.password,
        user_type=seed.user_type,
        gov_id=seed.gov_id,
        gov_id_type=seed.gov_id_type,
        issuing_authority=seed.issuing_authority,
        country=seed.country
    )
    return user


@router.autoendpoint()
@csrf_exempt
@require_POST
def post_user(request):
    data: dict = json.loads(request.body)
    seed = Seed(**data)
    try:
        user = create_user(seed)
        user.save()
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    seed.__dna__._create_dynamic_field("id")
    seed.id = user.id
    return JsonResponse({'message': f"User saved | {seed}"})


@router.autoendpoint()
@csrf_exempt
@require_POST
def post_individual(request):
    data: dict = json.loads(request.body)
    seed = Seed(**data)
    seed.birth_date = trails.str_to_date(seed.birth_date)
    try:
        user = create_user(seed)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    try:
        individual = Individual.objects.create(
            user=user,
            first_name=seed.first_name,
            last_name=seed.last_name,
            birth_date=seed.birth_date)
        individual.save()
    except Exception as err:
        return JsonResponse({'error': str(err)}, status=400)
    return JsonResponse({'message': f"Individual saved | {seed}"})


@router.autoendpoint()
@csrf_exempt
@require_POST
def post_legal_entity(request):
    data: dict = json.loads(request.body)
    seed = Seed(**data)
    seed.reg_date = trails.str_to_date(seed.reg_date)
    try:
        user = create_user(seed)
    except Exception as err:
        return JsonResponse({'error': str(err)}, status=400)
    try:
        legal_entity = LegalEntity.objects.create(
            user=user,
            legal_name=seed.legal_name,
            business_name=seed.business_name,
            reg_date=seed.reg_date
        )
        legal_entity.save()
    except Exception as err:
        return JsonResponse({'error': str(err)}, status=400)
    return JsonResponse({'message': f"Legal entity saved | {seed}"})


@router.autoendpoint()
@csrf_exempt
@require_POST
def post_declaration(request):
    data: dict = json.loads(request.body)
    seed = Seed(**data)
    user = User.objects.get(id=seed.user_id)
    try:
        declaration = Declaration.objects.create(
            user=user,
            title=seed.title,
            content=seed.content,
            allow_comments=seed.allow_comments
        )
        declaration.save()
    except Exception as err:
        return JsonResponse({'error': str(err)}, status=400)
    return JsonResponse({'message': f"Declaration saved | {seed}"})
