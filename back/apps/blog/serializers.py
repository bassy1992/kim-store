from rest_framework import serializers
from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for blog post list views"""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author_name',
            'featured_image', 'published_at', 'created_at'
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Complete serializer for blog post detail views"""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'author_name', 'author_username', 'featured_image',
            'is_published', 'published_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class BlogPostCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating blog posts"""
    class Meta:
        model = BlogPost
        fields = [
            'title', 'content', 'excerpt', 'featured_image',
            'is_published', 'published_at'
        ]
