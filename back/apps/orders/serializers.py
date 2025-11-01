from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from apps.products.serializers import ProductListSerializer


class CartItemSerializer(serializers.ModelSerializer):
    """Serializer for cart items with product details"""
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'size', 'subtotal']
    
    def get_subtotal(self, obj):
        return float(obj.get_subtotal())


class CartSerializer(serializers.ModelSerializer):
    """Serializer for cart with items and total"""
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'items', 'total', 'item_count', 'created_at', 'updated_at']
    
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
            'phone', 'status', 'total_amount', 'items', 'created_at', 'updated_at'
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
        
        # Create order
        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            shipping_address=validated_data['shipping_address'],
            phone=validated_data['phone'],
            total_amount=cart.get_total()
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
        
        # Clear cart
        cart.items.all().delete()
        
        return order
