from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.views import View

@csrf_exempt
def emergency_cors_handler(request):
    """Emergency CORS handler that responds to any request"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response.status_code = 200
    else:
        response = JsonResponse({
            'message': 'Emergency CORS endpoint working',
            'method': request.method,
            'path': request.path,
            'origin': request.META.get('HTTP_ORIGIN', 'No origin'),
            'user_agent': request.META.get('HTTP_USER_AGENT', 'No user agent'),
            'headers': dict(request.headers)
        })
    
    # Add comprehensive CORS headers
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
    response['Access-Control-Allow-Headers'] = '*'
    response['Access-Control-Allow-Credentials'] = 'true'
    response['Access-Control-Max-Age'] = '86400'
    response['Access-Control-Expose-Headers'] = '*'
    
    return response

@method_decorator(csrf_exempt, name='dispatch')
class EmergencyCorsView(View):
    """Emergency CORS view class"""
    
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        
        # Add CORS headers to all responses
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
        response['Access-Control-Allow-Headers'] = '*'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Max-Age'] = '86400'
        
        return response
    
    def options(self, request, *args, **kwargs):
        """Handle preflight OPTIONS requests"""
        return HttpResponse(status=200)
    
    def get(self, request, *args, **kwargs):
        return JsonResponse({
            'status': 'success',
            'message': 'Emergency CORS endpoint working',
            'method': 'GET'
        })
    
    def post(self, request, *args, **kwargs):
        return JsonResponse({
            'status': 'success', 
            'message': 'Emergency CORS endpoint working',
            'method': 'POST'
        })