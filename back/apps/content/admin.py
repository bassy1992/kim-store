from django.contrib import admin
from django.utils.html import format_html
from .models import (
    FAQ, Testimonial, GalleryImage, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard, ContactMessage,
    Newsletter, DupeProduct, AirAmbience, PerfumeOil
)


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'order', 'is_published', 'created_at']
    list_filter = ['category', 'is_published']
    search_fields = ['question', 'answer']
    list_editable = ['order', 'is_published']
    ordering = ['order', 'category']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'rating', 'product_name', 'is_featured', 'is_published', 'created_at']
    list_filter = ['rating', 'is_featured', 'is_published']
    search_fields = ['customer_name', 'comment', 'product_name']
    list_editable = ['is_featured', 'is_published']
    ordering = ['-is_featured', '-created_at']


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'image_preview', 'order', 'is_published', 'created_at']
    list_filter = ['category', 'is_published']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_published']
    readonly_fields = ['image_preview']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category', 'order', 'is_published')
        }),
        ('Image - Choose ONE option', {
            'fields': ('image_file', 'image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
    )
    
    def image_preview(self, obj):
        url = obj.url if hasattr(obj, 'url') else obj.image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(ShippingInfo)
class ShippingInfoAdmin(admin.ModelAdmin):
    list_display = ['title', 'free_shipping_threshold', 'standard_delivery_days', 'international_shipping', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'content')
        }),
        ('Shipping Details', {
            'fields': ('free_shipping_threshold', 'standard_delivery_days', 'express_delivery_days', 'international_shipping')
        }),
    )


@admin.register(ReturnPolicy)
class ReturnPolicyAdmin(admin.ModelAdmin):
    list_display = ['title', 'return_window_days', 'refund_processing_days', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'content')
        }),
        ('Policy Details', {
            'fields': ('return_window_days', 'refund_processing_days')
        }),
    )


@admin.register(TermsAndConditions)
class TermsAndConditionsAdmin(admin.ModelAdmin):
    list_display = ['title', 'effective_date', 'updated_at']
    ordering = ['-effective_date']


@admin.register(PrivacyPolicy)
class PrivacyPolicyAdmin(admin.ModelAdmin):
    list_display = ['title', 'effective_date', 'updated_at']
    ordering = ['-effective_date']


@admin.register(GiftCard)
class GiftCardAdmin(admin.ModelAdmin):
    list_display = ['name', 'amount', 'image_preview', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    list_editable = ['is_active']
    readonly_fields = ['image_preview']
    ordering = ['amount']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'amount', 'is_active')
        }),
        ('Image - Choose ONE option', {
            'fields': ('image_file', 'image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
    )
    
    def image_preview(self, obj):
        url = obj.url if hasattr(obj, 'url') else obj.image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'is_replied', 'created_at']
    list_filter = ['subject', 'is_read', 'is_replied', 'created_at']
    search_fields = ['name', 'email', 'message']
    list_editable = ['is_read', 'is_replied']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read', 'is_replied', 'created_at')
        }),
    )


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'subscribed_at', 'unsubscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at', 'unsubscribed_at']
    ordering = ['-subscribed_at']
    
    actions = ['activate_subscriptions', 'deactivate_subscriptions']
    
    def activate_subscriptions(self, request, queryset):
        queryset.update(is_active=True, unsubscribed_at=None)
        self.message_user(request, f"{queryset.count()} subscriptions activated.")
    activate_subscriptions.short_description = "Activate selected subscriptions"
    
    def deactivate_subscriptions(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_active=False, unsubscribed_at=timezone.now())
        self.message_user(request, f"{queryset.count()} subscriptions deactivated.")
    deactivate_subscriptions.short_description = "Deactivate selected subscriptions"


@admin.register(DupeProduct)
class DupeProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'designer_brand', 'designer_fragrance', 'price', 'designer_price', 'similarity_percentage', 'stock_quantity', 'is_featured', 'is_active']
    list_filter = ['designer_brand', 'is_featured', 'is_active']
    search_fields = ['name', 'designer_brand', 'designer_fragrance', 'description']
    list_editable = ['is_featured', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-is_featured', '-created_at']
    
    fieldsets = (
        ('Product Information', {
            'fields': ('name', 'slug', 'description', 'price', 'stock_quantity')
        }),
        ('Our Dupe Image - Choose ONE option', {
            'fields': ('image_file', 'image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
        ('Designer Fragrance', {
            'fields': ('designer_brand', 'designer_fragrance', 'designer_price')
        }),
        ('Designer Fragrance Image - Choose ONE option', {
            'fields': ('designer_image_file', 'designer_image_url', 'designer_image_preview'),
            'description': 'Upload the designer fragrance image OR provide an external URL. Uploaded files take priority.'
        }),
        ('Comparison Details', {
            'fields': ('similarity_percentage', 'scent_notes', 'longevity')
        }),
        ('Status', {
            'fields': ('is_featured', 'is_active')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'image_preview', 'designer_image_preview']
    
    def image_preview(self, obj):
        url = obj.url if hasattr(obj, 'url') else obj.image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Our Dupe Preview"
    
    def designer_image_preview(self, obj):
        url = obj.designer_image if hasattr(obj, 'designer_image') else obj.designer_image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px;" />',
                url
            )
        return "No image"
    designer_image_preview.short_description = "Designer Preview"


@admin.register(AirAmbience)
class AirAmbienceAdmin(admin.ModelAdmin):
    list_display = ['name', 'product_type', 'price', 'stock_quantity', 'coverage_area', 'is_featured', 'is_active']
    list_filter = ['product_type', 'is_featured', 'is_active']
    search_fields = ['name', 'description', 'scent_notes']
    list_editable = ['is_featured', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-is_featured', '-created_at']
    
    fieldsets = (
        ('Product Information', {
            'fields': ('name', 'slug', 'description', 'price', 'product_type')
        }),
        ('Image - Choose ONE option', {
            'fields': ('image_file', 'image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
        ('Product Details', {
            'fields': ('scent_notes', 'size_options', 'usage_instructions', 'features')
        }),
        ('Specifications', {
            'fields': ('coverage_area', 'duration', 'stock_quantity')
        }),
        ('Status', {
            'fields': ('is_featured', 'is_active')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    
    def image_preview(self, obj):
        url = obj.url if hasattr(obj, 'url') else obj.image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Preview"

@admin.register(PerfumeOil)
class PerfumeOilAdmin(admin.ModelAdmin):
    list_display = ['name', 'concentration', 'price', 'longevity', 'scent_family', 'stock_quantity', 'is_featured', 'is_custom_blend', 'is_active']
    list_filter = ['concentration', 'longevity', 'scent_family', 'is_featured', 'is_custom_blend', 'is_active']
    search_fields = ['name', 'description', 'top_notes', 'middle_notes', 'base_notes']
    list_editable = ['is_featured', 'is_custom_blend', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-is_featured', '-created_at']
    
    fieldsets = (
        ('Product Information', {
            'fields': ('name', 'slug', 'description', 'price')
        }),
        ('Image - Choose ONE option', {
            'fields': ('image_file', 'image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
        ('Oil Details', {
            'fields': ('concentration', 'size_options', 'longevity', 'scent_family')
        }),
        ('Fragrance Notes', {
            'fields': ('top_notes', 'middle_notes', 'base_notes')
        }),
        ('Application & Care', {
            'fields': ('application_tips', 'ingredients')
        }),
        ('Inventory & Status', {
            'fields': ('stock_quantity', 'is_featured', 'is_custom_blend', 'is_active')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    
    def image_preview(self, obj):
        url = obj.url if hasattr(obj, 'url') else obj.image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 80px; max-height: 80px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Preview"