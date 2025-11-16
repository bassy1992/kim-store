"""
Custom middleware to fix CORS issues with credentials
"""
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin


class CorsCredentialsMiddleware(MiddlewareMixin):
    """
    Middleware to handle CORS with credentials properly.
    When credentials are included, we need to return specific origin instead of wildcard.
    """
    
    def process_response(self, request, response):
        # Get the origin from the request
        origin = request.META.get('HTTP_ORIGIN')
        
        # Check if this is a credentials request
        has_credentials = request.META.get('HTTP_COOKIE') or 'credentials' in request.META.get('HTTP_AUTHORIZATION', '')
        
        # If we have an origin and it's a credentials request, set specific origin
        if origin and has_credentials:
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Credentials'] = 'true'
        elif origin:
            # For non-credentials requests, allow wildcard
            response['Access-Control-Allow-Origin'] = '*'
        
        # Ensure other CORS headers are set
        if 'Access-Control-Allow-Methods' not in response:
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
        
        if 'Access-Control-Allow-Headers' not in response:
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        
        return response
