from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Product
from .serializers import (
    CategorySerializer, 
    ProductListSerializer, 
    ProductDetailSerializer,
    ProductCreateUpdateSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing categories.
    List and retrieve only (no create/update/delete).
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing products.
    - List: Public access with filtering, search, and sorting
    - Retrieve: Public access
    - Create/Update/Delete: Admin only
    """
    queryset = Product.objects.select_related('category').prefetch_related('images', 'reviews')
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return ProductListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ProductCreateUpdateSerializer
        return ProductDetailSerializer
    
    def get_permissions(self):
        """Admin-only for create, update, delete"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]
    
    def get_queryset(self):
        """
        Filter products by:
        - category (slug or id)
        - min_price and max_price
        - featured (boolean)
        - search (name or description)
        - sort_by (price, -price, name, -name, created_at, -created_at)
        """
        queryset = super().get_queryset()
        
        # Category filter
        category = self.request.query_params.get('category')
        if category:
            # Try to filter by slug first, then by ID if it's numeric
            if category.isdigit():
                queryset = queryset.filter(Q(category__slug=category) | Q(category__id=int(category)))
            else:
                queryset = queryset.filter(category__slug=category)
        
        # Price range filter
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Featured filter
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(Q(is_featured=True) | Q(is_best_seller=True))
        
        # Search filter
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        # Sorting
        sort_by = self.request.query_params.get('sort_by')
        if sort_by:
            # Map frontend sort values to model fields
            sort_mapping = {
                'price': 'price',
                'price-low': 'price',
                'price-high': '-price',
                'name': 'name',
                'featured': '-is_featured',
                'created_at': '-created_at',
                '-created_at': '-created_at',
            }
            sort_field = sort_mapping.get(sort_by, sort_by)
            queryset = queryset.order_by(sort_field)
        
        return queryset
