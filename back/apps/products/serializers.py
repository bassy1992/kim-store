from rest_framework import serializers
from django.db.models import Avg
from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']
        read_only_fields = ['slug']


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for ProductImage model"""
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary', 'order']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product list views"""
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'price', 'category', 
            'stock_quantity', 'primary_image', 'tag', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        """Get the primary image or first image"""
        primary = obj.images.filter(is_primary=True).first()
        if not primary:
            primary = obj.images.first()
        if primary:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary.image.url)
            return primary.image.url
        return None
    
    def get_tag(self, obj):
        """Get product tag (Best Seller, New, or None)"""
        if obj.is_best_seller:
            return 'Best Seller'
        elif obj.is_new:
            return 'New'
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """Complete serializer for product detail views"""
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'category',
            'stock_quantity', 'is_featured', 'is_new', 'is_best_seller',
            'images', 'average_rating', 'tag', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
    
    def get_average_rating(self, obj):
        """Calculate average rating from reviews"""
        avg = obj.reviews.aggregate(Avg('rating'))['rating__avg']
        return round(avg, 1) if avg else None
    
    def get_tag(self, obj):
        """Get product tag (Best Seller, New, or None)"""
        if obj.is_best_seller:
            return 'Best Seller'
        elif obj.is_new:
            return 'New'
        return None


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating products"""
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'category',
            'stock_quantity', 'is_featured', 'is_new', 'is_best_seller'
        ]
