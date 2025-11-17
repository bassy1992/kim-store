from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from apps.products.models import Product
import uuid
from datetime import datetime
from django.core.exceptions import ValidationError
from decimal import Decimal


class PromoCode(models.Model):
    """Promotional discount codes"""
    DISCOUNT_TYPES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]
    
    code = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=200, blank=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPES, default='percentage')
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_order_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    maximum_discount_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    usage_limit = models.PositiveIntegerField(null=True, blank=True, help_text="Leave blank for unlimited usage")
    used_count = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.code} - {self.get_discount_display()}"
    
    def get_discount_display(self):
        """Get human-readable discount display"""
        if self.discount_type == 'percentage':
            return f"{self.discount_value}% off"
        else:
            return f"₵{self.discount_value} off"
    
    def is_valid(self):
        """Check if promo code is currently valid"""
        from django.utils import timezone
        now = timezone.now()
        
        if not self.is_active:
            return False, "Promo code is not active"
        
        if now < self.valid_from:
            return False, "Promo code is not yet valid"
        
        if now > self.valid_until:
            return False, "Promo code has expired"
        
        if self.usage_limit and self.used_count >= self.usage_limit:
            return False, "Promo code usage limit reached"
        
        return True, "Valid"
    
    def calculate_discount(self, order_total):
        """Calculate discount amount for given order total"""
        if order_total < self.minimum_order_amount:
            return Decimal('0.00')
        
        if self.discount_type == 'percentage':
            discount = order_total * (self.discount_value / 100)
        else:
            discount = self.discount_value
        
        # Apply maximum discount limit if set
        if self.maximum_discount_amount and discount > self.maximum_discount_amount:
            discount = self.maximum_discount_amount
        
        # Ensure discount doesn't exceed order total
        return min(discount, order_total)
    
    def apply_usage(self):
        """Increment usage count"""
        self.used_count += 1
        self.save(update_fields=['used_count'])


class Cart(models.Model):
    """Shopping cart for guest and authenticated users"""
    session_key = models.CharField(max_length=40, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='carts')
    promo_code = models.ForeignKey(PromoCode, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        if self.user:
            return f"Cart for {self.user.username}"
        return f"Guest cart {self.session_key}"
    
    def get_subtotal(self):
        """Calculate subtotal (before discount)"""
        return sum(item.get_subtotal() for item in self.items.all())
    
    def get_discount_amount(self):
        """Calculate discount amount"""
        if not self.promo_code:
            return Decimal('0.00')
        
        is_valid, message = self.promo_code.is_valid()
        if not is_valid:
            return Decimal('0.00')
        
        return self.promo_code.calculate_discount(self.get_subtotal())
    
    def get_total(self):
        """Calculate total price after discount"""
        subtotal = self.get_subtotal()
        discount = self.get_discount_amount()
        return subtotal - discount
    
    def get_item_count(self):
        """Get total number of items in cart"""
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    """Items in a shopping cart - supports both Product and DupeProduct"""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    
    # Generic relation to support multiple product types
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    item = GenericForeignKey('content_type', 'object_id')
    
    # Keep legacy product field for backward compatibility
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=20, default='50ml')
    
    # Cache product details for performance
    product_name = models.CharField(max_length=200, blank=True)
    product_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]
    
    def save(self, *args, **kwargs):
        # Cache product details
        if self.item:
            self.product_name = self.item.name
            self.product_price = self.item.price
        elif self.product:
            self.product_name = self.product.name
            self.product_price = self.product.price
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.quantity}x {self.product_name} ({self.size})"
    
    def get_product(self):
        """Get the actual product object (Product or DupeProduct)"""
        return self.item if self.item else self.product
    
    def get_subtotal(self):
        """Calculate subtotal for this item"""
        return self.product_price * self.quantity


class Order(models.Model):
    """Completed purchase order"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    order_number = models.CharField(max_length=20, unique=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    email = models.EmailField()
    full_name = models.CharField(max_length=200)
    shipping_address = models.TextField()
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Pricing fields
    subtotal_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Promo code info (snapshot at time of order)
    promo_code_used = models.CharField(max_length=50, blank=True)
    promo_discount_type = models.CharField(max_length=20, blank=True)
    promo_discount_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Payment info
    payment_reference = models.CharField(max_length=100, blank=True, unique=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order {self.order_number}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            # Generate unique order number
            timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
            random_str = str(uuid.uuid4().hex)[:6].upper()
            self.order_number = f"ORD-{timestamp}-{random_str}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    """Products in an order (snapshot at time of purchase)"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=200)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    size = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.quantity}x {self.product_name} ({self.size})"
    
    def get_subtotal(self):
        """Calculate subtotal for this order item"""
        return self.product_price * self.quantity
