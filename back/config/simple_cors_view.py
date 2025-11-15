from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def simple_cors_test(request):
    """Simple CORS test that manually adds headers"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'CORS preflight OK'})
    else:
        response = JsonResponse({
            'message': 'CORS test successful',
            'method': request.method,
            'origin': request.META.get('HTTP_ORIGIN', 'No origin'),
            'user_agent': request.META.get('HTTP_USER_AGENT', 'No user agent')
        })
    
    # Add CORS headers manually
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRFToken'
    response['Access-Control-Allow-Credentials'] = 'true'
    response['Access-Control-Max-Age'] = '86400'
    
    return response