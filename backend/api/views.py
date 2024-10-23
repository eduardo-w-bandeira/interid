import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from databarn import Seed
import trails
from .models import User


# Pre-defined here
# from django.shortcuts import render

router = trails.Router()


@router.autoendpoint()
@csrf_exempt  # to bypass CSRF for simplicity
def multiply_by_two(request):
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


def add_user(data: dict) -> User:
    seed = Seed(**data)
    user = User.objects.create(
        email=seed.email,
        password=seed.password,
        user_type=seed.user_type,
        gov_id=seed.gov_id,
        gov_id_type=seed.gov_id_type,
        issuing_authority=seed.issuing_authority,
        country=seed.country
    )
    user.save()
    seed.__dna__._create_dynamic_field("id")
    seed.id = user.id
    user.seed = seed
    return user


@router.autoendpoint()
@csrf_exempt
@require_POST
def register_user(request):
    data: dict = json.loads(request.body)
    try:
        user = add_user(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'message': f"User saved | {user.seed}"})
