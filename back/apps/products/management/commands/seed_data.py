from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.products.models import Category, Product
from apps.blog.models import BlogPost
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Seed database with sample data for e-commerce platform'
    
    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')
        
        # Create categories
        self.stdout.write('Creating categories...')
        categories_data = [
            {'name': 'Floral', 'description': 'Floral fragrances with notes of rose, jasmine, and lily'},
            {'name': 'Woody', 'description': 'Woody fragrances with notes of sandalwood, cedar, and oud'},
            {'name': 'Citrus', 'description': 'Fresh citrus fragrances with notes of lemon, bergamot, and orange'},
            {'name': 'Oriental', 'description': 'Exotic oriental fragrances with notes of amber, vanilla, and spices'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'  Created category: {category.name}')
        
        # Create products
        self.stdout.write('Creating products...')
        products_data = [
            {
                'name': 'Eau de Rose',
                'description': 'A refined composition blending floral and woody accords with excellent longevity. Top notes: bergamot, neroli. Heart: rose, jasmine. Base: amber, oud.',
                'price': 89.00,
                'category': 'Floral',
                'stock_quantity': 50,
                'is_best_seller': True,
            },
            {
                'name': 'Citrus Noir',
                'description': 'Fresh and invigorating citrus blend perfect for daily wear. Features bright lemon and bergamot with a subtle woody base.',
                'price': 79.00,
                'category': 'Citrus',
                'stock_quantity': 45,
            },
            {
                'name': 'Amber Oud',
                'description': 'Luxurious oriental fragrance with rich amber and precious oud wood. Deep, warm, and long-lasting.',
                'price': 120.00,
                'category': 'Oriental',
                'stock_quantity': 30,
                'is_new': True,
            },
            {
                'name': 'Vanilla Bloom',
                'description': 'Sweet and comforting vanilla fragrance with floral undertones. Perfect for evening wear.',
                'price': 95.00,
                'category': 'Floral',
                'stock_quantity': 40,
            },
            {
                'name': 'Midnight Musk',
                'description': 'Mysterious and sensual musk fragrance with woody base notes. Ideal for special occasions.',
                'price': 105.00,
                'category': 'Woody',
                'stock_quantity': 35,
            },
            {
                'name': 'Ocean Breeze',
                'description': 'Light and refreshing aquatic fragrance reminiscent of sea air. Perfect for summer.',
                'price': 85.00,
                'category': 'Citrus',
                'stock_quantity': 55,
            },
            {
                'name': 'Sandalwood Dream',
                'description': 'Creamy sandalwood fragrance with hints of cedar and vetiver. Warm and sophisticated.',
                'price': 110.00,
                'category': 'Woody',
                'stock_quantity': 25,
                'is_new': True,
            },
            {
                'name': 'Jasmine Nights',
                'description': 'Elegant jasmine fragrance with subtle spice notes. Romantic and timeless.',
                'price': 92.00,
                'category': 'Floral',
                'stock_quantity': 42,
            },
        ]
        
        for prod_data in products_data:
            category = categories[prod_data.pop('category')]
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                defaults={**prod_data, 'category': category}
            )
            if created:
                self.stdout.write(f'  Created product: {product.name}')
        
        # Create blog posts
        self.stdout.write('Creating blog posts...')
        
        # Get or create author
        author, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@example.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        
        blog_posts_data = [
            {
                'title': 'The Art of Choosing Your Signature Scent',
                'content': 'Finding your perfect fragrance is a personal journey. Consider your personality, lifestyle, and the occasions you\'ll wear it. Test fragrances on your skin, as they react differently with each person\'s chemistry. Take your time and don\'t rush the decision.',
                'excerpt': 'Discover how to find the perfect fragrance that matches your personality and style.',
                'is_published': True,
                'published_at': datetime.now() - timedelta(days=7),
            },
            {
                'title': 'Understanding Fragrance Notes',
                'content': 'Fragrances are composed of three layers: top notes (first impression), heart notes (main character), and base notes (lasting impression). Understanding these layers helps you appreciate the complexity of fine perfumes and make better choices.',
                'excerpt': 'Learn about the three layers of fragrance composition and how they work together.',
                'is_published': True,
                'published_at': datetime.now() - timedelta(days=14),
            },
            {
                'title': 'How to Make Your Perfume Last Longer',
                'content': 'Apply fragrance to pulse points where blood vessels are closest to the skin. Moisturize before applying perfume, as it adheres better to hydrated skin. Store your fragrances in cool, dark places away from direct sunlight.',
                'excerpt': 'Expert tips for maximizing the longevity of your favorite fragrances.',
                'is_published': True,
                'published_at': datetime.now() - timedelta(days=21),
            },
        ]
        
        for post_data in blog_posts_data:
            blog_post, created = BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults={**post_data, 'author': author}
            )
            if created:
                self.stdout.write(f'  Created blog post: {blog_post.title}')
        
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
