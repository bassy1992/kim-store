from django.core.management.base import BaseCommand
from apps.products.models import Category, Product
from apps.orders.models import PromoCode
from apps.blog.models import BlogPost
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Check current database contents'

    def handle(self, *args, **options):
        self.stdout.write('Database Contents:')
        self.stdout.write('=' * 50)
        
        # Users
        user_count = User.objects.count()
        superuser_count = User.objects.filter(is_superuser=True).count()
        self.stdout.write(f'Users: {user_count} (Superusers: {superuser_count})')
        
        # Categories
        category_count = Category.objects.count()
        self.stdout.write(f'Categories: {category_count}')
        if category_count > 0:
            for cat in Category.objects.all():
                product_count = cat.products.count()
                self.stdout.write(f'  - {cat.name}: {product_count} products')
        
        # Products
        product_count = Product.objects.count()
        self.stdout.write(f'Total Products: {product_count}')
        
        # Promo Codes
        promo_count = PromoCode.objects.count()
        active_promo_count = PromoCode.objects.filter(is_active=True).count()
        self.stdout.write(f'Promo Codes: {promo_count} (Active: {active_promo_count})')
        
        # Blog Posts
        blog_count = BlogPost.objects.count()
        published_blog_count = BlogPost.objects.filter(is_published=True).count()
        self.stdout.write(f'Blog Posts: {blog_count} (Published: {published_blog_count})')
        
        self.stdout.write('=' * 50)
        
        if product_count == 0:
            self.stdout.write(
                self.style.WARNING('Database appears to be empty. Run "python manage.py populate_database" to add sample data.')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS('Database contains data!')
            )