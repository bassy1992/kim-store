# Backend Complete Summary - Kimmy's Fragrance Store

## Overview
Complete Django REST API backend for a full-featured e-commerce fragrance store with 6 Django apps, 20+ models, and 50+ API endpoints.

## Tech Stack
- **Framework**: Django 5.0.1 + Django REST Framework
- **Database**: PostgreSQL (Railway) / SQLite (local dev)
- **Authentication**: Token + Session authentication
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **Static Files**: WhiteNoise
- **CORS**: django-cors-headers
- **Environment**: python-decouple

## Project Structure

```
back/
├── apps/
│   ├── products/         # Product catalog & categories
│   ├── orders/           # Cart, orders, checkout
│   ├── customers/        # User profiles
│   ├── reviews/          # Product reviews
│   ├── blog/             # Blog posts
│   └── content/          # CMS content (FAQs, policies, etc.)
├── config/
│   ├── settings.py       # Django settings
│   ├── urls.py           # URL routing
│   ├── admin.py          # Custom admin config
│   └── exceptions.py     # Custom error handlers
├── media/                # User uploads
├── staticfiles/          # Collected static files
├── manage.py
├── requirements.txt
└── runtime.txt
```

---

## Apps & Models

### 1. Products App
**Models**: `Category`, `Product`, `ProductImage`

**Product Features**:
- Multiple product types: Perfume, Perfume Oil, Air Ambience
- Scent families: Floral, Woody, Citrus, Oriental, Fresh, Spicy
- Detailed scent notes (top, middle, base)
- Size options (50ml, 100ml, etc.)
- Stock management
- Status flags: Featured, New, Best Seller, Limited Edition
- Auto-generated tags and slugs
- Multiple images per product with primary image selection
- Integrated ratings from reviews

**API Endpoints**:
```
GET    /api/products/              - List products (paginated, filterable)
GET    /api/products/{id}/         - Product detail
POST   /api/products/              - Create product (admin)
PUT    /api/products/{id}/         - Update product (admin)
DELETE /api/products/{id}/         - Delete product (admin)
GET    /api/categories/            - List categories
GET    /api/categories/{id}/       - Category detail
```

**Filters**: category, product_type, scent_family, is_featured, is_new, is_best_seller, price range, search

---

### 2. Orders App
**Models**: `Cart`, `CartItem`, `Order`, `OrderItem`

**Features**:
- Guest and authenticated user carts
- Session-based cart for guests
- Cart total and item count calculations
- Order creation with unique order numbers
- Order status tracking: Pending, Processing, Shipped, Delivered, Cancelled
- Order history for users
- Snapshot of product details at purchase time

**API Endpoints**:
```
GET    /api/cart/                  - Get current cart
POST   /api/cart/items/            - Add item to cart
PUT    /api/cart/items/{id}/       - Update cart item
DELETE /api/cart/items/{id}/       - Remove cart item
DELETE /api/cart/clear/             - Clear entire cart
POST   /api/orders/                - Create order (checkout)
GET    /api/orders/                - List user orders
GET    /api/orders/{id}/           - Order detail
```

---

### 3. Customers App
**Models**: `CustomerProfile`

**Features**:
- Extended user profile (one-to-one with Django User)
- Phone number
- Default shipping address
- Auto-created on user registration
- Order history via User relationship

**API Endpoints**:
```
GET    /api/profile/               - Get current user profile
PUT    /api/profile/               - Update profile
POST   /api/register/              - User registration
POST   /api/login/                 - User login (token)
POST   /api/logout/                - User logout
```

---

### 4. Reviews App
**Models**: `Review`

**Features**:
- Product reviews with 1-5 star ratings
- Optional user association (can be anonymous)
- Reviewer name field
- Timestamps for created/updated
- Integrated with Product model for average ratings

**API Endpoints**:
```
GET    /api/reviews/               - List all reviews
GET    /api/reviews/{id}/          - Review detail
POST   /api/reviews/               - Create review
GET    /api/products/{id}/reviews/ - Reviews for specific product
```

---

### 5. Blog App
**Models**: `BlogPost`

**Features**:
- Blog articles with rich content
- Featured images
- Author attribution (User FK)
- Excerpt for list views
- Published/draft status
- Published date tracking
- Auto-generated slugs

**API Endpoints**:
```
GET    /api/blog/                  - List published posts
GET    /api/blog/{slug}/           - Blog post detail
POST   /api/blog/                  - Create post (admin)
PUT    /api/blog/{slug}/           - Update post (admin)
DELETE /api/blog/{slug}/           - Delete post (admin)
```

---

### 6. Content App (CMS)
**Models**: `FAQ`, `Testimonial`, `GalleryImage`, `ShippingInfo`, `ReturnPolicy`, `TermsAndConditions`, `PrivacyPolicy`, `GiftCard`, `ContactMessage`, `Newsletter`, `DupeProduct`

#### FAQ
- Questions with answers
- Category grouping
- Custom ordering
- Published status

**Endpoints**:
```
GET    /api/faqs/                  - List FAQs (filter by category)
GET    /api/faqs/{id}/             - FAQ detail
```

#### Testimonial
- Customer testimonials with ratings
- Optional product association
- Featured flag for homepage
- Published status

**Endpoints**:
```
GET    /api/testimonials/          - List testimonials
GET    /api/testimonials/featured/ - Featured testimonials
GET    /api/testimonials/{id}/     - Testimonial detail
```

#### GalleryImage
- Gallery photos with descriptions
- Category grouping (Products, Events, Behind the Scenes)
- Custom ordering
- Published status

**Endpoints**:
```
GET    /api/gallery/               - List gallery images (filter by category)
GET    /api/gallery/{id}/          - Gallery image detail
```

#### ShippingInfo
- Shipping policies and information
- Free shipping threshold
- Delivery timeframes
- International shipping flag

**Endpoints**:
```
GET    /api/shipping-info/         - List shipping info
GET    /api/shipping-info/latest/  - Get latest shipping info
GET    /api/shipping-info/{id}/    - Shipping info detail
```

#### ReturnPolicy
- Return and refund policies
- Return window (days)
- Refund processing time

**Endpoints**:
```
GET    /api/return-policy/         - List return policies
GET    /api/return-policy/latest/  - Get latest return policy
GET    /api/return-policy/{id}/    - Return policy detail
```

#### TermsAndConditions
- Terms of service
- Effective date tracking

**Endpoints**:
```
GET    /api/terms/                 - List terms
GET    /api/terms/latest/          - Get latest terms
GET    /api/terms/{id}/            - Terms detail
```

#### PrivacyPolicy
- Privacy policy
- Effective date tracking

**Endpoints**:
```
GET    /api/privacy/               - List privacy policies
GET    /api/privacy/latest/        - Get latest privacy policy
GET    /api/privacy/{id}/          - Privacy policy detail
```

#### GiftCard
- Gift card products
- Multiple denominations
- Images
- Active status

**Endpoints**:
```
GET    /api/gift-cards/            - List active gift cards
GET    /api/gift-cards/{id}/       - Gift card detail
```

#### ContactMessage
- Contact form submissions
- Subject categories: General, Wholesale, Press, Product, Order
- Read/replied status tracking

**Endpoints**:
```
POST   /api/contact/               - Submit contact form (public)
GET    /api/contact/               - List messages (admin)
GET    /api/contact/{id}/          - Message detail (admin)
```

#### Newsletter
- Email subscriptions
- Active/unsubscribed status
- Subscription date tracking

**Endpoints**:
```
POST   /api/newsletter/subscribe/  - Subscribe (public)
POST   /api/newsletter/unsubscribe/ - Unsubscribe (public)
GET    /api/newsletter/            - List subscriptions (admin)
```

#### DupeProduct
- Designer fragrance alternatives
- Original designer info (brand, fragrance, price)
- Similarity percentage
- Savings calculations
- Scent notes and longevity
- Stock management
- Featured flag

**Endpoints**:
```
GET    /api/dupes/                 - List dupe products (search, filter)
GET    /api/dupes/brands/          - List all designer brands
GET    /api/dupes/{slug}/          - Dupe product detail
```

---

## Authentication & Permissions

### Authentication Methods
1. **Token Authentication**: For API clients (mobile apps, etc.)
2. **Session Authentication**: For web browsers

### Permission Levels
- **Public (AllowAny)**: Product listings, blog posts, FAQs, testimonials, gallery, policies, contact form, newsletter subscription
- **Authenticated**: Cart management, order creation, profile management, review creation
- **Admin Only**: Product/content creation, order management, contact message viewing, newsletter management

---

## API Features

### Pagination
- Default: 20 items per page
- Configurable via `?page=` and `?page_size=` query params

### Filtering & Search
- Products: category, type, scent family, price range, search by name/description
- FAQs: category
- Gallery: category
- Dupes: designer brand, search by name
- Blog: published status

### Sorting
- Products: price, created date, name
- Orders: created date
- Reviews: created date, rating

### Error Handling
- Custom exception handler in `config/exceptions.py`
- Consistent error response format
- Proper HTTP status codes

---

## Database Configuration

### Local Development (SQLite)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Production (PostgreSQL on Railway)
```python
DATABASE_URL = config('DATABASE_URL')
DATABASES = {
    'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        conn_health_checks=True,
    )
}
```

---

## Environment Variables

### Required
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=postgresql://...
ALLOWED_HOSTS=.railway.app,.up.railway.app,yourdomain.com
```

### CORS Configuration
```env
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CORS_ALLOW_ALL_ORIGINS=False
```

### CSRF Configuration
```env
CSRF_TRUSTED_ORIGINS=https://*.railway.app,https://yourdomain.com
```

---

## Admin Interface

### Registered Models
All models are registered in Django admin with:
- Custom list displays
- Search fields
- Filters
- Inline editing (where applicable)
- Custom actions
- Organized fieldsets

### Admin URL
```
/admin/
```

### Superuser Creation
```bash
python manage.py createsuperuser
```

---

## API Documentation

### Swagger UI
```
/api/docs/
```

### ReDoc
```
/api/redoc/
```

### OpenAPI Schema
```
/api/schema/
```

---

## Static & Media Files

### Static Files (CSS, JS, Admin)
- **URL**: `/static/`
- **Storage**: WhiteNoise (compressed, cached)
- **Collection**: `python manage.py collectstatic`

### Media Files (User Uploads)
- **URL**: `/media/`
- **Storage**: Local filesystem (development)
- **Production**: Consider AWS S3, Cloudinary, or Railway volumes

### Image Validation
- Allowed formats: JPG, JPEG, PNG, WebP
- Max file size: 5MB
- Validators in `apps/products/validators.py`

---

## Deployment (Railway)

### Setup Steps
1. Create Railway project
2. Add PostgreSQL database
3. Set environment variables
4. Deploy from GitHub
5. Run migrations: `railway run python manage.py migrate`
6. Create superuser: `railway run python manage.py createsuperuser`
7. Collect static files: `railway run python manage.py collectstatic --noinput`

### Required Files
- `requirements.txt` - Python dependencies
- `runtime.txt` - Python version (python-3.11.x)
- `Procfile` or Railway auto-detection

### Health Check
```
GET /api/ping/
```

---

## Testing

### Run Tests
```bash
python manage.py test
```

### Test Coverage
- Model tests in each app's `tests.py`
- API endpoint tests
- Authentication tests
- Permission tests

---

## Management Commands

### Create Sample Data
```bash
python manage.py shell < populate_sample_data.py
```

### Reset Admin Password
```bash
python manage.py shell < reset_admin.py
```

### Check Products
```bash
python manage.py shell < check_products.py
```

---

## Frontend Integration

### Base URL
```javascript
const API_BASE_URL = 'https://your-backend.railway.app/api';
```

### Example Fetch
```javascript
// Get products
const response = await fetch(`${API_BASE_URL}/products/`);
const data = await response.json();

// Create order
const response = await fetch(`${API_BASE_URL}/orders/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${userToken}`,
  },
  body: JSON.stringify(orderData),
});
```

### CORS Headers
All API responses include proper CORS headers for configured origins.

---

## Security Features

### CSRF Protection
- Enabled for all state-changing operations
- CSRF token required for POST/PUT/DELETE
- Configured for Railway deployment

### Password Validation
- Minimum length: 8 characters
- Common password check
- User attribute similarity check
- Numeric-only password prevention

### SQL Injection Protection
- Django ORM prevents SQL injection
- Parameterized queries

### XSS Protection
- Django template auto-escaping
- Content Security Policy headers

---

## Performance Optimizations

### Database
- Connection pooling (`conn_max_age=600`)
- Health checks enabled
- Indexed fields: slugs, foreign keys

### Queries
- `select_related()` for foreign keys
- `prefetch_related()` for reverse relations
- Pagination to limit result sets

### Static Files
- WhiteNoise compression
- Browser caching headers
- Manifest static files storage

---

## Monitoring & Logging

### Django Logging
- Console output in development
- File logging in production
- Error tracking

### Railway Logs
```bash
railway logs
```

### Health Monitoring
- `/api/ping/` endpoint
- Database connection checks

---

## Next Steps

### 1. Populate Sample Data
```bash
# Run all population scripts at once (recommended)
python populate_all_data.py

# Or run individual scripts
python populate_sample_data.py      # Categories
python populate_products.py         # Products
python populate_content.py          # FAQs
python populate_testimonials.py     # Testimonials
python populate_policies.py         # Policies
python populate_giftcards.py        # Gift cards
python populate_dupes.py            # Dupe products
```

See `SAMPLE_DATA_README.md` for detailed instructions.

### 2. Configure Media Storage
For production, set up:
- AWS S3 bucket
- Cloudinary account
- Or Railway persistent volumes

### 3. Email Configuration
Set up email backend for:
- Order confirmations
- Newsletter
- Contact form notifications
- Password resets

### 4. Payment Integration
Add payment gateway:
- Stripe
- PayPal
- Paystack (for Ghana)

### 5. Analytics
Integrate:
- Google Analytics
- Product view tracking
- Conversion tracking

---

## Support & Maintenance

### Database Backups
- Railway automatic backups
- Manual backup: `pg_dump`

### Migrations
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show migrations
python manage.py showmigrations
```

### Dependencies Update
```bash
pip list --outdated
pip install --upgrade package-name
pip freeze > requirements.txt
```

---

## API Endpoint Summary

Total: 50+ endpoints across 6 apps

### Products (8 endpoints)
- Products CRUD
- Categories CRUD
- Product images

### Orders (8 endpoints)
- Cart management
- Order creation
- Order history

### Customers (5 endpoints)
- Registration
- Login/logout
- Profile management

### Reviews (4 endpoints)
- Review CRUD
- Product reviews

### Blog (5 endpoints)
- Blog post CRUD
- Published posts

### Content (20+ endpoints)
- FAQs
- Testimonials
- Gallery
- Policies (Shipping, Returns, Terms, Privacy)
- Gift cards
- Contact form
- Newsletter
- Dupe products

---

## Conclusion

This backend provides a complete, production-ready API for a full-featured e-commerce fragrance store. All models, views, serializers, and admin interfaces are implemented with proper authentication, permissions, and error handling.

The system is deployed on Railway with PostgreSQL, includes comprehensive API documentation, and is ready for frontend integration.
