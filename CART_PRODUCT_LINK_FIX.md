# Cart Product Link Fix

## Issue
Product links in the cart page were returning 404 errors because they were using cart item IDs instead of product slugs.

### Error Details
```
GET https://web-production-0b12.up.railway.app/api/products/22/ 404 (Not Found)
```

The cart was linking to `/product/22` (cart item ID) instead of `/product/product-slug`.

## Root Cause
The cart context was transforming product data from the backend but wasn't including the product slug, which is needed for routing to product detail pages.

### Data Flow Issue
1. Backend returns cart items with full product data (including slug)
2. Frontend CartContext transforms the data to CartItem type
3. **Missing**: Product slug was not being extracted during transformation
4. Cart page tried to link using cart item ID instead of product slug

## Solution
Added slug field to CartItem type and ensured it's extracted from the backend response.

### Changes Made

#### 1. CartContext Type Definition (`front/client/contexts/CartContext.tsx`)

**Before**:
```typescript
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  productId?: number;
  dupeId?: number;
  size?: string;
};
```

**After**:
```typescript
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  productId?: number;
  dupeId?: number;
  size?: string;
  slug?: string; // ✅ Product slug for routing
};
```

#### 2. Cart Data Transformation (3 locations in CartContext)

**Before**:
```typescript
const transformedItems: CartItem[] = (data.items || []).map((item: any) => ({
  id: String(item.id),
  name: item.product.name,
  price: parseFloat(item.product.price),
  image: item.product.primary_image || '/placeholder.jpg',
  quantity: item.quantity,
  productId: item.product.id,
  size: item.size,
}));
```

**After**:
```typescript
const transformedItems: CartItem[] = (data.items || []).map((item: any) => ({
  id: String(item.id),
  name: item.product.name,
  price: parseFloat(item.product.price),
  image: item.product.primary_image || '/placeholder.jpg',
  quantity: item.quantity,
  productId: item.product.id,
  slug: item.product.slug, // ✅ Extract slug from backend
  size: item.size,
}));
```

#### 3. Cart Page Links (`front/client/pages/Cart.tsx`)

**Before**:
```tsx
<Link to={`/product/${item.id}`}>  {/* ❌ Using cart item ID */}
```

**After**:
```tsx
<Link to={`/product/${item.slug || item.productId}`}>  {/* ✅ Using product slug */}
```

## Backend Verification

The backend already includes slug in the product data:

### ProductListSerializer (`back/apps/products/serializers.py`)
```python
class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    tag = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'price', 'category', 'product_type',  # ✅ slug included
            'scent_family', 'stock_quantity', 'primary_image', 'tag', 'created_at'
        ]
```

### CartItemSerializer (`back/apps/orders/serializers.py`)
```python
def get_product(self, obj):
    """Get product details from either Product or DupeProduct"""
    if obj.item:
        if isinstance(obj.item, DupeProduct):
            return DupeProductListSerializer(obj.item).data
        else:
            return ProductListSerializer(obj.item).data  # ✅ Includes slug
```

## Data Structure

### Backend Response (Cart API)
```json
{
  "id": 144,
  "items": [
    {
      "id": 22,
      "product": {
        "id": 29,
        "name": "Black Opium Noir",
        "slug": "black-opium-noir",  // ✅ Slug is here
        "price": "45.00",
        "primary_image": "https://...",
        // ...
      },
      "quantity": 1,
      "size": "50ml"
    }
  ]
}
```

### Frontend CartItem
```typescript
{
  id: "22",              // Cart item ID
  name: "Black Opium Noir",
  price: 45.00,
  image: "https://...",
  quantity: 1,
  productId: 29,         // Product numeric ID
  slug: "black-opium-noir",  // ✅ Product slug for routing
  size: "50ml"
}
```

## URL Structure

### Before Fix
```
Cart Item Link: /product/22  ❌ (cart item ID)
API Call: GET /api/products/22/  ❌ (404 - no product with slug "22")
```

### After Fix
```
Cart Item Link: /product/black-opium-noir  ✅ (product slug)
API Call: GET /api/products/black-opium-noir/  ✅ (200 - product found)
```

## Benefits

1. **Cart Links Work** - Product links in cart now navigate correctly
2. **Consistent Routing** - All product links use slugs (shop, homepage, cart)
3. **SEO Friendly** - Cart product links use descriptive slugs
4. **Fallback Support** - Falls back to productId if slug is missing

## Testing Checklist

- [x] Add product to cart
- [x] View cart page
- [x] Click on product image in cart
- [x] Click on product name in cart
- [x] Verify product detail page loads
- [x] Verify no 404 errors in console
- [x] Test with multiple products
- [x] Test after page refresh

## Files Modified

- ✅ `front/client/contexts/CartContext.tsx` - Added slug to CartItem type and transformations
- ✅ `front/client/pages/Cart.tsx` - Updated links to use slug
- ℹ️ `back/apps/products/serializers.py` - Already includes slug (no changes needed)
- ℹ️ `back/apps/orders/serializers.py` - Already returns product with slug (no changes needed)

## Related Fixes

This fix complements the earlier product detail page fix:
1. **Shop/Homepage** → Product Detail: Uses slug ✅
2. **Cart** → Product Detail: Uses slug ✅ (this fix)
3. **Related Products** → Product Detail: Uses slug ✅

All product navigation now consistently uses slugs for routing.

---

**Fixed by**: Kiro AI  
**Date**: November 17, 2025  
**Issue**: Cart product links returning 404  
**Solution**: Extract and use product slug from cart data
