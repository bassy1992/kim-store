#!/usr/bin/env python
"""Part 7: Populate Dupe Products"""
import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import DupeProduct

print("\n💎 Creating dupe products...")

dupes_data = [
    {
        "name": "Coco Essence",
        "description": "Our luxurious interpretation of the iconic Chanel fragrance. Elegant, timeless, and sophisticated.",
        "price": Decimal("120.00"),
        "designer_brand": "Chanel",
        "designer_fragrance": "Coco Mademoiselle",
        "designer_price": Decimal("450.00"),
        "similarity_percentage": 92,
        "scent_notes": "Top: Orange, Bergamot | Middle: Rose, Jasmine | Base: Patchouli, Vanilla",
        "longevity": "6-8 hours",
        "stock_quantity": 40,
        "is_featured": True,
    },
    {
        "name": "Sauvage Spirit",
        "description": "Bold and fresh interpretation of the popular Dior men's fragrance.",
        "price": Decimal("110.00"),
        "designer_brand": "Dior",
        "designer_fragrance": "Sauvage",
        "designer_price": Decimal("420.00"),
        "similarity_percentage": 90,
        "scent_notes": "Top: Bergamot, Pepper | Middle: Lavender, Geranium | Base: Ambroxan, Cedar",
        "longevity": "7-9 hours",
        "stock_quantity": 35,
        "is_featured": True,
    },
    {
        "name": "Black Opium Noir",
        "description": "Seductive and addictive fragrance inspired by YSL's bestseller.",
        "price": Decimal("130.00"),
        "designer_brand": "Yves Saint Laurent",
        "designer_fragrance": "Black Opium",
        "designer_price": Decimal("480.00"),
        "similarity_percentage": 88,
        "scent_notes": "Top: Coffee, Pink Pepper | Middle: Orange Blossom, Jasmine | Base: Vanilla, Patchouli",
        "longevity": "8-10 hours",
        "stock_quantity": 30,
        "is_featured": False,
    },
]

for dupe_data in dupes_data:
    dupe, created = DupeProduct.objects.get_or_create(
        name=dupe_data["name"],
        defaults=dupe_data
    )
    status = '✅ Created' if created else '⏭️  Exists'
    savings = dupe.get_savings()
    print(f"  {status}: {dupe.name} (Save GHS {savings})")

print(f"\n✅ Dupe Products: {DupeProduct.objects.count()} total")
