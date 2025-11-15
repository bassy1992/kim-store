# Checkout Issue & Fix

## Problem
The checkout page is not working because:

1. **Frontend uses local cart** - Items are stored in React Context (localStorage)
2. **Backend expects Django cart** - Order creation requires items in Django database cart
3. **Mismatch** - When checkout tries to create order, Django cart is empty

## Current Flow (Broken)
```
User adds to cart → React Context (local)
User clicks checkout → Tries to create order
Django checks cart → Cart is empty → Error
```

## Solution Options

### Option 1: Use Django Cart API (Recommended)
Update frontend to use Django cart API instead of local context.

**Changes needed:**
1. Update `CartContext.tsx` to use Django API
2. Call `/api/cart/items/` when adding products
3. Call `/api/cart/` to get cart items
4. Checkout will work automatically

**Pros:**
- Cart persists across devices
- Cart saved for logged-in users
- Stock validation on backend
- Proper order creation

**Cons:**
- More API calls
- Requires backend to be running

### Option 2: Send Cart Items with Order (Quick Fix)
Modify Django to accept cart items in order creation request.

**Changes needed:**
1. Update `OrderCreateSerializer` to accept items array
2. Create order items from request data instead of cart
3. Frontend sends items with checkout request

**Pros:**
- Quick fix
- Works with current frontend

**Cons:**
- No stock validation before checkout
- Cart not saved on backend
- Duplicate cart logic

### Option 3: Hybrid Approach
Use local cart for browsing, sync to Django on checkout.

**Changes needed:**
1. Keep current local cart
2. On checkout, send all items to Django
3. Django creates cart and order in one transaction

## Recommended Implementation

### Step 1: Update CartContext to use Django API

```typescript
// front/client/contexts/CartContext.tsx
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from Django on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const add = async (productId: number, quantity: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cart/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // ... similar for remove, clear, etc.
}
```

### Step 2: Update ProductCard to use product ID

```typescript
// front/client/components/site/ProductCard.tsx
const handleAddToCart = () => {
  add(product.id, 1); // Pass product ID instead of full object
};
```

### Step 3: Checkout works automatically
Once cart uses Django API, checkout will work without changes.

## Quick Fix (Temporary)

For immediate testing, you can modify the checkout to show a message:

```typescript
// front/client/pages/Checkout.tsx
const handlePay = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("Checkout is being updated to work with the backend. Please check back soon!");
};
```

## Current Status

✅ Django backend has complete cart and order APIs
✅ Checkout page UI is complete
❌ Frontend cart not connected to Django
❌ Order creation fails due to empty Django cart

## Next Steps

1. Choose implementation option (Option 1 recommended)
2. Update CartContext to use Django API
3. Test add to cart functionality
4. Test checkout flow
5. Verify order creation

## Testing Checklist

After implementing fix:
- [ ] Add product to cart
- [ ] View cart page
- [ ] Update quantities
- [ ] Remove items
- [ ] Proceed to checkout
- [ ] Fill checkout form
- [ ] Submit order
- [ ] Verify order in Django admin
- [ ] Check stock was reduced
- [ ] Cart was cleared

## API Endpoints Available

```
POST   /api/cart/items/          - Add item to cart
GET    /api/cart/                - Get current cart
PUT    /api/cart/items/{id}/     - Update item quantity
DELETE /api/cart/items/{id}/     - Remove item
DELETE /api/cart/clear/          - Clear cart
POST   /api/orders/              - Create order from cart
GET    /api/orders/              - List user orders
GET    /api/orders/{number}/     - Get order details
```

## Files to Modify

1. `front/client/contexts/CartContext.tsx` - Use Django API
2. `front/client/components/site/ProductCard.tsx` - Pass product ID
3. `front/client/pages/Cart.tsx` - Update to use new cart structure
4. `front/client/pages/Checkout.tsx` - Already updated to use Django API

---

**Priority:** High
**Estimated Time:** 2-3 hours for full implementation
**Quick Fix Time:** 5 minutes
