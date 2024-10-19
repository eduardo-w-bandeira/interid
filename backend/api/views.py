from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from databarn import Seed
import trail

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
def register_user(request):
    data = json.loads(request.body)
    user = Seed(**data)
    user.birth_date = trail.str_to_date(user.birth_date)
    user.reg_date = trail.str_to_date(user.reg_date)
    return JsonResponse({'message': str(user)})
