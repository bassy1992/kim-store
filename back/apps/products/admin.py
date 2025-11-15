from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image_url', 'alt_text', 'is_primary', 'order', 'image_preview']
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        if obj.image_url:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                obj.image_url
            )
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock_quantity', 'is_featured', 'is_new', 'is_best_seller', 'primary_image_preview', 'created_at']
    list_filter = ['category', 'is_featured', 'is_new', 'is_best_seller', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    list_editable = ['price', 'stock_quantity', 'is_featured', 'is_new', 'is_best_seller']
    
    def primary_image_preview(self, obj):
        if obj.primary_image:
            return format_html(
                '<img src="{}" style="max-width: 50px; max-height: 50px;" />',
                obj.primary_image
            )
        return "No image"
    primary_image_preview.short_description = "Image"


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image_preview', 'is_primary', 'order']
    list_filter = ['is_primary', 'product']
    fields = ['product', 'image_url', 'alt_text', 'is_primary', 'order', 'image_preview']
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        if obj.image_url:
            return format_html(
                '<img src="{}" style="max-width: 150px; max-height: 150px;" />',
                obj.image_url
            )
        return "No image"
    image_preview.short_description = "Preview"
