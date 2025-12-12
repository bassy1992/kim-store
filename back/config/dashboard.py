from django.contrib.admin import AdminSite
from django.db import models
from django.db.models import Count, Sum, Avg
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.html import format_html


def get_dashboard_stats():
    """
    Get dashboard statistics for the admin home page
    """
    try:
        from apps.products.models import Product
        from apps.orders.models import Order
        from apps.customers.models import CustomerProfile
        from apps.reviews.models import Review
        
        stats = {
            'total_products': Product.objects.count(),
            'featured_products': Product.objects.filter(is_featured=True).count(),
            'low_stock_products': Product.objects.filter(stock_quantity__lt=10).count(),
            'total_orders': Order.objects.count(),
            'pending_orders': Order.objects.filter(status='pending').count(),
            'completed_orders': Order.objects.filter(status='completed').count(),
            'total_customers': CustomerProfile.objects.count(),
            'total_reviews': Review.objects.count(),
            'average_rating': Review.objects.aggregate(avg_rating=Avg('rating'))['avg_rating'] or 0,
        }
        
        # Recent orders
        recent_orders = Order.objects.select_related('user').order_by('-created_at')[:5]
        stats['recent_orders'] = recent_orders
        
        # Top products by reviews
        top_products = Product.objects.annotate(
            review_count=Count('review')
        ).order_by('-review_count')[:5]
        stats['top_products'] = top_products
        
        return stats
    except Exception as e:
        return {
            'error': str(e),
            'total_products': 0,
            'featured_products': 0,
            'low_stock_products': 0,
            'total_orders': 0,
            'pending_orders': 0,
            'completed_orders': 0,
            'total_customers': 0,
            'total_reviews': 0,
            'average_rating': 0,
            'recent_orders': [],
            'top_products': [],
        }


def get_quick_actions():
    """
    Get quick action links for the dashboard
    """
    return [
        {
            'title': 'Add New Product',
            'url': reverse('admin:products_product_add'),
            'icon': 'fas fa-plus-circle',
            'color': 'success'
        },
        {
            'title': 'View Orders',
            'url': reverse('admin:orders_order_changelist'),
            'icon': 'fas fa-shopping-cart',
            'color': 'info'
        },
        {
            'title': 'Manage Categories',
            'url': reverse('admin:products_category_changelist'),
            'icon': 'fas fa-tags',
            'color': 'warning'
        },
        {
            'title': 'Customer Reviews',
            'url': reverse('admin:reviews_review_changelist'),
            'icon': 'fas fa-star',
            'color': 'primary'
        },
    ]


class DashboardMixin:
    """
    Mixin to add dashboard functionality to admin site
    """
    
    def index(self, request, extra_context=None):
        """
        Override the admin index to add custom dashboard data
        """
        extra_context = extra_context or {}
        
        # Add dashboard stats
        extra_context.update({
            'dashboard_stats': get_dashboard_stats(),
            'quick_actions': get_quick_actions(),
            'show_dashboard': True,
        })
        
        return super().index(request, extra_context)