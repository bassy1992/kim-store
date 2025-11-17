from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, OrderViewSet
from .paystack_views import initialize_payment, verify_payment, paystack_webhook

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Explicit cart endpoints (more specific routes first)
    path('cart/', CartViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='cart-list'),
    
    path('cart/items/', CartViewSet.as_view({
        'post': 'add_item'
    }), name='cart-items'),
    
    path('cart/items/<int:item_id>/', CartViewSet.as_view({
        'patch': 'update_item',
        'delete': 'remove_item'
    }), name='cart-item-detail'),
    
    path('cart/clear/', CartViewSet.as_view({
        'delete': 'clear_cart'
    }), name='cart-clear'),
    
    path('cart/apply-promo/', CartViewSet.as_view({
        'post': 'apply_promo_code'
    }), name='cart-apply-promo'),
    
    path('cart/remove-promo/', CartViewSet.as_view({
        'post': 'remove_promo_code'
    }), name='cart-remove-promo'),
    
    path('cart/debug/', CartViewSet.as_view({
        'get': 'debug_cart'
    }), name='cart-debug'),
    
    # Router handles order endpoints only
    path('', include(router.urls)),
    
    # Paystack payment endpoints
    path('paystack/initialize/', initialize_payment, name='paystack-initialize'),
    path('paystack/verify/', verify_payment, name='paystack-verify'),
    path('paystack/webhook/', paystack_webhook, name='paystack-webhook'),
]
