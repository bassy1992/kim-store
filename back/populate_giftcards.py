#!/usr/bin/env python
"""Part 6: Populate Gift Cards"""
import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import GiftCard

print("\n🎁 Creating gift cards...")

giftcards_data = [
    {
        "name": "Gift Card - GHS 50",
        "description": "Perfect for trying out new fragrances. Can be used on any product in our store.",
        "amount": Decimal("50.00"),
    },
    {
        "name": "Gift Card - GHS 100",
        "description": "Great gift for fragrance lovers. Redeemable on all products.",
        "amount": Decimal("100.00"),
    },
    {
        "name": "Gift Card - GHS 200",
        "description": "Premium gift card for the ultimate fragrance experience.",
        "amount": Decimal("200.00"),
    },
    {
        "name": "Gift Card - GHS 500",
        "description": "Luxury gift card for special occasions. Perfect for building a fragrance collection.",
        "amount": Decimal("500.00"),
    },
]

for gc_data in giftcards_data:
    giftcard, created = GiftCard.objects.get_or_create(
        amount=gc_data["amount"],
        defaults=gc_data
    )
    status = '✅ Created' if created else '⏭️  Exists'
    print(f"  {status}: {giftcard.name}")

print(f"\n✅ Gift Cards: {GiftCard.objects.count()} total")
