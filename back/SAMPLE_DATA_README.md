# Sample Data Population Scripts

## Overview
These scripts populate your Django backend with sample data for testing and development.

## Quick Start

### Option 1: Run All Scripts at Once (Recommended)
```bash
python populate_all_data.py
```

This will populate everything in the correct order:
1. Categories
2. Products
3. FAQs
4. Testimonials
5. Policies (Shipping, Returns)
6. Gift Cards
7. Dupe Products

### Option 2: Run Individual Scripts
```bash
python populate_sample_data.py      # Categories
python populate_products.py         # Products
python populate_content.py          # FAQs
python populate_testimonials.py     # Testimonials
python populate_policies.py         # Shipping & Return policies
python populate_giftcards.py        # Gift cards
python populate_dupes.py            # Dupe products
```

## What Gets Created

### Categories (5)
- Women's Perfumes
- Men's Perfumes
- Unisex Perfumes
- Perfume Oils
- Air Ambience

### Products (10+)
- **Women's**: Midnight Rose, Ocean Breeze, Golden Sunset
- **Men's**: Black Leather, Urban Legend
- **Unisex**: Mystic Woods
- **Oils**: Rose Oud Oil, Vanilla Musk Oil
- **Air**: Lavender Dreams, Citrus Burst

### FAQs (5)
- Shipping questions
- Return policy questions
- Product authenticity
- Storage tips

### Testimonials (4)
- Featured customer reviews
- 4-5 star ratings
- Product-specific feedback

### Policies
- **Shipping Info**: Delivery times, free shipping threshold
- **Return Policy**: 30-day returns, refund process

### Gift Cards (4)
- GHS 50, 100, 200, 500 denominations

### Dupe Products (3)
- Coco Essence (Chanel Coco Mademoiselle dupe)
- Sauvage Spirit (Dior Sauvage dupe)
- Black Opium Noir (YSL Black Opium dupe)

## Requirements

Make sure you have:
1. Django project set up
2. All migrations applied: `python manage.py migrate`
3. Virtual environment activated

## Troubleshooting

### "No module named 'apps'"
Make sure you're running from the `back/` directory:
```bash
cd back
python populate_all_data.py
```

### "DJANGO_SETTINGS_MODULE not set"
The scripts set this automatically, but if you get this error:
```bash
export DJANGO_SETTINGS_MODULE=config.settings  # Linux/Mac
set DJANGO_SETTINGS_MODULE=config.settings     # Windows
```

### "Table doesn't exist"
Run migrations first:
```bash
python manage.py migrate
```

### Duplicate Data
The scripts use `get_or_create()`, so running them multiple times won't create duplicates. Existing data will be skipped.

## Customization

To add your own data:
1. Copy one of the populate scripts
2. Modify the data dictionaries
3. Run your custom script

Example:
```python
products_data = [
    {
        "name": "Your Product",
        "description": "Your description",
        "price": Decimal("100.00"),
        # ... more fields
    },
]
```

## After Population

### View in Admin
1. Start server: `python manage.py runserver`
2. Go to: http://localhost:8000/admin/
3. Login with your superuser credentials
4. Browse and edit the sample data

### Test API Endpoints
1. API Docs: http://localhost:8000/api/docs/
2. Test endpoints:
   - GET /api/products/
   - GET /api/faqs/
   - GET /api/testimonials/featured/
   - GET /api/gift-cards/
   - GET /api/dupes/

### Clear Sample Data
To remove all sample data:
```bash
python manage.py flush
```
⚠️ Warning: This deletes ALL data including your superuser!

## Production Use

For production:
1. Don't use these sample scripts
2. Create real data through the admin interface
3. Or create custom population scripts with real content
4. Consider using Django fixtures for backup/restore

## Support

If you encounter issues:
1. Check that all apps are in INSTALLED_APPS
2. Verify migrations are applied
3. Check Django logs for errors
4. Ensure database is accessible

## Next Steps

After populating data:
1. ✅ Test all API endpoints
2. ✅ Verify data in admin interface
3. ✅ Connect frontend to backend
4. ✅ Test frontend pages with real data
5. ✅ Add product images via admin
6. ✅ Customize content for your brand
