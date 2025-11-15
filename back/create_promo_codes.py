#!/usr/bin/env python
"""
Create sample promo codes for testing
"""
import os
import sys
import django
from datetime import datetime, timedelta
from django.utils import timezone

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.orders.models import PromoCode

def create_promo_codes():
    """Create sample promo codes"""
    
    # Clear existing promo codes
    PromoCode.objects.all().delete()
    print("🗑️ Cleared existing promo codes")
    
    now = timezone.now()
    
    promo_codes = [
        {
            'code': 'WELCOME10',
            'description': 'Welcome discount - 10% off your first order',
            'discount_type': 'percentage',
            'discount_value': 10,
            'minimum_order_amount': 50,
            'maximum_discount_amount': 20,
            'usage_limit': 100,
            'valid_from': now,
            'valid_until': now + timedelta(days=30),
        },
        {
            'code': 'SAVE20',
            'description': '20% off orders over ₵100',
            'discount_type': 'percentage',
            'discount_value': 20,
            'minimum_order_amount': 100,
            'maximum_discount_amount': 50,
            'usage_limit': 50,
            'valid_from': now,
            'valid_until': now + timedelta(days=60),
        },
        {
            'code': 'FLAT15',
            'description': '₵15 off any order',
            'discount_type': 'fixed',
            'discount_value': 15,
            'minimum_order_amount': 30,
            'usage_limit': None,  # Unlimited
            'valid_from': now,
            'valid_until': now + timedelta(days=90),
        },
        {
            'code': 'BIGDEAL',
            'description': '30% off orders over ₵200',
            'discount_type': 'percentage',
            'discount_value': 30,
            'minimum_order_amount': 200,
            'maximum_discount_amount': 100,
            'usage_limit': 25,
            'valid_from': now,
            'valid_until': now + timedelta(days=14),
        },
        {
            'code': 'FREESHIP',
            'description': '₵10 off for free shipping',
            'discount_type': 'fixed',
            'discount_value': 10,
            'minimum_order_amount': 25,
            'usage_limit': 200,
            'valid_from': now,
            'valid_until': now + timedelta(days=45),
        },
        {
            'code': 'EXPIRED',
            'description': 'Expired promo code for testing',
            'discount_type': 'percentage',
            'discount_value': 50,
            'minimum_order_amount': 0,
            'valid_from': now - timedelta(days=30),
            'valid_until': now - timedelta(days=1),
            'is_active': False,
        }
    ]
    
    created_count = 0
    for promo_data in promo_codes:
        promo = PromoCode.objects.create(**promo_data)
        print(f"✅ Created promo code: {promo.code} - {promo.get_discount_display()}")
        created_count += 1
    
    print(f"\n🎉 Successfully created {created_count} promo codes!")
    print("\n📋 Available Promo Codes:")
    for promo in PromoCode.objects.filter(is_active=True):
        status = "✅ Active" if promo.is_valid()[0] else "❌ Invalid"
        print(f"   {promo.code}: {promo.description} - {promo.get_discount_display()} {status}")

if __name__ == '__main__':
    create_promo_codes()