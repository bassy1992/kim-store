#!/usr/bin/env python
"""Part 2: Populate Products"""
import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Category, Product

print("\n🌸 Creating products...")

products_data = [
    {
        "name": "Midnight Rose",
        "description": "A captivating blend of rose petals and vanilla with hints of amber. Perfect for evening wear.",
        "price": Decimal("150.00"),
        "category": "Women's Perfumes",
        "product_type": "perfume",
        "scent_family": "floral",
        "scent_notes": "Top: Rose Petals, Bergamot | Middle: Jasmine, Vanilla | Base: Amber, Musk",
        "size_options": "50ml, 100ml",
        "stock_quantity": 50,
        "is_featured": True,
        "is_best_seller": True,
    },
    {
        "name": "Ocean Breeze",
        "description": "Fresh and invigorating aquatic fragrance with citrus notes. Ideal for daytime.",
        "price": Decimal("120.00"),
        "category": "Women's Perfumes",
        "product_type": "perfume",
        "scent_family": "fresh",
        "scent_notes": "Top: Sea Salt, Lemon | Middle: Water Lily, Mint | Base: Driftwood, Musk",
        "size_options": "50ml, 100ml",
        "stock_quantity": 35,
        "is_new": True,
    },
    {
        "name": "Black Leather",
        "description": "Bold and masculine woody fragrance with leather accents.",
        "price": Decimal("160.00"),
        "category": "Men's Perfumes",
        "product_type": "perfume",
        "scent_family": "woody",
        "scent_notes": "Top: Bergamot, Black Pepper | Middle: Leather, Vetiver | Base: Cedar, Patchouli",
        "size_options": "50ml, 100ml",
        "stock_quantity": 40,
        "is_best_seller": True,
    },
]

for prod_data in products_data:
    cat_name = prod_data.pop("category")
    category = Category.objects.get(name=cat_name)
    product, created = Product.objects.get_or_create(
        name=prod_data["name"],
        defaults={**prod_data, "category": category}
    )
    status = '✅ Created' if created else '⏭️  Exists'
    print(f"  {status}: {product.name}")

print(f"\n✅ Products: {Product.objects.count()} total")
