# Quick Start Guide - Kimmy's Fragrance Store Backend

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up Environment
```bash
# Copy example env file
copy .env.example .env

# Edit .env and set:
# - SECRET_KEY (generate one)
# - DEBUG=True (for development)
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Populate Sample Data
```bash
python populate_all_data.py
```

### 6. Start Server
```bash
python manage.py runserver
```

### 7. Access Your Backend
- **Admin Panel**: http://localhost:8000/admin/
- **API Docs**: http://localhost:8000/api/docs/
- **API Root**: http://localhost:8000/api/

## 📚 Key Endpoints

### Products
```
GET  /api/products/              # List all products
GET  /api/products/{id}/         # Product detail
GET  /api/categories/            # List categories
```

### Orders
```
GET  /api/cart/                  # Get cart
POST /api/cart/items/            # Add to cart
POST /api/orders/                # Create order
GET  /api/orders/                # Order history
```

### Content
```
GET  /api/faqs/                  # FAQs
GET  /api/testimonials/featured/ # Featured testimonials
GET  /api/gift-cards/            # Gift cards
GET  /api/dupes/                 # Dupe products
POST /api/contact/               # Contact form
POST /api/newsletter/subscribe/  # Newsletter signup
```

## 🔧 Common Tasks

### Add a Product
1. Go to http://localhost:8000/admin/
2. Click "Products" → "Add Product"
3. Fill in details and save

### View API Documentation
Visit http://localhost:8000/api/docs/ for interactive API docs

### Test an Endpoint
```bash
curl http://localhost:8000/api/products/
```

### Clear Database
```bash
python manage.py flush
```

### Create New Migration
```bash
python manage.py makemigrations
python manage.py migrate
```

## 🌐 Deploy to Railway

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 3. Add PostgreSQL
1. Click "New" → "Database" → "PostgreSQL"
2. Railway auto-creates DATABASE_URL

### 4. Set Environment Variables
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
CSRF_TRUSTED_ORIGINS=https://*.railway.app
```

### 5. Deploy
Railway auto-deploys on push to main branch

### 6. Run Migrations on Railway
```bash
railway run python manage.py migrate
railway run python manage.py createsuperuser
railway run python populate_all_data.py
```

## 📖 Documentation

- **Complete Backend Summary**: `BACKEND_COMPLETE_SUMMARY.md`
- **Sample Data Guide**: `SAMPLE_DATA_README.md`
- **Railway Deployment**: `RAILWAY_DEPLOY.md`
- **Admin Login Fix**: `ADMIN_LOGIN_FINAL_FIX.md`

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Migration Errors
```bash
python manage.py migrate --run-syncdb
```

### Static Files Not Loading
```bash
python manage.py collectstatic --noinput
```

### CORS Errors
Check `CORS_ALLOWED_ORIGINS` in settings.py matches your frontend URL

## 💡 Tips

1. **Use API Docs**: http://localhost:8000/api/docs/ for testing
2. **Check Admin**: Most content can be managed via admin panel
3. **Sample Data**: Run `populate_all_data.py` for instant test data
4. **Logs**: Check console output for errors
5. **Database**: Use SQLite for dev, PostgreSQL for production

## 🎯 Next Steps

1. ✅ Customize sample data in admin
2. ✅ Add product images
3. ✅ Configure email settings
4. ✅ Set up payment gateway
5. ✅ Connect frontend
6. ✅ Deploy to production

## 📞 Support

- Check documentation files in `back/` directory
- Review Django logs for errors
- Test endpoints in API docs
- Verify environment variables

---

**Ready to build something amazing! 🌸**
