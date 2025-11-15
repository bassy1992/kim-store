# Environment Setup Guide

## Development vs Production

### Local Development (Current Setup)
```env
# front/.env
VITE_API_URL=http://localhost:8000/api
```

**Requirements:**
- Backend running on `http://localhost:8000`
- Frontend running on `http://localhost:8080` or `http://localhost:5173`

**To use:**
1. Start backend: `cd back && python manage.py runserver`
2. Start frontend: `cd front && pnpm dev`
3. Access: `http://localhost:8080`

---

### Production (Railway Backend)
```env
# front/.env
VITE_API_URL=https://kim-store-production.up.railway.app/api
```

**Requirements:**
- Backend deployed on Railway
- Railway CORS configured to allow your frontend domain

**To use:**
1. Update `.env` to use Railway URL
2. Restart frontend dev server
3. Or deploy frontend to Vercel/Netlify

---

## Quick Switch Commands

### Switch to Local Backend
```bash
# Edit front/.env
VITE_API_URL=http://localhost:8000/api

# Restart frontend
cd front
pnpm dev
```

### Switch to Production Backend
```bash
# Edit front/.env
VITE_API_URL=https://kim-store-production.up.railway.app/api

# Restart frontend
cd front
pnpm dev
```

---

## CORS Configuration

### For Local Development
Backend automatically allows `localhost:8080` and `localhost:5173`

### For Production
Update Railway environment variables:
```env
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
```

---

## Troubleshooting

### CORS Error
**Error:** `No 'Access-Control-Allow-Origin' header`

**Solution:**
1. Check your `.env` file
2. If using local backend, ensure `VITE_API_URL=http://localhost:8000/api`
3. If using Railway, ensure Railway has your frontend URL in `CORS_ALLOWED_ORIGINS`
4. Restart frontend after changing `.env`

### Backend Not Running
**Error:** `Failed to fetch` or `net::ERR_CONNECTION_REFUSED`

**Solution:**
1. Start backend: `cd back && python manage.py runserver`
2. Verify backend is running: `http://localhost:8000/api/`

### Wrong Port
**Error:** Frontend on different port than expected

**Solution:**
- Vite default: `http://localhost:5173`
- Express default: `http://localhost:8080`
- Check your terminal for actual port
- Backend CORS allows both ports

---

## Environment Files

### `.env` (Development)
Used when running `pnpm dev`
```env
VITE_API_URL=http://localhost:8000/api
```

### `.env.production` (Production Build)
Used when running `pnpm build`
```env
VITE_API_URL=https://kim-store-production.up.railway.app/api
```

### `.env.vercel` (Vercel Deployment)
Set in Vercel dashboard:
- Variable: `VITE_API_URL`
- Value: `https://kim-store-production.up.railway.app/api`

---

## Current Configuration

✅ **Local Development Setup**
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:8000`
- API URL: `http://localhost:8000/api`

To test:
1. Backend: `cd back && python manage.py runserver`
2. Frontend: `cd front && pnpm dev`
3. Open: `http://localhost:8080`

---

## Production Deployment

### Backend (Railway)
- URL: `https://kim-store-production.up.railway.app`
- API: `https://kim-store-production.up.railway.app/api`
- Admin: `https://kim-store-production.up.railway.app/admin`

### Frontend (Vercel)
- Set `VITE_API_URL` in Vercel environment variables
- Deploy from GitHub
- Automatic deployments on push

---

**Remember:** Always restart your dev server after changing `.env` files!
