#!/usr/bin/env python
"""
Script to create sample products in Railway database
Run this in Railway shell: python create_sample_products.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Product, Category
from decimal import Decimal

def create_sample_data():
    print("Creating sample data...")
    
    # Create categories
    categories_data = [
        {"name": "Floral", "slug": "floral", "description": "Romantic and elegant floral fragrances"},
        {"name": "Woody", "slug": "woody", "description": "Warm and sophisticated woody scents"},
        {"name": "Citrus", "slug": "citrus", "description": "Fresh and energizing citrus notes"},
        {"name": "Oriental", "slug": "oriental", "description": "Exotic and mysterious oriental fragrances"},
    ]
    
    categories = {}
    for cat_data in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=cat_data["slug"],
            defaults=cat_data
        )
        categories[cat.slug] = cat
        print(f"{'Created' if created else 'Found'} category: {cat.name}")
    
    # Create products
    products_data = [
        {
            "name": "Midnight Rose",
            "slug": "midnight-rose",
            "description": "A captivating blend of rose petals and vanilla",
            "price": Decimal("89.99"),
            "category": categories["floral"],
            "stock_quantity": 50,
            "is_featured": True,
            "primary_image": "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800",
        },
        {
            "name": "Ocean Breeze",
            "slug": "ocean-breeze",
            "description": "Fresh aquatic notes with hints of citrus",
            "price": Decimal("79.99"),
            "category": categories["citrus"],
            "stock_quantity": 45,
            "is_featured": True,
            "primary_image": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800",
        },
        {
            "name": "Sandalwood Dreams",
            "slug": "sandalwood-dreams",
            "description": "Rich sandalwood with warm amber undertones",
            "price": Decimal("99.99"),
            "category": categories["woody"],
            "stock_quantity": 30,
            "is_featured": True,
            "primary_image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800",
        },
        {
            "name": "Spice Market",
            "slug": "spice-market",
            "description": "Exotic spices with hints of vanilla and musk",
            "price": Decimal("94.99"),
            "category": categories["oriental"],
            "stock_quantity": 40,
            "is_featured": True,
            "primary_image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800",
        },
        {
            "name": "Lavender Fields",
            "slug": "lavender-fields",
            "description": "Calming lavender with soft floral notes",
            "price": Decimal("74.99"),
            "category": categories["floral"],
            "stock_quantity": 60,
            "is_featured": False,
            "primary_image": "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800",
        },
        {
            "name": "Citrus Burst",
            "slug": "citrus-burst",
            "description": "Vibrant blend of lemon, orange, and grapefruit",
            "price": Decimal("69.99"),
            "category": categories["citrus"],
            "stock_quantity": 55,
            "is_featured": False,
            "primary_image": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=800",
        },
        {
            "name": "Cedar & Sage",
            "slug": "cedar-sage",
            "description": "Earthy cedar wood with fresh sage",
            "price": Decimal("84.99"),
            "category": categories["woody"],
            "stock_quantity": 35,
            "is_featured": False,
            "primary_image": "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800",
        },
        {
            "name": "Amber Nights",
            "slug": "amber-nights",
            "description": "Warm amber with hints of patchouli",
            "price": Decimal("89.99"),
            "category": categories["oriental"],
            "stock_quantity": 42,
            "is_featured": True,
            "primary_image": "https://images.unsplash.com/photo-1602874801006-e04b6d0c5d85?q=80&w=800",
        },
    ]
    
    for prod_data in products_data:
        prod, created = Product.objects.get_or_create(
            slug=prod_data["slug"],
            defaults=prod_data
        )
        print(f"{'Created' if created else 'Found'} product: {prod.name} (${prod.price})")
    
    print("\n" + "=" * 50)
    print(f"✅ Total Categories: {Category.objects.count()}")
    print(f"✅ Total Products: {Product.objects.count()}")
    print(f"✅ Featured Products: {Product.objects.filter(is_featured=True).count()}")
    print("=" * 50)
    print("\n🎉 Sample data created successfully!")

if __name__ == '__main__':
    create_sample_data()
