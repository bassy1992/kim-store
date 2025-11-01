from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django.shortcuts import get_object_or_404
from .models import Review
from apps.products.models import Product
from .serializers import ReviewSerializer, ReviewCreateSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for product reviews.
    - List: Get all reviews for a product
    - Create: Add a review (public)
    - Delete: Remove a review (admin only)
    """
    serializer_class = ReviewSerializer
    
    def get_permissions(self):
        """Admin-only for delete, public for create and list"""
        if self.action == 'destroy':
            return [IsAdminUser()]
        return [AllowAny()]
    
    def get_queryset(self):
        """Get reviews for a specific product"""
        product_id = self.kwargs.get('product_id')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()
    
    def get_serializer_class(self):
        """Use create serializer for create action"""
        if self.action == 'create':
            return ReviewCreateSerializer
        return ReviewSerializer
    
    def create(self, request, product_id=None):
        """Create a review for a product"""
        product = get_object_or_404(Product, id=product_id)
        
        serializer = ReviewCreateSerializer(
            data=request.data,
            context={'request': request, 'product': product}
        )
        
        if serializer.is_valid():
            review = serializer.save()
            review_serializer = ReviewSerializer(review)
            return Response(review_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
