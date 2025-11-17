#!/usr/bin/env python
"""
Assign existing products to appropriate categories based on their scent family and product type
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Product, Category

print("📦 Analyzing existing products and their categories...\n")

# Get all products
products = Product.objects.all()

print(f"Total Products: {products.count()}\n")
print("Current Product Distribution:")
print("=" * 80)

# Show current distribution
for category in Category.objects.all().order_by('name'):
    count = category.products.count()
    if count > 0:
        print(f"  {category.name:30} ({category.slug:25}): {count:2} products")

print("\n" + "=" * 80)
print("\nProduct Details:")
print("=" * 80)

for product in products:
    print(f"\n📦 {product.name}")
    print(f"   Current Category: {product.category.name} ({product.category.slug})")
    print(f"   Product Type: {product.product_type}")
    print(f"   Scent Family: {product.scent_family or 'Not set'}")

print("\n" + "=" * 80)
print("\n🔧 Reassigning products to better categories based on scent family...\n")

# Get scent family categories
floral_cat = Category.objects.get(slug='floral')
woody_cat = Category.objects.get(slug='woody')
citrus_cat = Category.objects.get(slug='citrus')
oriental_cat = Category.objects.get(slug='oriental')
fresh_cat = Category.objects.get(slug='fresh')
spicy_cat = Category.objects.get(slug='spicy')

# Get product type categories
perfumes_cat = Category.objects.get(slug='perfumes')
perfume_oils_cat = Category.objects.get(slug='perfume-oils')
air_ambience_cat = Category.objects.get(slug='air-ambience')

updated_count = 0

# Strategy: Assign products to scent family categories if they have a scent_family set
# Otherwise, assign based on product_type
for product in products:
    old_category = product.category
    new_category = None
    
    # First priority: Assign based on scent family
    if product.scent_family:
        scent_mapping = {
            'floral': floral_cat,
            'woody': woody_cat,
            'citrus': citrus_cat,
            'oriental': oriental_cat,
            'fresh': fresh_cat,
            'spicy': spicy_cat,
        }
        new_category = scent_mapping.get(product.scent_family)
    
    # Second priority: Assign based on product type if no scent family
    if not new_category:
        type_mapping = {
            'perfume': perfumes_cat,
            'perfume_oil': perfume_oils_cat,
            'air_ambience': air_ambience_cat,
        }
        new_category = type_mapping.get(product.product_type, perfumes_cat)
    
    # Update if category changed
    if new_category and new_category != old_category:
        product.category = new_category
        product.save()
        print(f"✅ {product.name[:50]:50} | {old_category.name:20} → {new_category.name}")
        updated_count += 1
    else:
        print(f"⏭️  {product.name[:50]:50} | Keeping: {old_category.name}")

print("\n" + "=" * 80)
print(f"\n✅ Updated {updated_count} products")
print(f"⏭️  Kept {products.count() - updated_count} products in their current categories")

print("\n" + "=" * 80)
print("\nFinal Product Distribution:")
print("=" * 80)

for category in Category.objects.all().order_by('name'):
    count = category.products.count()
    if count > 0:
        print(f"  {category.name:30} ({category.slug:25}): {count:2} products")

print("\n" + "=" * 80)
print("✅ Done!")
