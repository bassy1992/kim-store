from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Order, PromoCode
from apps.products.models import Product
from .serializers import (
    CartSerializer,
    CartItemSerializer,
    OrderSerializer,
    OrderCreateSerializer,
    PromoCodeSerializer
)


class CartViewSet(viewsets.ViewSet):
    """
    ViewSet for managing shopping cart.
    Supports both guest (session-based) and authenticated users.
    """
    permission_classes = [AllowAny]
    
    def get_cart(self, request):
        """Get or create cart for current user/session"""
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
            print(f"Authenticated user cart: {cart.id}, created: {created}")
        else:
            # Try to get cart ID from header (client-side tracking)
            cart_id = request.headers.get('X-Cart-ID')
            
            if cart_id:
                try:
                    cart = Cart.objects.get(id=int(cart_id), user__isnull=True)
                    print(f"Found existing cart from header: {cart.id}, items: {cart.items.count()}")
                    return cart
                except (Cart.DoesNotExist, ValueError):
                    print(f"Cart ID {cart_id} not found, creating new cart")
            
            # Fallback to session key
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
                print(f"Created new session: {session_key}")
            
            # Ensure session is saved to database
            request.session.save()
            
            cart, created = Cart.objects.get_or_create(session_key=session_key)
            print(f"Guest cart: {cart.id}, session: {session_key}, created: {created}, items: {cart.items.count()}")
        return cart
    
    def list(self, request):
        """Get current cart - this is required for router to register the viewset"""
        cart = self.get_cart(request)
        # Optimize: Use select_related and prefetch_related to reduce queries
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        response = Response(serializer.data)
        response['X-Cart-ID'] = str(cart.id)
        return response
    
    def create(self, request):
        """Alias for add_item to support POST to /cart/ endpoint"""
        return self.add_item(request)
    
    def add_item(self, request):
        """Add item to cart - supports both Product and DupeProduct"""
        from django.contrib.contenttypes.models import ContentType
        from apps.content.models import DupeProduct
        
        cart = self.get_cart(request)
        product_id = request.data.get('product_id')
        dupe_id = request.data.get('dupe_id')
        quantity = int(request.data.get('quantity', 1))
        size = request.data.get('size', '50ml')
        
        print(f"Adding item - Cart ID: {cart.id}, Product ID: {product_id}, Dupe ID: {dupe_id}, Quantity: {quantity}")
        
        if not product_id and not dupe_id:
            return Response(
                {'error': 'Either product_id or dupe_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Determine which type of product we're adding
        if dupe_id:
            # Adding a DupeProduct
            item_obj = get_object_or_404(DupeProduct, id=dupe_id)
            content_type = ContentType.objects.get_for_model(DupeProduct)
            
            # Check stock availability
            if item_obj.stock_quantity < quantity:
                return Response(
                    {'error': f'Insufficient stock. Available: {item_obj.stock_quantity}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get or create cart item for dupe
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                content_type=content_type,
                object_id=dupe_id,
                size=size,
                defaults={'quantity': quantity}
            )
        else:
            # Adding a regular Product
            item_obj = get_object_or_404(Product, id=product_id)
            content_type = ContentType.objects.get_for_model(Product)
            
            # Check stock availability
            if item_obj.stock_quantity < quantity:
                return Response(
                    {'error': f'Insufficient stock. Available: {item_obj.stock_quantity}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get or create cart item for product
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                content_type=content_type,
                object_id=product_id,
                size=size,
                defaults={'quantity': quantity, 'product': item_obj}  # Keep legacy field for compatibility
            )
        
        if not created:
            # Update quantity if item already exists
            cart_item.quantity += quantity
            cart_item.save()
        
        print(f"Cart item created: {created}, Cart items count: {cart.items.count()}")
        
        # Refresh cart from database to ensure we have latest data
        cart.refresh_from_db()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        
        serializer = CartSerializer(cart, context={'request': request})
        
        response = Response(serializer.data, status=status.HTTP_201_CREATED)
        response['X-Cart-ID'] = str(cart.id)
        return response
    
    def update_item(self, request, item_id=None):
        """Update cart item quantity"""
        cart = self.get_cart(request)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        
        quantity = int(request.data.get('quantity', 1))
        
        if quantity <= 0:
            cart_item.delete()
        else:
            # Check stock availability
            if cart_item.product.stock_quantity < quantity:
                return Response(
                    {'error': f'Insufficient stock. Available: {cart_item.product.stock_quantity}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            cart_item.quantity = quantity
            cart_item.save()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)
    
    def remove_item(self, request, item_id=None):
        """Remove item from cart"""
        cart = self.get_cart(request)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'], url_path='clear')
    def clear_cart(self, request):
        """Clear all items from cart"""
        cart = self.get_cart(request)
        cart.items.all().delete()
        cart.promo_code = None
        cart.save()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='apply-promo')
    def apply_promo_code(self, request):
        """Apply promo code to cart"""
        cart = self.get_cart(request)
        promo_code = request.data.get('code', '').strip().upper()
        
        if not promo_code:
            return Response(
                {'error': 'Promo code is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            promo = PromoCode.objects.get(code=promo_code)
        except PromoCode.DoesNotExist:
            return Response(
                {'error': 'Invalid promo code'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if promo code is valid
        is_valid, message = promo.is_valid()
        if not is_valid:
            return Response(
                {'error': message},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check minimum order amount
        cart_subtotal = cart.get_subtotal()
        if cart_subtotal < promo.minimum_order_amount:
            return Response(
                {'error': f'Minimum order amount of ₵{promo.minimum_order_amount} required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Apply promo code
        cart.promo_code = promo
        cart.save()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response({
            'message': f'Promo code "{promo_code}" applied successfully!',
            'cart': serializer.data
        })
    
    @action(detail=False, methods=['post'], url_path='remove-promo')
    def remove_promo_code(self, request):
        """Remove promo code from cart"""
        cart = self.get_cart(request)
        cart.promo_code = None
        cart.save()
        
        # Reload cart with optimized prefetching
        cart = Cart.objects.select_related('promo_code').prefetch_related(
            'items__product__category',
            'items__product__images'
        ).get(id=cart.id)
        serializer = CartSerializer(cart, context={'request': request})
        return Response({
            'message': 'Promo code removed',
            'cart': serializer.data
        })
    
    @action(detail=False, methods=['get'], url_path='debug')
    def debug_cart(self, request):
        """Debug cart information"""
        session_key = request.session.session_key
        user = request.user
        
        # Get all carts
        all_carts = Cart.objects.all()
        user_carts = Cart.objects.filter(user=user) if user.is_authenticated else []
        session_carts = Cart.objects.filter(session_key=session_key) if session_key else []
        
        debug_info = {
            'session_key': session_key,
            'user': str(user),
            'is_authenticated': user.is_authenticated,
            'all_carts_count': all_carts.count(),
            'user_carts_count': len(user_carts),
            'session_carts_count': len(session_carts),
            'all_carts': [
                {
                    'id': cart.id,
                    'user': str(cart.user) if cart.user else None,
                    'session_key': cart.session_key,
                    'items_count': cart.items.count(),
                    'total': float(cart.get_total())
                }
                for cart in all_carts
            ]
        }
        
        return Response(debug_info)


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing orders.
    - Create: Convert cart to order
    - List: Get user's orders (authenticated only)
    - Retrieve: Get order details by order number
    """
    serializer_class = OrderSerializer
    lookup_field = 'order_number'
    
    def get_queryset(self):
        """Return orders for current user"""
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user).prefetch_related('items')
        return Order.objects.none()
    
    def create(self, request):
        """Create order from cart"""
        # Debug logging
        print(f"Order creation request from user: {request.user}")
        print(f"Session key: {request.session.session_key}")
        print(f"Request data: {request.data}")
        
        # Get cart
        if request.user.is_authenticated:
            cart = Cart.objects.filter(user=request.user).first()
            print(f"Looking for authenticated user cart: {cart}")
        else:
            session_key = request.session.session_key
            if not session_key:
                # Create session if it doesn't exist
                request.session.create()
                session_key = request.session.session_key
                print(f"Created new session: {session_key}")
            
            cart = Cart.objects.filter(session_key=session_key).first()
            print(f"Looking for guest cart with session {session_key}: {cart}")
        
        if not cart:
            # Try to find any cart for debugging
            all_carts = Cart.objects.all()
            print(f"No cart found. All carts in database: {list(all_carts)}")
            return Response(
                {'error': 'No cart found', 'debug': f'Session: {request.session.session_key}, User: {request.user}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if cart has items
        if not cart.items.exists():
            print(f"Cart {cart.id} exists but has no items")
            return Response(
                {'error': 'Cart is empty'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        print(f"Found cart {cart.id} with {cart.items.count()} items")
        
        # Create order
        serializer = OrderCreateSerializer(
            data=request.data,
            context={'request': request, 'cart': cart}
        )
        
        if serializer.is_valid():
            order = serializer.save()
            print(f"Order created successfully: {order.order_number}")
            order_serializer = OrderSerializer(order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        
        print(f"Order creation validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, order_number=None):
        """Get order by order number"""
        order = get_object_or_404(Order, order_number=order_number)
        
        # Check if user has permission to view this order
        # Allow access for: order owner, staff, or guest (for guest orders)
        if request.user.is_authenticated:
            if order.user and order.user != request.user and not request.user.is_staff:
                return Response(
                    {'error': 'You do not have permission to view this order'},
                    status=status.HTTP_403_FORBIDDEN
                )
        # For guest orders (order.user is None), allow anyone to view with order number
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    
    def get_permissions(self):
        """Allow any for create and retrieve (guest checkout/viewing), authenticated for list"""
        if self.action in ['create', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
