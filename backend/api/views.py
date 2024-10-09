from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt  # Just for test
def multiply(request):
    if request.method == 'POST':
        try:
            # Get the number from the request body
            data = json.loads(request.body)
            number = data.get('number')

            if number is not None:
                result = number * 2
                return JsonResponse({'result': result})
            else:
                return JsonResponse({'error': 'Number not provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
