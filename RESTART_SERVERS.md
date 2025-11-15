# Restart Servers - Fix Cart Quantity Update

## Issue
Cart quantity update buttons showing 405 Method Not Allowed error because Django server is running old code.

## Solution
Restart both backend and frontend servers.

## Steps

### 1. Stop Django Backend
In the terminal running Django:
```
Press Ctrl+C
```

### 2. Restart Django Backend
```bash
cd back
python manage.py runserver
```

### 3. Refresh Frontend
In your browser:
```
Press Ctrl+F5 (hard refresh)
Or
Press Ctrl+Shift+R
```

### 4. Test Cart Quantity
1. Go to http://localhost:8080/cart
2. Click + or - buttons
3. Should work without errors!

## Verification

### Check Django Logs
After clicking +/-, you should see:
```
PATCH /api/cart/items/1/ 200
```

NOT:
```
PATCH /api/cart/items/1/ 405
```

### Check Browser Console
Should NOT see:
```
405 (Method Not Allowed)
```

Should see:
```
PATCH http://localhost:8000/api/cart/items/1/ 200
```

## What Changed

### Backend (Django)
```python
# Before
@action(detail=False, methods=['put'], ...)

# After
@action(detail=False, methods=['put', 'patch'], ...)
```

### Frontend
```typescript
// Before
method: 'PUT'

// After
method: 'PATCH'
```

## If Still Not Working

### 1. Verify Django Code
```bash
cd back
grep -n "methods=\['put', 'patch'\]" apps/orders/views.py
```

Should show line with both methods.

### 2. Check Django is Running
```bash
curl http://localhost:8000/api/cart/
```

Should return cart data, not connection error.

### 3. Clear Browser Cache
```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
```

### 4. Check CORS
In browser console, check if CORS headers are present:
```javascript
fetch('http://localhost:8000/api/cart/')
  .then(r => console.log(r.headers.get('access-control-allow-methods')))
```

Should include: `DELETE, GET, OPTIONS, PATCH, POST, PUT`

## Success Criteria

✅ Django server restarted
✅ No 405 errors in console
✅ Quantity buttons work
✅ Cart updates in real-time
✅ Totals recalculate correctly

---

**Remember:** Always restart Django after changing Python code!
