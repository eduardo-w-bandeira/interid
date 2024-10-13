from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from trail import Router

router = Router(__file__)


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
