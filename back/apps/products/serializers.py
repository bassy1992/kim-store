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
        fields = ['id', 'image_url', 'alt_text', 'is_primary', 'order']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product list views"""
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    tag = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'price', 'category', 'product_type',
            'scent_family', 'stock_quantity', 'primary_image', 'tag', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        """Get the primary image URL"""
        return obj.primary_image


class ProductDetailSerializer(serializers.ModelSerializer):
    """Complete serializer for product detail views"""
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    tag = serializers.CharField(read_only=True)
    primary_image = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'category',
            'product_type', 'scent_family', 'scent_notes', 'size_options',
            'stock_quantity', 'is_featured', 'is_new', 'is_best_seller', 'is_limited_edition',
            'images', 'primary_image', 'average_rating', 'review_count', 'tag',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating products"""
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'category', 'product_type',
            'scent_family', 'scent_notes', 'size_options', 'stock_quantity',
            'is_featured', 'is_new', 'is_best_seller', 'is_limited_edition'
        ]
