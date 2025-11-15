from django.contrib import admin
from .models import Cart, CartItem, Order, OrderItem, PromoCode


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ['product', 'quantity', 'size']


@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    list_display = ['code', 'description', 'discount_type', 'discount_value', 
                   'minimum_order_amount', 'used_count', 'usage_limit', 'is_active', 
                   'valid_from', 'valid_until']
    list_filter = ['discount_type', 'is_active', 'valid_from', 'valid_until']
    search_fields = ['code', 'description']
    list_editable = ['is_active']
    readonly_fields = ['used_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'description', 'is_active')
        }),
        ('Discount Settings', {
            'fields': ('discount_type', 'discount_value', 'minimum_order_amount', 'maximum_discount_amount')
        }),
        ('Usage Limits', {
            'fields': ('usage_limit', 'used_count')
        }),
        ('Validity Period', {
            'fields': ('valid_from', 'valid_until')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'session_key', 'promo_code', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['user__username', 'session_key', 'promo_code__code']
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ['product_name', 'product_price', 'quantity', 'size']
    readonly_fields = ['product_name', 'product_price', 'quantity', 'size']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'full_name', 'email', 'status', 'subtotal_amount', 
                   'discount_amount', 'total_amount', 'promo_code_used', 'created_at']
    list_filter = ['status', 'created_at', 'promo_code_used']
    search_fields = ['order_number', 'email', 'full_name', 'promo_code_used']
    readonly_fields = ['order_number', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    list_editable = ['status']
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'user', 'email', 'full_name', 'shipping_address', 'phone', 'status')
        }),
        ('Pricing', {
            'fields': ('subtotal_amount', 'discount_amount', 'total_amount')
        }),
        ('Promo Code Details', {
            'fields': ('promo_code_used', 'promo_discount_type', 'promo_discount_value'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
