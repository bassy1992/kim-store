# Backend Enhancement Plan - Match Frontend Pages

## Current Status ✅
**Existing Apps & Models:**
- ✅ Products (Product, Category, ProductImage)
- ✅ Blog (BlogPost)
- ✅ Reviews (Review)
- ✅ Orders (Order, OrderItem, Cart, CartItem)
- ✅ Customers (CustomerProfile)

**Existing API Endpoints:**
- ✅ `/api/products/` - Product listing with filters
- ✅ `/api/categories/` - Category listing
- ✅ `/api/blog/` - Blog posts
- ✅ `/api/reviews/` - Product reviews
- ✅ `/api/orders/` - Order management
- ✅ `/api/customers/` - Customer profiles

## Missing Components for Frontend Pages

### 1. Content Pages App (NEW) 🆕
**Models Needed:**
- `FAQ` - Frequently Asked Questions
- `Testimonial` - Customer testimonials
- `GalleryImage` - Gallery photos
- `ShippingInfo` - Shipping policies
- `ReturnPolicy` - Return policies
- `TermsAndConditions` - Terms of service
- `PrivacyPolicy` - Privacy policy
- `GiftCard` - Gift card products
- `ContactMessage` - Contact form submissions
- `Newsletter` - Newsletter subscriptions

### 2. Enhanced Product Models ✨
**Add to existing Product model:**
- `tag` field (for "New", "Best Seller", "Limited Edition" badges)
- `scent_family` field (Floral, Woody, Citrus, Oriental)
- `notes` field (Top, Middle, Base notes)
- `size_options` field (50ml, 100ml, etc.)

### 3. Additional Features 🎯
**Dupes Feature:**
- `DupeProduct` model - Designer fragrance alternatives
- Link to original designer fragrance
- Comparison details

**Air Ambience & Perfume Oils:**
- Add `product_type` field to Product model
- Categories: Perfume, Perfume Oil, Air Ambience, Gift Card

### 4. API Endpoints to Create 📡
```
/api/faqs/                  - FAQ list
/api/testimonials/          - Testimonials
/api/gallery/               - Gallery images
/api/shipping-info/         - Shipping information
/api/return-policy/         - Return policy
/api/terms/                 - Terms and conditions
/api/privacy/               - Privacy policy
/api/gift-cards/            - Gift cards
/api/contact/               - Contact form submission
/api/newsletter/subscribe/  - Newsletter subscription
/api/dupes/                 - Dupe products
/api/success/               - Order success details
```

### 5. Enhanced Serializers 📝
- Add `primary_image` property to Product serializer
- Add `tag` property based on is_featured, is_new, is_best_seller
- Add review count and average rating to Product
- Add related products suggestions

## Implementation Priority

### Phase 1: Core Content (HIGH PRIORITY) 🔴
1. Create `content` app
2. Add FAQ model and API
3. Add Testimonial model and API
4. Add ContactMessage model and API
5. Add Newsletter model and API

### Phase 2: Policy Pages (MEDIUM PRIORITY) 🟡
1. Add ShippingInfo model and API
2. Add ReturnPolicy model and API
3. Add TermsAndConditions model and API
4. Add PrivacyPolicy model and API

### Phase 3: Enhanced Features (MEDIUM PRIORITY) 🟡
1. Add Gallery model and API
2. Add GiftCard model and API
3. Enhance Product model with tags and scent families
4. Add Dupe products feature

### Phase 4: Polish & Optimization (LOW PRIORITY) 🟢
1. Add caching for static content
2. Add search functionality across all content
3. Add analytics tracking
4. Add email notifications for contact forms

## Database Schema Changes

### New Tables:
- `content_faq`
- `content_testimonial`
- `content_galleryimage`
- `content_shippinginfo`
- `content_returnpolicy`
- `content_termsandconditions`
- `content_privacypolicy`
- `content_giftcard`
- `content_contactmessage`
- `content_newsletter`
- `products_dupeproduct`

### Modified Tables:
- `products_product` - Add: tag, scent_family, notes, size_options, product_type

## Migration Strategy
1. Create new `content` app
2. Generate migrations for new models
3. Add fields to existing Product model
4. Run migrations
5. Create admin interfaces
6. Create serializers and views
7. Register URLs
8. Test all endpoints
9. Populate with sample data

## Testing Checklist
- [ ] All new models can be created via admin
- [ ] All API endpoints return correct data
- [ ] Filtering and search work correctly
- [ ] Pagination works for list views
- [ ] Admin can create/edit all content
- [ ] Public users can only read published content
- [ ] Contact form submissions are saved
- [ ] Newsletter subscriptions are saved
- [ ] Gift cards can be purchased
- [ ] Dupes show correct comparisons
