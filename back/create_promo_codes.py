#!/usr/bin/env python
"""
Create sample promo codes for testing
Run with: python manage.py shell < create_promo_codes.py
"""
import os
import django
from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.orders.models import PromoCode
from django.utils import timezone

print("Creating sample promo codes...")

# Clear existing promo codes (optional)
# PromoCode.objects.all().delete()

promo_codes = [
    {
        'code': 'WELCOME10',
        'description': '10% off for new customers',
        'discount_type': 'percentage',
        'discount_value': 10,
        'minimum_order_amount': 50,
        'valid_from': timezone.now(),
        'valid_until': timezone.now() + timedelta(days=365),
        'is_active': True,
    },
    {
        'code': 'SAVE20',
        'description': '20% off on orders over ₵100',
        'discount_type': 'percentage',
        'discount_value': 20,
        'minimum_order_amount': 100,
        'valid_from': timezone.now(),
        'valid_until': timezone.now() + timedelta(days=365),
        'is_active': True,
    },
    {
        'code': 'FREESHIP',
        'description': '₵15 off shipping',
        'discount_type': 'fixed',
        'discount_value': 15,
        'minimum_order_amount': 0,
        'valid_from': timezone.now(),
        'valid_until': timezone.now() + timedelta(days=365),
        'is_active': True,
    },
    {
        'code': 'VIP50',
        'description': '₵50 off for VIP customers',
        'discount_type': 'fixed',
        'discount_value': 50,
        'minimum_order_amount': 200,
        'valid_from': timezone.now(),
        'valid_until': timezone.now() + timedelta(days=365),
        'is_active': True,
    },
]

for promo_data in promo_codes:
    promo, created = PromoCode.objects.get_or_create(
        code=promo_data['code'],
        defaults=promo_data
    )
    if created:
        print(f"✅ Created: {promo.code} - {promo.description}")
    else:
        print(f"ℹ️  Already exists: {promo.code}")

print("\n✨ Promo codes ready!")
print("\nAvailable codes:")
for promo in PromoCode.objects.filter(is_active=True):
    print(f"  - {promo.code}: {promo.get_discount_display()} (min order: ₵{promo.minimum_order_amount})")
