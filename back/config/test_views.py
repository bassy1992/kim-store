from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from apps.products.models import Category, Product
from apps.orders.models import PromoCode
from apps.blog.models import BlogPost

@api_view(['GET', 'OPTIONS'])
def api_status(request):
    """Simple API status endpoint to test frontend-backend connection"""
    from django.conf import settings
    
    return Response({
        'status': 'success',
        'message': 'Backend API is running',
        'frontend_url': 'https://front-pi-nine.vercel.app',
        'cors_enabled': True,
        'cors_allow_all_origins': getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False),
        'cors_allowed_origins': getattr(settings, 'CORS_ALLOWED_ORIGINS', []),
        'request_origin': request.META.get('HTTP_ORIGIN', 'No origin header'),
        'request_method': request.method,
        'database_status': 'connected'
    })

@api_view(['GET'])
def api_stats(request):
    """Get basic database statistics"""
    try:
        stats = {
            'categories': Category.objects.count(),
            'products': Product.objects.count(),
            'promo_codes': PromoCode.objects.filter(is_active=True).count(),
            'blog_posts': BlogPost.objects.filter(is_published=True).count(),
        }
        return Response({
            'status': 'success',
            'data': stats
        })
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=500)

def health_check(request):
    """Simple health check endpoint"""
    return JsonResponse({
        'status': 'healthy',
        'service': 'fragrance-store-api',
        'version': '1.0.0'
    })

@api_view(['GET', 'POST', 'OPTIONS'])
def cors_test(request):
    """CORS test endpoint"""
    from django.conf import settings
    
    response_data = {
        'message': 'CORS test successful',
        'method': request.method,
        'origin': request.META.get('HTTP_ORIGIN', 'No origin'),
        'cors_settings': {
            'CORS_ALLOW_ALL_ORIGINS': getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False),
            'CORS_ALLOWED_ORIGINS': getattr(settings, 'CORS_ALLOWED_ORIGINS', []),
            'CORS_ALLOW_CREDENTIALS': getattr(settings, 'CORS_ALLOW_CREDENTIALS', False),
        }
    }
    
    return Response(response_data)