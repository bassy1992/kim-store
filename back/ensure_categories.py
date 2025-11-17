#!/usr/bin/env python
"""
Ensure categories exist in the database
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Category

# Define categories with descriptions
categories_data = [
    {
        'name': 'Perfumes',
        'slug': 'perfumes',
        'description': 'Luxury perfumes and eau de parfum'
    },
    {
        'name': 'Perfume Oils',
        'slug': 'perfume-oils',
        'description': 'Concentrated perfume oils for long-lasting fragrance'
    },
    {
        'name': 'Air Ambience',
        'slug': 'air-ambience',
        'description': 'Room fragrances and air fresheners'
    },
    {
        'name': 'Floral',
        'slug': 'floral',
        'description': 'Romantic & Elegant floral fragrances'
    },
    {
        'name': 'Woody',
        'slug': 'woody',
        'description': 'Warm & Sophisticated woody scents'
    },
    {
        'name': 'Citrus',
        'slug': 'citrus',
        'description': 'Fresh & Energizing citrus notes'
    },
    {
        'name': 'Oriental',
        'slug': 'oriental',
        'description': 'Exotic & Mysterious oriental fragrances'
    },
    {
        'name': 'Fresh',
        'slug': 'fresh',
        'description': 'Clean & Invigorating fresh scents'
    },
    {
        'name': 'Spicy',
        'slug': 'spicy',
        'description': 'Bold & Warm spicy fragrances'
    },
]

print("🔧 Ensuring categories exist in database...\n")

created_count = 0
existing_count = 0

for cat_data in categories_data:
    category, created = Category.objects.get_or_create(
        slug=cat_data['slug'],
        defaults={
            'name': cat_data['name'],
            'description': cat_data['description']
        }
    )
    
    if created:
        print(f"✅ Created: {category.name}")
        created_count += 1
    else:
        print(f"ℹ️  Exists: {category.name}")
        existing_count += 1

print(f"\n{'='*50}")
print(f"✅ Total Categories: {Category.objects.count()}")
print(f"✅ Created: {created_count}")
print(f"ℹ️  Already existed: {existing_count}")
print(f"{'='*50}")
