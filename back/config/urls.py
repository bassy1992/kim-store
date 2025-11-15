"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.views.decorators.csrf import ensure_csrf_cookie

# Import admin customization
from . import admin as custom_admin
from .test_views import api_status, api_stats, health_check, cors_test
from .simple_cors_view import simple_cors_test

urlpatterns = [
    path('', RedirectView.as_view(url='/api/docs/', permanent=False)),
    path('admin/', admin.site.urls),
    
    # Test endpoints for frontend connection
    path('health/', health_check, name='health_check'),
    path('api/status/', api_status, name='api_status'),
    path('api/stats/', api_stats, name='api_stats'),
    path('api/cors-test/', cors_test, name='cors_test'),
    path('simple-cors-test/', simple_cors_test, name='simple_cors_test'),
    
    # API documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # API endpoints
    path('api/', include('apps.products.urls')),
    path('api/', include('apps.customers.urls')),
    path('api/', include('apps.orders.urls')),
    path('api/', include('apps.reviews.urls')),
    path('api/', include('apps.blog.urls')),
    path('api/', include('apps.content.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
