# E-Commerce Backend API

Django REST Framework backend for a fragrance e-commerce platform.

## Features

- **Product Management**: CRUD operations for products, categories, and images
- **Shopping Cart**: Session-based cart for guests and user-based cart for authenticated users
- **Order Processing**: Complete order workflow with stock management
- **User Authentication**: Token-based authentication with user profiles
- **Product Reviews**: Customer reviews with ratings
- **Blog**: Content management for blog posts
- **API Documentation**: Interactive Swagger/OpenAPI documentation

## Tech Stack

- Django 5.0.1
- Django REST Framework 3.14.0
- PostgreSQL (or SQLite for development)
- Token Authentication
- drf-spectacular for API documentation

## Setup Instructions

### Prerequisites

- Python 3.11+
- pip
- PostgreSQL (optional, SQLite used by default)

### Installation

1. **Clone the repository**
   ```bash
   cd back
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Key environment variables:
   - `SECRET_KEY`: Django secret key
   - `DEBUG`: Set to `False` in production
   - `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
   - `USE_POSTGRES`: Set to `True` to use PostgreSQL
   - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: Database credentials
   - `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Load seed data (optional)**
   ```bash
   python manage.py seed_data
   ```

8. **Run development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`

## API Endpoints

### Products
- `GET /api/products/` - List products (with filtering, search, sorting)
- `GET /api/products/{slug}/` - Get product details
- `POST /api/products/` - Create product (admin only)
- `PUT /api/products/{slug}/` - Update product (admin only)
- `DELETE /api/products/{slug}/` - Delete product (admin only)
- `GET /api/categories/` - List categories

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login and get token
- `POST /api/auth/logout/` - Logout (invalidate token)
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

### Cart
- `GET /api/cart/` - Get current cart
- `POST /api/cart/items/` - Add item to cart
- `PUT /api/cart/items/{id}/` - Update cart item
- `DELETE /api/cart/items/{id}/` - Remove cart item
- `DELETE /api/cart/clear/` - Clear cart

### Orders
- `POST /api/orders/` - Create order from cart
- `GET /api/orders/` - List user's orders (authenticated)
- `GET /api/orders/{order_number}/` - Get order details

### Reviews
- `GET /api/products/{id}/reviews/` - List product reviews
- `POST /api/products/{id}/reviews/` - Create review
- `DELETE /api/reviews/{id}/` - Delete review (admin only)

### Blog
- `GET /api/blog/` - List published blog posts
- `GET /api/blog/{slug}/` - Get blog post details
- `POST /api/blog/` - Create blog post (admin only)
- `PUT /api/blog/{slug}/` - Update blog post (admin only)
- `DELETE /api/blog/{slug}/` - Delete blog post (admin only)

## Query Parameters

### Product Filtering
- `category`: Filter by category slug or ID
- `min_price`: Minimum price
- `max_price`: Maximum price
- `featured`: Filter featured products (true/false)
- `search`: Search in name and description
- `sort_by`: Sort by field (price, -price, name, created_at)

## Authentication

The API uses token-based authentication. Include the token in the Authorization header:

```
Authorization: Token your-token-here
```

## Running Tests

```bash
python manage.py test
```

For verbose output:
```bash
python manage.py test --verbosity=2
```

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`

Default credentials (if using seed data):
- Username: `admin`
- Password: `admin123`

## Project Structure

```
back/
├── config/              # Project configuration
│   ├── settings.py      # Django settings
│   ├── urls.py          # Main URL configuration
│   └── exceptions.py    # Custom exception handler
├── apps/
│   ├── products/        # Product management
│   ├── orders/          # Cart and order processing
│   ├── customers/       # User authentication and profiles
│   ├── reviews/         # Product reviews
│   └── blog/            # Blog posts
├── media/               # Uploaded files
├── manage.py
└── requirements.txt
```

## Development

### Adding New Apps

1. Create app in `apps/` directory:
   ```bash
   python manage.py startapp appname apps/appname
   ```

2. Update `apps/appname/apps.py` to set `name = 'apps.appname'`

3. Add to `INSTALLED_APPS` in `settings.py`

### Database Migrations

After model changes:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

1. Set `DEBUG=False` in `.env`
2. Set `USE_POSTGRES=True` and configure database credentials
3. Update `ALLOWED_HOSTS` with your domain
4. Update `CORS_ALLOWED_ORIGINS` with your frontend URL
5. Collect static files: `python manage.py collectstatic`
6. Use a production WSGI server (gunicorn, uWSGI)
7. Set up HTTPS
8. Configure media file storage (AWS S3, etc.)

## License

MIT License
