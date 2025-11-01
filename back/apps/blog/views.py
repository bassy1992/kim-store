from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import BlogPost
from .serializers import (
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    BlogPostCreateUpdateSerializer
)


class BlogPostPagination(PageNumberPagination):
    """Custom pagination for blog posts (10 items per page)"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class BlogPostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for blog posts.
    - List: Public access (only published posts)
    - Retrieve: Public access (only published posts)
    - Create/Update/Delete: Admin only
    """
    lookup_field = 'slug'
    pagination_class = BlogPostPagination
    
    def get_queryset(self):
        """Return published posts for public, all posts for admin"""
        if self.request.user.is_staff:
            return BlogPost.objects.all()
        return BlogPost.objects.filter(is_published=True)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return BlogPostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return BlogPostCreateUpdateSerializer
        return BlogPostDetailSerializer
    
    def get_permissions(self):
        """Admin-only for create, update, delete"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]
    
    def perform_create(self, serializer):
        """Set author to current user when creating"""
        serializer.save(author=self.request.user)
