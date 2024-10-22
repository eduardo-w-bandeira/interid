from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from databarn import Seed
import trail
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

router = trail.Router()


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
    try:
        user = User.objects.create_user(**data)
    except ValidationError as e:
        return JsonResponse({'error': e.message_dict}, status=400)
    user.save()
    return JsonResponse({'message': "User registered successfully"})
