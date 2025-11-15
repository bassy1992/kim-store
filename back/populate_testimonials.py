#!/usr/bin/env python
"""Part 4: Populate Testimonials"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import Testimonial

print("\n⭐ Creating testimonials...")

testimonials_data = [
    {
        "customer_name": "Ama Mensah",
        "rating": 5,
        "comment": "The Midnight Rose perfume is absolutely divine! It lasts all day and I get compliments everywhere I go.",
        "product_name": "Midnight Rose",
        "is_featured": True,
    },
    {
        "customer_name": "Kwame Asante",
        "rating": 5,
        "comment": "Black Leather is my signature scent now. Bold, masculine, and long-lasting. Highly recommend!",
        "product_name": "Black Leather",
        "is_featured": True,
    },
    {
        "customer_name": "Akosua Boateng",
        "rating": 5,
        "comment": "Fast shipping and excellent customer service. The perfume oils are amazing value for money!",
        "is_featured": True,
    },
    {
        "customer_name": "Kofi Owusu",
        "rating": 4,
        "comment": "Great quality fragrances at affordable prices. Will definitely order again.",
        "is_featured": False,
    },
]

for test_data in testimonials_data:
    testimonial, created = Testimonial.objects.get_or_create(
        customer_name=test_data["customer_name"],
        defaults=test_data
    )
    status = '✅ Created' if created else '⏭️  Exists'
    print(f"  {status}: {testimonial.customer_name} - {testimonial.rating}/5")

print(f"\n✅ Testimonials: {Testimonial.objects.count()} total")
