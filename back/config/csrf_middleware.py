import re
from django.middleware.csrf import CsrfViewMiddleware
from django.conf import settings

class CustomCsrfMiddleware(CsrfViewMiddleware):
    """
    Custom CSRF middleware that exempts certain URLs from CSRF protection
    """
    
    def process_request(self, request):
        # Get exempt URLs from settings
        exempt_urls = getattr(settings, 'CSRF_EXEMPT_URLS', [])
        
        # Check if current path matches any exempt pattern
        for pattern in exempt_urls:
            if re.match(pattern, request.path_info):
                setattr(request, '_dont_enforce_csrf_checks', True)
                break
        
        return super().process_request(request)