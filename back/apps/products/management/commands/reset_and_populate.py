from django.core.management.base import BaseCommand
from django.core.management import call_command
from apps.products.models import Category, Product, ProductImage
from apps.orders.models import PromoCode, Cart, CartItem, Order, OrderItem
from apps.blog.models import BlogPost
from apps.customers.models import CustomerProfile
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Reset database and populate with fresh sample data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Confirm that you want to delete all data',
        )

    def handle(self, *args, **options):
        if not options['confirm']:
            self.stdout.write(
                self.style.WARNING(
                    'This will delete ALL existing data. '
                    'Use --confirm flag if you are sure.'
                )
            )
            return

        self.stdout.write('Resetting database...')
        
        # Delete all data (except superusers)
        self.delete_data()
        
        # Populate with fresh data
        self.stdout.write('Populating with fresh data...')
        call_command('populate_database')
        
        self.stdout.write(
            self.style.SUCCESS('Database reset and populated successfully!')
        )

    def delete_data(self):
        """Delete all data except superusers"""
        # Delete in correct order to avoid foreign key constraints
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        CartItem.objects.all().delete()
        Cart.objects.all().delete()
        PromoCode.objects.all().delete()
        
        ProductImage.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        
        BlogPost.objects.all().delete()
        
        # Delete regular users but keep superusers
        User.objects.filter(is_superuser=False).delete()
        
        self.stdout.write('Existing data cleared.')