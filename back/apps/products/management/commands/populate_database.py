from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.products.models import Category, Product, ProductImage
from apps.orders.models import PromoCode
from apps.blog.models import BlogPost
from django.utils import timezone
from datetime import timedelta
import random

class Command(BaseCommand):
    help = 'Populate database with sample data for fragrances store'

    def handle(self, *args, **options):
        self.stdout.write('Starting database population...')
        
        # Create categories
        self.create_categories()
        
        # Create products
        self.create_products()
        
        # Create promo codes
        self.create_promo_codes()
        
        # Create blog posts
        self.create_blog_posts()
        
        self.stdout.write(
            self.style.SUCCESS('Database populated successfully!')
        )

    def create_categories(self):
        """Create product categories"""
        categories_data = [
            {
                'name': 'Men\'s Fragrances',
                'description': 'Premium fragrances designed for men'
            },
            {
                'name': 'Women\'s Fragrances', 
                'description': 'Elegant fragrances for women'
            },
            {
                'name': 'Unisex Fragrances',
                'description': 'Versatile fragrances for everyone'
            },
            {
                'name': 'Perfume Oils',
                'description': 'Concentrated fragrance oils with long-lasting wear'
            },
            {
                'name': 'Air Fresheners',
                'description': 'Home and car air fresheners, room sprays, and diffusers'
            }
        ]
        
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            if created:
                self.stdout.write(f'Created category: {category.name}')

    def create_products(self):
        """Create sample products"""
        categories = Category.objects.all()
        
        products_data = [
            # Men's Fragrances
            {
                'name': 'Midnight Oud',
                'description': 'A sophisticated blend of oud, amber, and sandalwood. Perfect for evening wear.',
                'price': 150.00,
                'category': 'Men\'s Fragrances',
                'product_type': 'perfume',
                'scent_family': 'woody',
                'scent_notes': 'Top: Bergamot, Cardamom | Middle: Oud, Rose | Base: Amber, Sandalwood',
                'size_options': '50ml, 100ml',
                'stock_quantity': 25,
                'is_featured': True,
                'is_best_seller': True,
                'images': [
                    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
                    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400'
                ]
            },
            {
                'name': 'Ocean Breeze',
                'description': 'Fresh aquatic fragrance with citrus top notes and marine accords.',
                'price': 120.00,
                'category': 'Men\'s Fragrances',
                'product_type': 'perfume',
                'scent_family': 'fresh',
                'scent_notes': 'Top: Lemon, Sea Salt | Middle: Marine Accord, Jasmine | Base: Driftwood, Musk',
                'size_options': '50ml, 100ml',
                'stock_quantity': 30,
                'is_new': True,
                'images': [
                    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
                ]
            },
            
            # Women's Fragrances
            {
                'name': 'Rose Garden',
                'description': 'Romantic floral bouquet with Bulgarian rose and peony.',
                'price': 140.00,
                'category': 'Women\'s Fragrances',
                'product_type': 'perfume',
                'scent_family': 'floral',
                'scent_notes': 'Top: Pink Pepper, Bergamot | Middle: Bulgarian Rose, Peony | Base: White Musk, Cedar',
                'size_options': '30ml, 50ml, 100ml',
                'stock_quantity': 20,
                'is_featured': True,
                'images': [
                    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400'
                ]
            },
            {
                'name': 'Vanilla Dreams',
                'description': 'Sweet and warm vanilla with hints of caramel and amber.',
                'price': 110.00,
                'category': 'Women\'s Fragrances',
                'product_type': 'perfume',
                'scent_family': 'oriental',
                'scent_notes': 'Top: Mandarin, Pink Pepper | Middle: Vanilla, Caramel | Base: Amber, Tonka Bean',
                'size_options': '50ml, 100ml',
                'stock_quantity': 35,
                'is_best_seller': True,
                'images': [
                    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400'
                ]
            },
            
            # Unisex Fragrances
            {
                'name': 'Citrus Burst',
                'description': 'Energizing citrus blend perfect for any occasion.',
                'price': 95.00,
                'category': 'Unisex Fragrances',
                'product_type': 'perfume',
                'scent_family': 'citrus',
                'scent_notes': 'Top: Grapefruit, Lemon, Orange | Middle: Mint, Green Tea | Base: White Musk',
                'size_options': '50ml, 100ml',
                'stock_quantity': 40,
                'is_new': True,
                'images': [
                    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400'
                ]
            },
            
            # Perfume Oils
            {
                'name': 'Amber Essence Oil',
                'description': 'Concentrated amber oil with long-lasting projection.',
                'price': 75.00,
                'category': 'Perfume Oils',
                'product_type': 'perfume_oil',
                'scent_family': 'oriental',
                'scent_notes': 'Pure amber with hints of vanilla and musk',
                'size_options': '10ml, 20ml',
                'stock_quantity': 50,
                'is_limited_edition': True,
                'images': [
                    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400'
                ]
            },
            {
                'name': 'Oud Royal Oil',
                'description': 'Premium oud oil from sustainable sources. Intense and long-lasting.',
                'price': 120.00,
                'category': 'Perfume Oils',
                'product_type': 'perfume_oil',
                'scent_family': 'woody',
                'scent_notes': 'Pure oud with rose and saffron accents',
                'size_options': '5ml, 10ml, 20ml',
                'stock_quantity': 15,
                'is_featured': True,
                'is_limited_edition': True,
                'images': [
                    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
                ]
            },
            {
                'name': 'Jasmine Night Oil',
                'description': 'Exotic jasmine oil perfect for evening wear.',
                'price': 65.00,
                'category': 'Perfume Oils',
                'product_type': 'perfume_oil',
                'scent_family': 'floral',
                'scent_notes': 'Jasmine, white tea, soft musk',
                'size_options': '10ml, 20ml',
                'stock_quantity': 30,
                'is_new': True,
                'images': [
                    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400'
                ]
            },
            {
                'name': 'Sandalwood Serenity Oil',
                'description': 'Calming sandalwood oil with meditative properties.',
                'price': 80.00,
                'category': 'Perfume Oils',
                'product_type': 'perfume_oil',
                'scent_family': 'woody',
                'scent_notes': 'Australian sandalwood, cedar, white musk',
                'size_options': '10ml, 20ml',
                'stock_quantity': 25,
                'images': [
                    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400'
                ]
            },
            {
                'name': 'Musk Al Tahara Oil',
                'description': 'Traditional white musk oil, clean and pure.',
                'price': 45.00,
                'category': 'Perfume Oils',
                'product_type': 'perfume_oil',
                'scent_family': 'fresh',
                'scent_notes': 'White musk, clean cotton, soft powder',
                'size_options': '10ml, 20ml, 30ml',
                'stock_quantity': 60,
                'is_best_seller': True,
                'images': [
                    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400'
                ]
            },
            
            # Air Fresheners
            {
                'name': 'Lavender Fields Car Freshener',
                'description': 'Calming lavender scent for your car interior.',
                'price': 25.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'floral',
                'scent_notes': 'Pure lavender with eucalyptus undertones',
                'size_options': 'Standard',
                'stock_quantity': 100,
                'images': [
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
                ]
            },
            {
                'name': 'Ocean Mist Room Spray',
                'description': 'Fresh ocean breeze for any room in your home.',
                'price': 35.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'fresh',
                'scent_notes': 'Sea salt, marine accord, clean cotton',
                'size_options': '250ml, 500ml',
                'stock_quantity': 75,
                'is_new': True,
                'images': [
                    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
                ]
            },
            {
                'name': 'Vanilla Spice Home Diffuser',
                'description': 'Warm vanilla and spice blend for cozy atmospheres.',
                'price': 45.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'oriental',
                'scent_notes': 'Vanilla, cinnamon, warm amber',
                'size_options': '200ml with reeds',
                'stock_quantity': 40,
                'is_featured': True,
                'images': [
                    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400'
                ]
            },
            {
                'name': 'Citrus Burst Car Gel',
                'description': 'Long-lasting citrus gel freshener for vehicles.',
                'price': 20.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'citrus',
                'scent_notes': 'Lemon, orange, grapefruit zest',
                'size_options': 'Standard gel',
                'stock_quantity': 120,
                'is_best_seller': True,
                'images': [
                    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400'
                ]
            },
            {
                'name': 'Rose Garden Reed Diffuser',
                'description': 'Elegant rose scent with continuous fragrance release.',
                'price': 55.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'floral',
                'scent_notes': 'Bulgarian rose, peony, green leaves',
                'size_options': '300ml with premium reeds',
                'stock_quantity': 30,
                'images': [
                    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400'
                ]
            },
            {
                'name': 'Oud Wood Room Mist',
                'description': 'Luxurious oud scent for special occasions.',
                'price': 65.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'woody',
                'scent_notes': 'Oud wood, sandalwood, amber',
                'size_options': '250ml spray',
                'stock_quantity': 25,
                'is_limited_edition': True,
                'images': [
                    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'
                ]
            },
            {
                'name': 'Fresh Linen Fabric Spray',
                'description': 'Clean linen scent for fabrics and upholstery.',
                'price': 30.00,
                'category': 'Air Fresheners',
                'product_type': 'air_ambience',
                'scent_family': 'fresh',
                'scent_notes': 'Clean cotton, white musk, soft powder',
                'size_options': '300ml spray',
                'stock_quantity': 80,
                'images': [
                    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400'
                ]
            }
        ]
        
        for product_data in products_data:
            category = Category.objects.get(name=product_data['category'])
            images = product_data.pop('images', [])
            
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    **product_data,
                    'category': category
                }
            )
            
            if created:
                self.stdout.write(f'Created product: {product.name}')
                
                # Add product images
                for i, image_url in enumerate(images):
                    ProductImage.objects.create(
                        product=product,
                        image_url=image_url,
                        alt_text=f"{product.name} image {i+1}",
                        is_primary=(i == 0),
                        order=i
                    )

    def create_promo_codes(self):
        """Create sample promo codes"""
        now = timezone.now()
        
        promo_codes_data = [
            {
                'code': 'WELCOME10',
                'description': 'Welcome discount for new customers',
                'discount_type': 'percentage',
                'discount_value': 10.00,
                'minimum_order_amount': 50.00,
                'valid_from': now,
                'valid_until': now + timedelta(days=30),
                'usage_limit': 100
            },
            {
                'code': 'SAVE20',
                'description': '20 cedis off orders over 100',
                'discount_type': 'fixed',
                'discount_value': 20.00,
                'minimum_order_amount': 100.00,
                'valid_from': now,
                'valid_until': now + timedelta(days=60),
                'usage_limit': 50
            },
            {
                'code': 'FREESHIP',
                'description': 'Free shipping on all orders',
                'discount_type': 'fixed',
                'discount_value': 15.00,
                'minimum_order_amount': 75.00,
                'valid_from': now,
                'valid_until': now + timedelta(days=90)
            }
        ]
        
        for promo_data in promo_codes_data:
            promo_code, created = PromoCode.objects.get_or_create(
                code=promo_data['code'],
                defaults=promo_data
            )
            if created:
                self.stdout.write(f'Created promo code: {promo_code.code}')

    def create_blog_posts(self):
        """Create sample blog posts"""
        # Get or create a staff user for blog posts
        author, created = User.objects.get_or_create(
            username='blogger',
            defaults={
                'email': 'blogger@example.com',
                'first_name': 'Blog',
                'last_name': 'Author',
                'is_staff': True
            }
        )
        
        blog_posts_data = [
            {
                'title': 'The Art of Choosing the Perfect Fragrance',
                'content': '''
                Choosing the right fragrance is a personal journey that reflects your personality and style. 
                Here are some tips to help you find your signature scent:

                1. **Know Your Scent Families**: Understanding whether you prefer floral, woody, citrus, or oriental scents can guide your selection.

                2. **Test Before You Buy**: Always test a fragrance on your skin and let it develop for a few hours.

                3. **Consider the Occasion**: Different fragrances work better for different times of day and occasions.

                4. **Seasonal Considerations**: Lighter, fresher scents work well in summer, while warmer, spicier fragrances are perfect for winter.

                5. **Trust Your Instincts**: Ultimately, choose a fragrance that makes you feel confident and happy.
                ''',
                'excerpt': 'Discover the secrets to finding your perfect signature fragrance with our expert guide.',
                'featured_image_url': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
                'is_published': True,
                'published_at': timezone.now() - timedelta(days=5)
            },
            {
                'title': 'Fragrance Care: Making Your Perfume Last Longer',
                'content': '''
                Proper storage and application can significantly extend the life of your fragrances:

                **Storage Tips:**
                - Keep perfumes in a cool, dry place away from direct sunlight
                - Store bottles upright to prevent leakage
                - Avoid temperature fluctuations

                **Application Techniques:**
                - Apply to pulse points: wrists, neck, behind ears
                - Don't rub your wrists together after application
                - Layer with matching body products for longer wear

                **Maximizing Longevity:**
                - Apply to moisturized skin
                - Spray on clothes (test first for staining)
                - Use fragrance-free moisturizer as a base
                ''',
                'excerpt': 'Learn professional tips to make your favorite fragrances last longer and smell better.',
                'featured_image_url': 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800',
                'is_published': True,
                'published_at': timezone.now() - timedelta(days=10)
            },
            {
                'title': 'The History of Perfume: From Ancient Times to Modern Day',
                'content': '''
                The art of perfumery has a rich history spanning thousands of years:

                **Ancient Origins:**
                Perfume-making began in ancient Egypt, where fragrances were used in religious ceremonies and daily life.

                **Medieval Developments:**
                During the Middle Ages, perfume became popular in Europe, often used to mask unpleasant odors.

                **Renaissance Innovation:**
                The Renaissance brought new distillation techniques and the first alcohol-based perfumes.

                **Modern Era:**
                The 20th century saw the rise of synthetic ingredients, allowing for more complex and affordable fragrances.

                **Today's Trends:**
                Modern perfumery focuses on sustainability, natural ingredients, and personalized scents.
                ''',
                'excerpt': 'Explore the fascinating journey of perfume from ancient rituals to modern luxury.',
                'featured_image_url': 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800',
                'is_published': True,
                'published_at': timezone.now() - timedelta(days=15)
            }
        ]
        
        for post_data in blog_posts_data:
            blog_post, created = BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults={
                    **post_data,
                    'author': author
                }
            )
            if created:
                self.stdout.write(f'Created blog post: {blog_post.title}')