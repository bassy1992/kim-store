# Add Products to Railway Database

## Quick Check & Fix

### Step 1: Open Railway Shell
1. Go to Railway Dashboard: https://railway.app/dashboard
2. Click on your service: **kim-store-production**
3. Click on **Shell** tab (or click the terminal icon)

### Step 2: Check if Products Exist

Run this command in Railway shell:
```bash
cd back
python check_products.py
```

This will show:
- Number of categories
- Number of products
- Featured products count

### Step 3: Create Sample Products (if needed)

If no products exist, run:
```bash
cd back
python create_sample_products.py
```

This will create:
- ✅ 4 Categories (Floral, Woody, Citrus, Oriental)
- ✅ 8 Products with images and descriptions
- ✅ 5 Featured products

### Step 4: Verify Products

Check again:
```bash
cd back
python check_products.py
```

Should show 8 products!

### Step 5: Test API

Test the API endpoint:
```bash
curl https://kim-store-production.up.railway.app/api/products/
```

Should return JSON with products.

## Alternative: Use Django Admin

### Step 1: Create Superuser
In Railway shell:
```bash
cd back
python manage.py createsuperuser
```

Follow prompts to create admin account.

### Step 2: Access Admin Panel
1. Go to: https://kim-store-production.up.railway.app/admin/
2. Login with superuser credentials
3. Click "Products" → "Add Product"
4. Add products manually

## Quick Django Commands

```bash
# Check database tables
cd back
python manage.py showmigrations

# Run migrations if needed
cd back
python manage.py migrate

# Create superuser
cd back
python manage.py createsuperuser

# Check products count
cd back
python manage.py shell
>>> from apps.products.models import Product
>>> Product.objects.count()
>>> exit()
```

## Files Created

I've created these helper scripts in the `back/` directory:
- ✅ `check_products.py` - Check database contents
- ✅ `create_sample_products.py` - Create sample data

Upload these to Railway or run them in the shell!

## After Adding Products

1. Refresh your frontend: https://front-pi-nine.vercel.app
2. Products should now appear
3. Check browser console for any errors

## Troubleshooting

**If scripts don't work:**
1. Make sure you're in the `back/` directory
2. Check that migrations are applied: `python manage.py migrate`
3. Check Railway logs for errors

**If API returns empty:**
1. Verify products exist in database
2. Check CORS settings in Railway
3. Verify `VITE_API_URL` in Vercel

Your database should now have products! 🎉
