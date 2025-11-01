# Design Document: Django E-Commerce Backend

## Overview

This document outlines the technical design for a Django REST Framework backend that powers an e-commerce fragrance shop. The system follows a RESTful API architecture, uses PostgreSQL for data persistence, and implements token-based authentication. The backend is designed to be stateless, scalable, and easily integrated with the existing React frontend.

## Architecture

### Technology Stack

- **Framework**: Django 5.0+ with Django REST Framework (DRF) 3.14+
- **Database**: 
  - **Development**: SQLite (local development)
  - **Production**: PostgreSQL (configurable via environment variables)
- **Authentication**: Token-based authentication using DRF's TokenAuthentication
- **API Documentation**: drf-spectacular for OpenAPI/Swagger documentation
- **Image Storage**: Django's FileField with local storage (production-ready for cloud storage migration)
- **CORS**: django-cors-headers for cross-origin requests from the React frontend
- **Environment Management**: python-decouple for configuration

### Project Structure

```
back/
├── manage.py
├── requirements.txt
├── .env.example
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── products/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── orders/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── customers/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── reviews/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   └── blog/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── admin.py
└── media/
    ├── products/
    └── blog/
```

## Components and Interfaces

### 1. Products App

**Models:**

- `Category`: Product categories (Floral, Woody, Citrus, Oriental)
  - `name`: CharField (max 100 chars, unique)
  - `slug`: SlugField (auto-generated from name)
  - `description`: TextField (optional)

- `Product`: Main product model
  - `name`: CharField (max 200 chars)
  - `slug`: SlugField (unique, auto-generated)
  - `description`: TextField
  - `price`: DecimalField (max_digits=10, decimal_places=2)
  - `category`: ForeignKey to Category
  - `stock_quantity`: PositiveIntegerField (default=0)
  - `is_featured`: BooleanField (default=False)
  - `is_new`: BooleanField (default=False)
  - `is_best_seller`: BooleanField (default=False)
  - `created_at`: DateTimeField (auto_now_add)
  - `updated_at`: DateTimeField (auto_now)

- `ProductImage`: Multiple images per product
  - `product`: ForeignKey to Product (related_name='images')
  - `image`: ImageField (upload_to='products/')
  - `is_primary`: BooleanField (default=False)
  - `order`: PositiveIntegerField (default=0)

**API Endpoints:**

- `GET /api/products/` - List products with filtering and pagination
  - Query params: `category`, `min_price`, `max_price`, `sort_by`, `search`, `featured`
- `GET /api/products/{id}/` - Retrieve single product with images and average rating
- `POST /api/products/` - Create product (Admin only)
- `PUT /api/products/{id}/` - Update product (Admin only)
- `DELETE /api/products/{id}/` - Delete product (Admin only)
- `GET /api/categories/` - List all categories

**Serializers:**

- `CategorySerializer`: Basic category information
- `ProductImageSerializer`: Image URL and metadata
- `ProductListSerializer`: Lightweight for list views (excludes full description)
- `ProductDetailSerializer`: Complete product info with images and average rating

### 2. Orders App

**Models:**

- `Cart`: Shopping cart (session-based or user-based)
  - `session_key`: CharField (max 40 chars, for guest users)
  - `user`: ForeignKey to User (optional, for authenticated users)
  - `created_at`: DateTimeField (auto_now_add)
  - `updated_at`: DateTimeField (auto_now)

- `CartItem`: Items in a cart
  - `cart`: ForeignKey to Cart
  - `product`: ForeignKey to Product
  - `quantity`: PositiveIntegerField (default=1)
  - `size`: CharField (max 20 chars, e.g., "30ml", "50ml", "100ml")

- `Order`: Completed purchase
  - `order_number`: CharField (max 20 chars, unique, auto-generated)
  - `user`: ForeignKey to User (optional)
  - `email`: EmailField
  - `full_name`: CharField (max 200 chars)
  - `shipping_address`: TextField
  - `phone`: CharField (max 20 chars)
  - `status`: CharField (choices: pending, processing, shipped, delivered, cancelled)
  - `total_amount`: DecimalField (max_digits=10, decimal_places=2)
  - `created_at`: DateTimeField (auto_now_add)
  - `updated_at`: DateTimeField (auto_now)

- `OrderItem`: Products in an order
  - `order`: ForeignKey to Order
  - `product`: ForeignKey to Product
  - `product_name`: CharField (snapshot of name at purchase time)
  - `product_price`: DecimalField (snapshot of price at purchase time)
  - `quantity`: PositiveIntegerField
  - `size`: CharField (max 20 chars)

**API Endpoints:**

- `GET /api/cart/` - Get current cart (by session or user)
- `POST /api/cart/items/` - Add item to cart
- `PUT /api/cart/items/{id}/` - Update cart item quantity
- `DELETE /api/cart/items/{id}/` - Remove item from cart
- `DELETE /api/cart/clear/` - Clear entire cart
- `POST /api/orders/` - Create order from cart
- `GET /api/orders/{order_number}/` - Retrieve order details
- `GET /api/orders/` - List user's orders (authenticated only)

**Serializers:**

- `CartItemSerializer`: Cart item with product details
- `CartSerializer`: Complete cart with items and total
- `OrderItemSerializer`: Order item details
- `OrderSerializer`: Complete order information
- `OrderCreateSerializer`: Validation for order creation

### 3. Customers App

**Models:**

Uses Django's built-in `User` model with custom profile extension:

- `CustomerProfile`: Extended user information
  - `user`: OneToOneField to User
  - `phone`: CharField (max 20 chars, optional)
  - `default_shipping_address`: TextField (optional)
  - `created_at`: DateTimeField (auto_now_add)

**API Endpoints:**

- `POST /api/auth/register/` - Register new customer
- `POST /api/auth/login/` - Login and receive token
- `POST /api/auth/logout/` - Logout and invalidate token
- `GET /api/auth/profile/` - Get current user profile
- `PUT /api/auth/profile/` - Update user profile

**Serializers:**

- `UserRegistrationSerializer`: Validation for new user registration
- `UserLoginSerializer`: Login credentials validation
- `CustomerProfileSerializer`: User profile information

### 4. Reviews App

**Models:**

- `Review`: Product reviews
  - `product`: ForeignKey to Product (related_name='reviews')
  - `user`: ForeignKey to User (optional, null for guest reviews)
  - `reviewer_name`: CharField (max 100 chars)
  - `rating`: PositiveSmallIntegerField (validators: MinValueValidator(1), MaxValueValidator(5))
  - `comment`: TextField
  - `created_at`: DateTimeField (auto_now_add)
  - `updated_at`: DateTimeField (auto_now)

**API Endpoints:**

- `GET /api/products/{product_id}/reviews/` - List reviews for a product
- `POST /api/products/{product_id}/reviews/` - Create review
- `DELETE /api/reviews/{id}/` - Delete review (Admin only)

**Serializers:**

- `ReviewSerializer`: Complete review information
- `ReviewCreateSerializer`: Validation for review creation

### 5. Blog App

**Models:**

- `BlogPost`: Blog articles
  - `title`: CharField (max 200 chars)
  - `slug`: SlugField (unique, auto-generated)
  - `content`: TextField
  - `excerpt`: TextField (optional, for list views)
  - `author`: ForeignKey to User
  - `featured_image`: ImageField (upload_to='blog/', optional)
  - `is_published`: BooleanField (default=False)
  - `published_at`: DateTimeField (optional)
  - `created_at`: DateTimeField (auto_now_add)
  - `updated_at`: DateTimeField (auto_now)

**API Endpoints:**

- `GET /api/blog/` - List published blog posts with pagination
- `GET /api/blog/{slug}/` - Retrieve single blog post
- `POST /api/blog/` - Create blog post (Admin only)
- `PUT /api/blog/{slug}/` - Update blog post (Admin only)
- `DELETE /api/blog/{slug}/` - Delete blog post (Admin only)

**Serializers:**

- `BlogPostListSerializer`: Lightweight for list views
- `BlogPostDetailSerializer`: Complete blog post content

## Data Models

### Entity Relationship Diagram

```
User (Django built-in)
  ├─ 1:1 → CustomerProfile
  ├─ 1:N → Cart
  ├─ 1:N → Order
  ├─ 1:N → Review
  └─ 1:N → BlogPost (as author)

Category
  └─ 1:N → Product

Product
  ├─ 1:N → ProductImage
  ├─ 1:N → CartItem
  ├─ 1:N → OrderItem
  └─ 1:N → Review

Cart
  └─ 1:N → CartItem

Order
  └─ 1:N → OrderItem
```

### Key Relationships

1. **Product-Category**: Many-to-One (each product belongs to one category)
2. **Product-ProductImage**: One-to-Many (each product can have multiple images)
3. **Cart-CartItem**: One-to-Many (each cart contains multiple items)
4. **Order-OrderItem**: One-to-Many (each order contains multiple items)
5. **Product-Review**: One-to-Many (each product can have multiple reviews)
6. **User-Order**: One-to-Many (each user can have multiple orders)

## Error Handling

### Standard Error Response Format

All API errors will return a consistent JSON structure:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": {
      "field_name": ["Error message for this field"]
    }
  }
}
```

### Error Codes and HTTP Status Codes

- `400 Bad Request`: Validation errors, invalid input
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource does not exist
- `409 Conflict`: Resource conflict (e.g., duplicate email)
- `500 Internal Server Error`: Unexpected server errors

### Custom Exception Handler

Implement a custom DRF exception handler to ensure consistent error formatting across all endpoints.

## Testing Strategy

### Unit Tests

- **Model Tests**: Validate model methods, constraints, and relationships
  - Test product stock quantity updates
  - Test order number generation
  - Test review rating validation
  - Test slug auto-generation

- **Serializer Tests**: Validate data transformation and validation logic
  - Test required field validation
  - Test custom validation rules (e.g., rating range)
  - Test nested serializer relationships

- **View Tests**: Test API endpoint behavior
  - Test authentication and permission requirements
  - Test filtering and pagination
  - Test CRUD operations
  - Test error responses

### Integration Tests

- **Order Flow**: Test complete order creation process
  - Add items to cart
  - Create order from cart
  - Verify stock quantity reduction
  - Verify cart clearing

- **Authentication Flow**: Test user registration and login
  - Register new user
  - Login and receive token
  - Access protected endpoints with token

### Test Coverage Goals

- Minimum 80% code coverage
- 100% coverage for critical business logic (order processing, stock management)

### Testing Tools

- Django's built-in test framework
- DRF's APITestCase for API endpoint testing
- Factory Boy for test data generation
- Coverage.py for coverage reporting

## Security Considerations

### Authentication and Authorization

- Token-based authentication for API requests
- Admin-only endpoints protected with IsAdminUser permission
- User-specific data protected with IsAuthenticated permission
- Guest checkout supported without authentication

### Data Validation

- All user input validated using DRF serializers
- SQL injection prevention through Django ORM
- XSS prevention through proper content escaping
- File upload validation (type, size, extension)

### CORS Configuration

- Configure allowed origins for the React frontend
- Restrict allowed HTTP methods
- Configure allowed headers for authentication

### Environment Variables

- Database credentials stored in environment variables
- Secret key stored securely
- Debug mode disabled in production
- Allowed hosts configured properly

## Performance Optimization

### Database Optimization

- Database indexes on frequently queried fields (slug, category, created_at)
- Select_related and prefetch_related for reducing N+1 queries
- Database connection pooling

### Caching Strategy

- Cache product list responses (5-minute TTL)
- Cache category list (1-hour TTL)
- Cache blog post list (10-minute TTL)
- Invalidate cache on data updates

### Pagination

- Default page size: 20 items for products
- Default page size: 10 items for blog posts
- Cursor pagination for large datasets

## API Documentation

### Swagger/OpenAPI Integration

- Use drf-spectacular for automatic schema generation
- Interactive API documentation at `/api/docs/`
- ReDoc documentation at `/api/redoc/`
- OpenAPI schema available at `/api/schema/`

### Documentation Standards

- All endpoints documented with descriptions
- Request/response examples provided
- Authentication requirements clearly marked
- Query parameters and filters documented

## Deployment Considerations

### Environment Setup

- Python 3.11+ required
- PostgreSQL 15+ database
- Virtual environment for dependency isolation
- Environment-specific settings files

### Static and Media Files

- Static files collected to `/static/` directory
- Media files uploaded to `/media/` directory
- Production: Configure cloud storage (AWS S3, Google Cloud Storage)

### Database Migrations

- All schema changes managed through Django migrations
- Migration files version controlled
- Migration testing in staging environment before production

### Monitoring and Logging

- Django logging configured for errors and warnings
- API request logging for debugging
- Performance monitoring for slow queries
- Error tracking integration (Sentry recommended)
