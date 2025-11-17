from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, PromoCode
from apps.products.serializers import ProductListSerializer


class CartItemSerializer(serializers.ModelSerializer):
    """Serializer for cart items with product details - supports Product and DupeProduct"""
    product = serializers.SerializerMethodField()
    product_id = serializers.IntegerField(write_only=True, required=False)
    dupe_id = serializers.IntegerField(write_only=True, required=False)
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'dupe_id', 'quantity', 'size', 'subtotal']
    
    def get_product(self, obj):
        """Get product details from either Product or DupeProduct"""
        from apps.content.models import DupeProduct
        from apps.content.serializers import DupeProductListSerializer
        
        # Try generic relation first
        if obj.item:
            if isinstance(obj.item, DupeProduct):
                return DupeProductListSerializer(obj.item).data
            else:
                return ProductListSerializer(obj.item).data
        
        # Fallback to legacy product field
        if obj.product:
            return ProductListSerializer(obj.product).data
        
        # Fallback to cached data
        return {
            'id': obj.object_id,
            'name': obj.product_name,
            'price': str(obj.product_price),
            'slug': '',
        }
    
    def get_subtotal(self, obj):
        return float(obj.get_subtotal())


class PromoCodeSerializer(serializers.ModelSerializer):
    """Serializer for promo code details"""
    discount_display = serializers.CharField(source='get_discount_display', read_only=True)
    
    class Meta:
        model = PromoCode
        fields = ['id', 'code', 'description', 'discount_type', 'discount_value', 
                 'discount_display', 'minimum_order_amount']


class CartSerializer(serializers.ModelSerializer):
    """Serializer for cart with items and total"""
    items = CartItemSerializer(many=True, read_only=True)
    promo_code = PromoCodeSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()
    discount_amount = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'items', 'promo_code', 'subtotal', 'discount_amount', 
                 'total', 'item_count', 'created_at', 'updated_at']
    
    def get_subtotal(self, obj):
        return float(obj.get_subtotal())
    
    def get_discount_amount(self, obj):
        return float(obj.get_discount_amount())
    
    def get_total(self, obj):
        return float(obj.get_total())
    
    def get_item_count(self, obj):
        return obj.get_item_count()


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for order items"""
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_price', 'quantity', 'size', 'subtotal']
    
    def get_subtotal(self, obj):
        return float(obj.get_subtotal())


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for order details"""
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'email', 'full_name', 'shipping_address',
            'phone', 'status', 'subtotal_amount', 'discount_amount', 'total_amount', 
            'promo_code_used', 'promo_discount_type', 'promo_discount_value',
            'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['order_number', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.Serializer):
    """Serializer for creating orders from cart"""
    email = serializers.EmailField()
    full_name = serializers.CharField(max_length=200)
    shipping_address = serializers.CharField()
    phone = serializers.CharField(max_length=20)
    
    def validate(self, data):
        """Validate that cart exists and has items"""
        request = self.context.get('request')
        cart = self.context.get('cart')
        
        if not cart:
            raise serializers.ValidationError("No cart found.")
        
        if not cart.items.exists():
            raise serializers.ValidationError("Cart is empty.")
        
        # Validate stock availability
        for item in cart.items.all():
            if item.product.stock_quantity < item.quantity:
                raise serializers.ValidationError(
                    f"Insufficient stock for {item.product.name}. "
                    f"Available: {item.product.stock_quantity}, Requested: {item.quantity}"
                )
        
        return data
    
    def create(self, validated_data):
        """Create order from cart"""
        cart = self.context.get('cart')
        request = self.context.get('request')
        
        # Calculate pricing
        subtotal = cart.get_subtotal()
        discount = cart.get_discount_amount()
        total = cart.get_total()
        
        # Create order
        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            shipping_address=validated_data['shipping_address'],
            phone=validated_data['phone'],
            subtotal_amount=subtotal,
            discount_amount=discount,
            total_amount=total,
            promo_code_used=cart.promo_code.code if cart.promo_code else '',
            promo_discount_type=cart.promo_code.discount_type if cart.promo_code else '',
            promo_discount_value=cart.promo_code.discount_value if cart.promo_code else None,
        )
        
        # Create order items and reduce stock
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                product_name=cart_item.product.name,
                product_price=cart_item.product.price,
                quantity=cart_item.quantity,
                size=cart_item.size
            )
            
            # Reduce stock quantity
            cart_item.product.stock_quantity -= cart_item.quantity
            cart_item.product.save()
        
        # Apply promo code usage if used
        if cart.promo_code:
            cart.promo_code.apply_usage()
        
        # Clear cart
        cart.items.all().delete()
        cart.promo_code = None
        cart.save()
        
        return order
