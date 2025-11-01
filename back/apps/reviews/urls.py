from django.urls import path
from .views import ReviewViewSet

urlpatterns = [
    # Nested under products
    path('products/<int:product_id>/reviews/', ReviewViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='product-reviews'),
    path('reviews/<int:pk>/', ReviewViewSet.as_view({
        'delete': 'destroy'
    }), name='review-detail'),
]
