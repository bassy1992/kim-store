#!/usr/bin/env python
"""Part 5: Populate Policies and Info"""
import os
import django
from datetime import date
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import ShippingInfo, ReturnPolicy, TermsAndConditions, PrivacyPolicy, GiftCard

# ============================================================================
# Shipping Info
# ============================================================================
print("\n📦 Creating shipping info...")

shipping_content = """
<h2>Shipping Information</h2>
<p>We offer reliable shipping services across Ghana.</p>

<h3>Delivery Options</h3>
<ul>
    <li><strong>Standard Delivery:</strong> 3-5 business days - FREE on orders over GHS 250</li>
    <li><strong>Express Delivery:</strong> 1-2 business days - GHS 20</li>
</ul>

<h3>Shipping Locations</h3>
<p>We currently ship to all regions in Ghana including Accra, Kumasi, Takoradi, Tamale, and more.</p>

<h3>Order Processing</h3>
<p>Orders are processed within 24 hours on business days. You will receive a tracking number once your order ships.</p>
"""

shipping, created = ShippingInfo.objects.get_or_create(
    title="Shipping Information",
    defaults={
        "content": shipping_content,
        "free_shipping_threshold": Decimal("250.00"),
        "standard_delivery_days": "3-5 business days",
        "express_delivery_days": "1-2 business days",
        "international_shipping": False,
    }
)
status = '✅ Created' if created else '⏭️  Exists'
print(f"  {status}: {shipping.title}")

# ============================================================================
# Return Policy
# ============================================================================
print("\n🔄 Creating return policy...")

return_content = """
<h2>Return & Refund Policy</h2>
<p>We want you to be completely satisfied with your purchase.</p>

<h3>Return Window</h3>
<p>You have 30 days from the date of delivery to return eligible items.</p>

<h3>Eligible Returns</h3>
<ul>
    <li>Unopened products in original packaging</li>
    <li>Products with intact seals</li>
    <li>Items with original receipt or order confirmation</li>
</ul>

<h3>Non-Returnable Items</h3>
<ul>
    <li>Opened perfumes or perfume oils</li>
    <li>Gift cards</li>
    <li>Sale or clearance items</li>
</ul>

<h3>Refund Process</h3>
<p>Refunds are processed within 5-7 business days after we receive your return.</p>
"""

return_policy, created = ReturnPolicy.objects.get_or_create(
    title="Return Policy",
    defaults={
        "content": return_content,
        "return_window_days": 30,
        "refund_processing_days": "5-7 business days",
    }
)
status = '✅ Created' if created else '⏭️  Exists'
print(f"  {status}: {return_policy.title}")

print("\n✅ Policies created successfully")
