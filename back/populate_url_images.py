#!/usr/bin/env python
"""
Script to populate products with URL-based images
Run this after migrating to the new URL-based image system
"""

import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.products.models import Product, ProductImage, Category

def create_sample_images():
    """Create sample products with URL-based images"""
    
    # Sample image URLs (you can replace these with your actual image URLs)
    sample_images = {
        'perfume': [
            'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
            'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400',
            'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
        ],
        'perfume_oil': [
            'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
            'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400',
        ],
        'air_ambience': [
            'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        ]
    }
    
    # Get or create categories
    perfume_cat, _ = Category.objects.get_or_create(
        name='Perfumes',
        defaults={'description': 'Luxury perfumes and fragrances'}
    )
    
    oil_cat, _ = Category.objects.get_or_create(
        name='Perfume Oils',
        defaults={'description': 'Concentrated perfume oils'}
    )
    
    ambience_cat, _ = Category.objects.get_or_create(
        name='Air Ambience',
        defaults={'description': 'Room and air fragrances'}
    )
    
    # Sample products with images
    products_data = [
        {
            'name': 'Elegant Rose Perfume',
            'category': perfume_cat,
            'product_type': 'perfume',
            'scent_family': 'floral',
            'price': 89.99,
            'description': 'A luxurious rose-scented perfume with hints of jasmine and vanilla.',
            'scent_notes': 'Top: Rose petals, Middle: Jasmine, Base: Vanilla',
            'stock_quantity': 25,
            'is_featured': True,
            'images': sample_images['perfume'][:2]
        },
        {
            'name': 'Mystic Oud Oil',
            'category': oil_cat,
            'product_type': 'perfume_oil',
            'scent_family': 'oriental',
            'price': 129.99,
            'description': 'Premium oud oil with deep, rich fragrance.',
            'scent_notes': 'Top: Bergamot, Middle: Oud, Base: Sandalwood',
            'stock_quantity': 15,
            'is_new': True,
            'images': sample_images['perfume_oil']
        },
        {
            'name': 'Fresh Citrus Ambience',
            'category': ambience_cat,
            'product_type': 'air_ambience',
            'scent_family': 'citrus',
            'price': 39.99,
            'description': 'Refreshing citrus air freshener for your home.',
            'scent_notes': 'Top: Lemon, Middle: Orange, Base: Grapefruit',
            'stock_quantity': 50,
            'is_best_seller': True,
            'images': sample_images['air_ambience']
        }
    ]
    
    created_count = 0
    
    for product_data in products_data:
        # Extract images from product data
        image_urls = product_data.pop('images', [])
        
        # Create or get product
        product, created = Product.objects.get_or_create(
            name=product_data['name'],
            defaults=product_data
        )
        
        if created:
            created_count += 1
            print(f"Created product: {product.name}")
            
            # Add images
            for i, image_url in enumerate(image_urls):
                ProductImage.objects.create(
                    product=product,
                    image_url=image_url,
                    alt_text=f"{product.name} - Image {i+1}",
                    is_primary=(i == 0),  # First image is primary
                    order=i
                )
                print(f"  Added image: {image_url}")
        else:
            print(f"Product already exists: {product.name}")
    
    print(f"\nCreated {created_count} new products with URL-based images!")
    print("You can now view them in the Django admin at /admin/")

if __name__ == '__main__':
    create_sample_images()