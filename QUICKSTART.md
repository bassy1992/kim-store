# 🚀 Quick Start Guide

Get the e-commerce platform running in 5 minutes!

## Prerequisites

- Python 3.11+ installed
- Node.js 18+ installed
- Git (optional)

## Step 1: Start the Backend (Django)

Open a terminal and run:

```bash
cd back
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

✅ Backend running at: **http://localhost:8000**

## Step 2: Start the Frontend (React)

Open a **NEW** terminal and run:

```bash
cd front
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

## Step 3: Test the Connection

Open your browser and visit:

1. **Frontend Shop**: http://localhost:5173/shop
2. **API Documentation**: http://localhost:8000/api/docs/
3. **Connection Test**: Open `test-connection.html` in your browser

## Quick Test

You should see:
- ✅ 8 sample products loaded from the database
- ✅ 4 categories (Floral, Woody, Citrus, Oriental)
- ✅ Filtering and sorting working
- ✅ Products displayed with images and prices

## Default Admin Access

- **URL**: http://localhost:8000/admin/
- **Username**: `admin`
- **Password**: `admin123`

## Troubleshooting

### Backend won't start?

```bash
cd back
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python manage.py migrate
```

### Frontend won't start?

```bash
cd front
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS errors?

Check `back/.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Restart the Django server after changing `.env`.

### Products not loading?

1. Make sure backend is running: http://localhost:8000/api/products/
2. Check browser console for errors (F12)
3. Verify `.env` file exists in `front/` directory

## Using the Startup Script (Windows)

Double-click `start-dev.bat` to start both servers automatically!

## What's Next?

- Browse products at http://localhost:5173/shop
- Add products to cart
- View API documentation at http://localhost:8000/api/docs/
- Access admin panel at http://localhost:8000/admin/
- Check out the integration guide in `INTEGRATION.md`

## API Endpoints

All endpoints are available at `http://localhost:8000/api/`:

- `GET /products/` - List all products
- `GET /products/{slug}/` - Get product details
- `GET /categories/` - List categories
- `GET /cart/` - Get current cart
- `POST /cart/items/` - Add to cart
- `POST /orders/` - Create order
- `POST /auth/register/` - Register user
- `POST /auth/login/` - Login user

Full API documentation: http://localhost:8000/api/docs/

## Sample Data

The `seed_data` command creates:
- 4 categories (Floral, Woody, Citrus, Oriental)
- 8 products with prices ranging from $79-$120
- 3 blog posts
- 1 admin user (admin/admin123)

## Need Help?

- Check `INTEGRATION.md` for detailed integration guide
- Check `back/README.md` for backend documentation
- Open `test-connection.html` to test API connectivity
- Visit http://localhost:8000/api/docs/ for interactive API docs
