#!/usr/bin/env python
"""Part 3: Populate Content (FAQs, Testimonials, Policies, etc.)"""
import os
import django
from datetime import date
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import (
    FAQ, Testimonial, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard, DupeProduct
)

# ============================================================================
# FAQs
# ============================================================================
print("\n❓ Creating FAQs...")

faqs_data = [
    {
        "question": "How long does shipping take?",
        "answer": "Standard shipping takes 3-5 business days within Ghana. Express shipping is available for 1-2 day delivery.",
        "category": "Shipping",
        "order": 1,
    },
    {
        "question": "Do you offer free shipping?",
        "answer": "Yes! We offer free standard shipping on all orders over GHS 250.",
        "category": "Shipping",
        "order": 2,
    },
    {
        "question": "What is your return policy?",
        "answer": "We accept returns within 30 days of purchase for unopened products in original packaging.",
        "category": "Returns",
        "order": 1,
    },
    {
        "question": "Are your perfumes authentic?",
        "answer": "All our perfumes are 100% authentic and sourced directly from authorized distributors.",
        "category": "Products",
        "order": 1,
    },
    {
        "question": "How should I store my perfume?",
        "answer": "Store perfumes in a cool, dry place away from direct sunlight to maintain their quality.",
        "category": "Products",
        "order": 2,
    },
]

for faq_data in faqs_data:
    faq, created = FAQ.objects.get_or_create(
        question=faq_data["question"],
        defaults=faq_data
    )
    status = '✅ Created' if created else '⏭️  Exists'
    print(f"  {status}: {faq.question[:50]}...")

print(f"\n✅ FAQs: {FAQ.objects.count()} total")
