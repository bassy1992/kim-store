# Product Detail Page Slug Fix

## Issue
Product detail pages were returning 404 errors when clicking on products from the shop or homepage.

### Error Details
```
web-production-0b12.up.railway.app/api/products/10/:1
Failed to load resource: the server responded with a status of 404 ()
```

## Root Cause
**Mismatch between frontend routing and backend API expectations:**

- **Frontend**: Was using numeric IDs in URLs (`/product/10`)
- **Backend**: Configured to use slugs as lookup field (`lookup_field = 'slug'`)

### Backend Configuration
From `back/apps/products/views.py`:
```python
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('images', 'reviews')
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'  # ← Uses slug, not ID
```

## Solution
Updated frontend to use product slugs instead of numeric IDs for routing.

### Changes Made

#### 1. Index Page (`front/client/pages/Index.tsx`)
**Before**:
```tsx
<ProductCard product={{
  id: String(p.id), // ❌ Using numeric ID
  name: p.name,
  // ...
}} />
```

**After**:
```tsx
<ProductCard product={{
  id: p.slug, // ✅ Using slug for URL routing
  name: p.name,
  price: parseFloat(p.price),
  image: p.primary_image || defaultImage,
  tag: p.tag,
  productId: p.id, // Keep numeric ID for cart operations
}} />
```

#### 2. Shop Page (`front/client/pages/Shop.tsx`)
**Before**:
```tsx
<ProductCard product={{
  id: String(p.id), // ❌ Using numeric ID
  name: p.name,
  // ...
}} />
```

**After**:
```tsx
<ProductCard product={{
  id: p.slug, // ✅ Using slug for URL routing
  name: p.name,
  price: parseFloat(p.price),
  image: p.primary_image || defaultImage,
  tag: p.tag,
  productId: p.id, // Keep numeric ID for cart operations
}} />
```

#### 3. Product Details Page
Already correctly implemented:
```tsx
<ProductCard 
  product={{
    id: p.slug, // ✅ Already using slug
    name: p.name,
    price: parseFloat(p.price),
    image: p.primary_image || defaultImage,
    tag: p.tag,
    productId: p.id,
  }} 
/>
```

## URL Structure

### Before Fix
```
/product/10          ❌ Numeric ID
/product/15          ❌ Numeric ID
/product/20          ❌ Numeric ID
```

### After Fix
```
/product/black-opium-noir           ✅ SEO-friendly slug
/product/coco-essence               ✅ SEO-friendly slug
/product/fresh-linen-fabric-spray   ✅ SEO-friendly slug
```

## Benefits

### 1. SEO Improvement
**Before**: `/product/10` (not descriptive)  
**After**: `/product/black-opium-noir` (descriptive, keyword-rich)

### 2. User Experience
- More readable URLs
- Users can understand what product they're viewing from the URL
- Better for sharing links

### 3. Backend Consistency
- Frontend now matches backend API expectations
- No more 404 errors on product detail pages

### 4. Dual ID System
- `id` (slug): Used for routing and API calls
- `productId` (number): Used for cart operations and internal references

## Verification

### Sample Products with Slugs
```
ID: 29 | Slug: black-opium-noir           | Name: Black Opium Noir
ID: 28 | Slug: coco-essence               | Name: Coco Essence
ID: 27 | Slug: sauvage-spirit             | Name: Sauvage Spirit
ID: 26 | Slug: fresh-linen-fabric-spray   | Name: Fresh Linen Fabric Spray
ID: 25 | Slug: oud-wood-room-mist         | Name: Oud Wood Room Mist
```

### API Endpoints
```bash
# ✅ Works now
GET /api/products/black-opium-noir/

# ❌ No longer used
GET /api/products/10/
```

## Testing Checklist

- [x] Homepage product cards link to correct detail pages
- [x] Shop page product cards link to correct detail pages
- [x] Product detail page loads successfully
- [x] Related products on detail page link correctly
- [x] Add to cart functionality still works (uses productId)
- [x] URLs are SEO-friendly
- [x] No 404 errors on product pages

## Files Modified

- ✅ `front/client/pages/Index.tsx` - Updated product mapping to use slugs
- ✅ `front/client/pages/Shop.tsx` - Updated product mapping to use slugs
- ℹ️ `front/client/pages/ProductDetails.tsx` - Already correct
- ℹ️ `front/client/components/site/ProductCard.tsx` - No changes needed

## Impact

**Status**: ✅ Fixed  
**Severity**: High (blocking feature)  
**User Impact**: Product detail pages now load correctly  
**SEO Impact**: Positive (better URL structure)

---

**Fixed by**: Kiro AI  
**Date**: November 17, 2025  
**Issue**: Product detail 404 errors  
**Solution**: Use slugs instead of numeric IDs for routing
