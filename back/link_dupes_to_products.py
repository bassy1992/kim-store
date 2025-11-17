#!/usr/bin/env python
"""
Link DupeProducts to actual Products in inventory
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import DupeProduct
from apps.products.models import Product, Category

print("\n🔗 Linking Dupes to Products...")

# Get or create Dupes category
dupes_category, _ = Category.objects.get_or_create(
    slug='designer-dupes',
    defaults={
        'name': 'Designer Dupes',
        'description': 'Affordable alternatives to luxury designer fragrances'
    }
)

# Link each dupe to a product
dupes = DupeProduct.objects.all()

for dupe in dupes:
    if dupe.product:
        print(f"✓ {dupe.name} already linked to product #{dupe.product.id}")
        continue
    
    # Create a product for this dupe
    product, created = Product.objects.get_or_create(
        slug=dupe.slug,
        defaults={
            'name': dupe.name,
            'description': dupe.description,
            'price': dupe.price,
            'category': dupes_category,
            'product_type': 'perfume',
            'scent_family': 'mixed',  # You can update this based on notes
            'scent_notes': dupe.scent_notes,
            'stock_quantity': dupe.stock_quantity,
            'is_featured': dupe.is_featured,
        }
    )
    
    # Link the dupe to the product
    dupe.product = product
    dupe.save()
    
    if created:
        print(f"✓ Created product #{product.id} and linked to dupe: {dupe.name}")
    else:
        print(f"✓ Linked existing product #{product.id} to dupe: {dupe.name}")

print(f"\n✅ Successfully linked {dupes.count()} dupes to products!")
