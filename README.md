# Kimmy's Fragrance Store 🌸

Full-stack e-commerce platform for a fragrance store with Django REST API backend and React frontend.

## 🚀 Quick Start

### Backend
```bash
cd back
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python populate_all_data.py
python manage.py runserver
```

### Frontend
```bash
cd front
pnpm install
pnpm dev
```

## 📚 Essential Documentation

### Start Here
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
2. **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Find any documentation
3. **[WORK_COMPLETED.md](WORK_COMPLETED.md)** - What's been built

### Backend
- **[back/QUICK_START.md](back/QUICK_START.md)** - 5-minute setup
- **[back/BACKEND_COMPLETE_SUMMARY.md](back/BACKEND_COMPLETE_SUMMARY.md)** - Complete API docs
- **[back/SAMPLE_DATA_README.md](back/SAMPLE_DATA_README.md)** - Sample data guide

### Architecture
- **[SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md)** - System design

### Deployment
- **[back/RAILWAY_DEPLOY.md](back/RAILWAY_DEPLOY.md)** - Backend deployment
- **[VERCEL_READY.md](VERCEL_READY.md)** - Frontend deployment

## 🎯 Key Features

### Backend (Django REST API)
- 50+ API endpoints
- 6 Django apps (Products, Orders, Customers, Reviews, Blog, Content)
- Token + Session authentication
- PostgreSQL database
- Swagger API documentation
- Sample data population scripts

### Frontend (React SPA)
- React 18 + TypeScript
- React Router 6
- TailwindCSS 3
- Radix UI components
- 20+ pages
- Responsive design

## 🌐 Access Points

### Local Development
- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **API Docs**: http://localhost:8000/api/docs/

### Production
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway

## 📦 Sample Data

Populate your database with sample data:
```bash
cd back
python populate_all_data.py
```

This creates:
- 5 categories
- 10+ products
- 5 FAQs
- 4 testimonials
- Policies
- 4 gift cards
- 3 designer dupes

## 🛠️ Tech Stack

### Backend
- Django 5.0.1
- Django REST Framework
- PostgreSQL
- WhiteNoise
- drf-spectacular

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS 3
- Radix UI
- React Router 6

## 📖 Documentation Structure

```
├── README.md (this file)
├── PROJECT_SUMMARY.md
├── DOCUMENTATION_INDEX.md
├── WORK_COMPLETED.md
├── SYSTEM_ARCHITECTURE.md
│
├── back/
│   ├── QUICK_START.md
│   ├── BACKEND_COMPLETE_SUMMARY.md
│   ├── SAMPLE_DATA_README.md
│   ├── RAILWAY_DEPLOY.md
│   └── populate_*.py (8 scripts)
│
└── front/
    └── AGENTS.md
```

## 🆘 Need Help?

1. Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all docs
2. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for overview
3. Follow [back/QUICK_START.md](back/QUICK_START.md) for setup

## 📞 Support

- Backend API docs: http://localhost:8000/api/docs/
- Check documentation files for detailed guides
- Review troubleshooting sections in docs

## 🎉 What's New

### Latest Updates (Nov 10, 2025)
- ✅ Complete backend API documentation
- ✅ 8 sample data population scripts
- ✅ Comprehensive setup guides
- ✅ System architecture documentation
- ✅ Deployment guides for Railway and Vercel

## 🚀 Next Steps

1. Run `python populate_all_data.py` to populate database
2. Visit admin panel and customize sample data
3. Test API endpoints in Swagger docs
4. Connect frontend to backend
5. Deploy to production

---

**Built with ❤️ for Kimmy's Fragrance Store**

For detailed documentation, see [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
