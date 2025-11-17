from rest_framework import serializers
from .models import (
    FAQ, Testimonial, GalleryImage, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard, ContactMessage,
    Newsletter, DupeProduct, AirAmbience, PerfumeOil
)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category', 'order']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'rating', 'comment', 'product_name', 'is_featured', 'created_at']


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'image_url', 'category', 'created_at']


class ShippingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInfo
        fields = [
            'id', 'title', 'content', 'free_shipping_threshold',
            'standard_delivery_days', 'express_delivery_days',
            'international_shipping', 'updated_at'
        ]


class ReturnPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnPolicy
        fields = ['id', 'title', 'content', 'return_window_days', 'refund_processing_days', 'updated_at']


class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = ['id', 'title', 'content', 'effective_date', 'updated_at']


class PrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = ['id', 'title', 'content', 'effective_date', 'updated_at']


class GiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftCard
        fields = ['id', 'name', 'description', 'amount', 'image_url', 'is_active']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']


class DupeProductListSerializer(serializers.ModelSerializer):
    savings = serializers.SerializerMethodField()
    savings_percentage = serializers.SerializerMethodField()
    product_id = serializers.IntegerField(source='product.id', read_only=True, allow_null=True)
    
    class Meta:
        model = DupeProduct
        fields = [
            'id', 'slug', 'name', 'price', 'designer_brand', 'designer_fragrance',
            'designer_price', 'similarity_percentage', 'image_url', 'is_featured',
            'savings', 'savings_percentage', 'product_id'
        ]
    
    def get_savings(self, obj):
        return float(obj.get_savings())
    
    def get_savings_percentage(self, obj):
        return obj.get_savings_percentage()


class DupeProductDetailSerializer(serializers.ModelSerializer):
    savings = serializers.SerializerMethodField()
    savings_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = DupeProduct
        fields = [
            'id', 'slug', 'name', 'description', 'price', 'designer_brand',
            'designer_fragrance', 'designer_price', 'similarity_percentage',
            'scent_notes', 'longevity', 'image_url', 'stock_quantity',
            'is_featured', 'created_at', 'savings', 'savings_percentage'
        ]
    
    def get_savings(self, obj):
        return float(obj.get_savings())
    
    def get_savings_percentage(self, obj):
        return obj.get_savings_percentage()


class AirAmbienceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirAmbience
        fields = [
            'id', 'slug', 'name', 'price', 'product_type', 'image_url', 
            'is_featured', 'stock_quantity', 'coverage_area', 'duration'
        ]


class AirAmbienceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirAmbience
        fields = [
            'id', 'slug', 'name', 'description', 'price', 'product_type',
            'scent_notes', 'size_options', 'usage_instructions', 'features',
            'coverage_area', 'duration', 'image_url', 'stock_quantity',
            'is_featured', 'created_at'
        ]


class PerfumeOilListSerializer(serializers.ModelSerializer):
    all_notes = serializers.SerializerMethodField()
    
    class Meta:
        model = PerfumeOil
        fields = [
            'id', 'slug', 'name', 'price', 'concentration', 'size_options',
            'longevity', 'scent_family', 'image_url', 'is_featured', 'stock_quantity',
            'all_notes'
        ]
    
    def get_all_notes(self, obj):
        return obj.get_all_notes()


class PerfumeOilDetailSerializer(serializers.ModelSerializer):
    all_notes = serializers.SerializerMethodField()
    
    class Meta:
        model = PerfumeOil
        fields = [
            'id', 'slug', 'name', 'description', 'price', 'concentration',
            'size_options', 'longevity', 'top_notes', 'middle_notes', 'base_notes',
            'scent_family', 'application_tips', 'ingredients', 'image_url',
            'stock_quantity', 'is_featured', 'is_custom_blend', 'created_at',
            'all_notes'
        ]
    
    def get_all_notes(self, obj):
        return obj.get_all_notes()