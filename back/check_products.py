#!/usr/bin/env python
"""
Script to check products in Railway database
Run this in Railway shell: python check_products.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Product, Category

def check_database():
    print("=" * 50)
    print("DATABASE CHECK")
    print("=" * 50)
    
    # Check categories
    categories = Category.objects.all()
    print(f"\n📁 Categories: {categories.count()}")
    for cat in categories:
        print(f"  - {cat.name} (slug: {cat.slug})")
    
    # Check products
    products = Product.objects.all()
    print(f"\n📦 Products: {products.count()}")
    for prod in products[:10]:  # Show first 10
        print(f"  - {prod.name} (${prod.price}) - Stock: {prod.stock_quantity}")
    
    if products.count() > 10:
        print(f"  ... and {products.count() - 10} more")
    
    # Check featured products
    featured = Product.objects.filter(is_featured=True)
    print(f"\n⭐ Featured Products: {featured.count()}")
    
    print("\n" + "=" * 50)
    
    if products.count() == 0:
        print("⚠️  NO PRODUCTS FOUND!")
        print("Run: python manage.py create_sample_data")
    else:
        print("✅ Database has products!")
    
    print("=" * 50)

if __name__ == '__main__':
    check_database()
