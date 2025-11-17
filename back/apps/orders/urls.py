from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, OrderViewSet
from .paystack_views import initialize_payment, verify_payment, paystack_webhook

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Explicit cart item endpoints BEFORE router (more specific routes first)
    path('cart/items/', CartViewSet.as_view({
        'post': 'add_item'
    }), name='cart-items'),
    
    path('cart/items/<int:item_id>/', CartViewSet.as_view({
        'patch': 'update_item',
        'delete': 'remove_item'
    }), name='cart-item-detail'),
    
    # Router handles cart list and order endpoints
    path('', include(router.urls)),
    
    # Paystack payment endpoints
    path('paystack/initialize/', initialize_payment, name='paystack-initialize'),
    path('paystack/verify/', verify_payment, name='paystack-verify'),
    path('paystack/webhook/', paystack_webhook, name='paystack-webhook'),
]
