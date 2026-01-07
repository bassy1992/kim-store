# Quick Guide: Update Remaining Images

## Files That Need Updates

### High Priority (User-Facing)
1. `front/client/pages/ProductDetails.tsx` - Product detail images
2. `front/client/pages/Gallery.tsx` - Gallery grid images
3. `front/client/pages/Cart.tsx` - Cart item thumbnails
4. `front/client/pages/Checkout.tsx` - Checkout item thumbnails

### Medium Priority
5. `front/client/pages/Blog.tsx` - Blog post images
6. `front/client/pages/About.tsx` - About page gallery
7. `front/client/pages/PerfumeOils.tsx` - Product images
8. `front/client/pages/PerfumeOilDetail.tsx` - Detail images
9. `front/client/pages/AirAmbience.tsx` - Product images
10. `front/client/pages/AirAmbienceDetail.tsx` - Detail images
11. `front/client/pages/Dupes.tsx` - Product thumbnails

### Low Priority
12. `front/client/components/site/Header.tsx` - Logo image

## Quick Update Pattern

### Step 1: Import LazyImage
```tsx
import LazyImage from "@/components/ui/LazyImage";
```

### Step 2: Replace img tags
**Before:**
```tsx
<img 
  src={product.image} 
  alt={product.name}
  className="w-full h-full object-cover"
/>
```

**After:**
```tsx
<LazyImage 
  src={product.image} 
  alt={product.name}
  className="w-full h-full object-cover"
/>
```

### Step 3: For Above-the-Fold Images
```tsx
<LazyImage 
  src={heroImage} 
  alt="Hero"
  eager={true}
  className="w-full h-full object-cover"
/>
```

## Automated Update Script

You can use this command to find all img tags:
```bash
grep -r "<img" front/client/pages/ front/client/components/
```

## Testing Checklist

After updating each file:
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Test in Chrome (latest)
- [ ] Test in Safari 14 or older
- [ ] Test on mobile device
- [ ] Verify images load correctly
- [ ] Verify fallback images work

## Priority Order

1. Start with ProductDetails.tsx (most critical for sales)
2. Then Cart.tsx and Checkout.tsx (checkout flow)
3. Then Gallery.tsx and Blog.tsx (content pages)
4. Finally other pages

## Need Help?

Refer to `IMAGE_LOADING_FIX.md` for detailed documentation.
