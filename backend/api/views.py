import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import User
import trails

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


@router.autoendpoint()
@csrf_exempt
@require_POST
def register_individual(request):
    data = json.loads(request.body)
