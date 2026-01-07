from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'is_published', 'image_preview', 'published_at', 'created_at']
    list_filter = ['is_published', 'published_at', 'created_at', 'author']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    list_editable = ['is_published']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'content', 'excerpt')
        }),
        ('Featured Image - Choose ONE option', {
            'fields': ('featured_image_file', 'featured_image_url', 'image_preview'),
            'description': 'Upload an image from your computer OR provide an external URL. Uploaded files take priority.'
        }),
        ('Publishing', {
            'fields': ('author', 'is_published', 'published_at')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        url = obj.featured_image if hasattr(obj, 'featured_image') else obj.featured_image_url
        if url:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                url
            )
        return "No image"
    image_preview.short_description = "Image Preview"
