# 🔧 Troubleshooting Guide

## CORS Errors

### Problem
```
Access to fetch at 'http://localhost:8000/api/...' from origin 'http://localhost:XXXX' 
has been blocked by CORS policy
```

### Solution
1. Check which port your frontend is running on (e.g., 5173, 8080, 3000)
2. Update `back/.env`:
   ```env
   CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:8080
   ```
3. **Restart the Django backend** (CORS settings are loaded on startup)
4. Refresh your browser

### Common Frontend Ports
- Vite default: `5173`
- Vite alternative: `8080`
- Create React App: `3000`
- Next.js: `3000`

---

## Backend Won't Start

### Problem: "Port already in use"
```bash
Error: That port is already in use.
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### Problem: "Module not found"
```bash
ModuleNotFoundError: No module named 'rest_framework'
```

**Solution:**
```bash
cd back
pip install -r requirements.txt
```

### Problem: "Database error"
```bash
django.db.utils.OperationalError: no such table
```

**Solution:**
```bash
cd back
python manage.py migrate
python manage.py seed_data
```

---

## Frontend Won't Start

### Problem: "Cannot find module"
```bash
Error: Cannot find module '@/lib/api'
```

**Solution:**
```bash
cd front
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Port already in use"
```bash
Port 5173 is in use
```

**Solution:**
- Vite will automatically try the next available port (8080, 8081, etc.)
- Or kill the process using that port
- Update CORS settings in backend to include the new port

---

## Products Not Loading

### Problem: Empty product list or loading forever

**Check 1: Backend is running**
```bash
# Visit in browser:
http://localhost:8000/api/products/
```
Should show JSON with products.

**Check 2: Database has data**
```bash
cd back
python manage.py seed_data
```

**Check 3: CORS is configured**
- Check browser console (F12) for CORS errors
- Verify `back/.env` has correct frontend URL
- Restart Django backend after changing `.env`

**Check 4: Frontend .env exists**
```bash
# Check front/.env exists with:
VITE_API_URL=http://localhost:8000/api
```

---

## Authentication Issues

### Problem: "Authentication credentials were not provided"

**Solution:**
Check if token is being sent:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Click on an API request
4. Check Headers → Request Headers
5. Should see: `Authorization: Token <your-token>`

If missing:
```javascript
import { setAuthToken } from '@/lib/api';
setAuthToken('your-token-here');
```

---

## API Returns 404

### Problem: `GET /api/products/ 404 Not Found`

**Check 1: URL is correct**
```javascript
// Correct
const API_URL = 'http://localhost:8000/api';

// Wrong (missing /api)
const API_URL = 'http://localhost:8000';
```

**Check 2: Backend URLs are configured**
```bash
# Visit:
http://localhost:8000/api/products/
```
Should work in browser.

---

## Database Issues

### Problem: "Database is locked"
```bash
sqlite3.OperationalError: database is locked
```

**Solution:**
```bash
cd back
# Close all connections
python manage.py migrate
# Or delete and recreate
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

### Problem: "No such table"
```bash
django.db.utils.OperationalError: no such table: products_product
```

**Solution:**
```bash
cd back
python manage.py makemigrations
python manage.py migrate
```

---

## Environment Variables Not Working

### Problem: Changes to .env not taking effect

**Solution:**
1. **Backend**: Restart Django server (Ctrl+C, then `python manage.py runserver`)
2. **Frontend**: Restart Vite dev server (Ctrl+C, then `npm run dev`)
3. **Frontend**: Vite env vars must start with `VITE_`
4. **Backend**: Use `python-decouple` to read env vars

---

## Browser Console Errors

### Problem: "Failed to fetch"
```
TypeError: Failed to fetch
```

**Checklist:**
- [ ] Backend is running on port 8000
- [ ] Frontend is running
- [ ] CORS is configured for frontend port
- [ ] No typos in API URL
- [ ] Network connection is working

### Problem: "Unexpected token < in JSON"
```
SyntaxError: Unexpected token < in JSON at position 0
```

**Cause:** API returned HTML (error page) instead of JSON

**Solution:**
1. Check the actual API response in Network tab
2. Visit the API URL directly in browser
3. Check Django logs for errors
4. Verify endpoint exists

---

## Quick Fixes

### Reset Everything
```bash
# Backend
cd back
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
python manage.py runserver

# Frontend (new terminal)
cd front
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Check All Services
```bash
# Backend API
curl http://localhost:8000/api/products/

# Frontend
curl http://localhost:5173

# Or visit in browser:
# http://localhost:8000/api/docs/
```

### View Django Logs
The Django terminal shows all requests:
```
[31/Oct/2025 22:46:00] "GET /api/products/ HTTP/1.1" 200 1234
```
- `200` = Success
- `404` = Not found
- `500` = Server error
- `403` = Forbidden (CORS or permissions)

---

## Still Having Issues?

1. **Check the test page**: Open `test-connection.html` in browser
2. **Check API docs**: http://localhost:8000/api/docs/
3. **Check browser console**: Press F12 → Console tab
4. **Check Django logs**: Look at the terminal running Django
5. **Check Network tab**: F12 → Network → See actual requests/responses

## Common Port Reference

| Service | Default Port | Alternative |
|---------|-------------|-------------|
| Django Backend | 8000 | 8001 |
| Vite Frontend | 5173 | 8080 |
| React (CRA) | 3000 | 3001 |
| PostgreSQL | 5432 | - |

## Need More Help?

- Review `INTEGRATION.md` for detailed setup
- Check `QUICKSTART.md` for basic setup
- Review `CONNECTION_SUMMARY.md` for architecture
- Visit http://localhost:8000/api/docs/ for API reference
