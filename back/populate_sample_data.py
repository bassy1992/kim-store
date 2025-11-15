#!/usr/bin/env python
"""
Populate sample data for Kimmy's Fragrance Store
Run with: python manage.py shell < populate_sample_data.py
Or: python populate_sample_data.py
"""

import os
import django
from datetime import date, timedelta
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from apps.products.models import Category, Product
from apps.content.models import (
    FAQ, Testimonial, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard, DupeProduct
)

print("🚀 Starting sample data population...")

# ============================================================================
# 1. CATEGORIES
# ============================================================================
print("\n📁 Creating categories...")

categories_data = [
    {"name": "Women's Perfumes", "description": "Elegant fragrances for women"},
    {"name": "Men's Perfumes", "description": "Bold scents for men"},
    {"name": "Unisex Perfumes", "description": "Versatile fragrances for everyone"},
    {"name": "Perfume Oils", "description": "Long-lasting concentrated oils"},
    {"name": "Air Ambience", "description": "Room and car fragrances"},
]

categories = {}
for cat_data in categories_data:
    category, created = Category.objects.get_or_create(
        name=cat_data["name"],
        defaults={"description": cat_data["description"]}
    )
    categories[cat_data["name"]] = category
    status = '✅ Created' if created else '⏭️  Exists'
    print(f"  {status}: {category.name}")

print(f"\n✅ Categories: {Category.objects.count()} total")
