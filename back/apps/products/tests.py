from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Category, Product, ProductImage


class ProductModelTest(TestCase):
    """Test Product model"""
    
    def setUp(self):
        self.category = Category.objects.create(name='Test Category')
    
    def test_product_creation(self):
        """Test creating a product"""
        product = Product.objects.create(
            name='Test Product',
            description='Test description',
            price=99.99,
            category=self.category,
            stock_quantity=10
        )
        self.assertEqual(product.name, 'Test Product')
        self.assertEqual(product.slug, 'test-product')
        self.assertEqual(product.price, 99.99)
    
    def test_product_slug_generation(self):
        """Test automatic slug generation"""
        product = Product.objects.create(
            name='My Awesome Product',
            description='Test',
            price=50.00,
            category=self.category
        )
        self.assertEqual(product.slug, 'my-awesome-product')


class ProductAPITest(APITestCase):
    """Test Product API endpoints"""
    
    def setUp(self):
        self.category = Category.objects.create(name='Floral')
        self.product1 = Product.objects.create(
            name='Rose Perfume',
            description='Beautiful rose scent',
            price=89.00,
            category=self.category,
            stock_quantity=50,
            is_featured=True
        )
        self.product2 = Product.objects.create(
            name='Jasmine Perfume',
            description='Elegant jasmine scent',
            price=95.00,
            category=self.category,
            stock_quantity=30
        )
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@test.com',
            password='admin123'
        )
    
    def test_list_products(self):
        """Test listing products"""
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
    
    def test_retrieve_product(self):
        """Test retrieving a single product"""
        response = self.client.get(f'/api/products/{self.product1.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Rose Perfume')
    
    def test_filter_by_category(self):
        """Test filtering products by category"""
        response = self.client.get(f'/api/products/?category={self.category.slug}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
    
    def test_filter_by_price_range(self):
        """Test filtering products by price range"""
        response = self.client.get('/api/products/?min_price=90&max_price=100')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_filter_featured(self):
        """Test filtering featured products"""
        response = self.client.get('/api/products/?featured=true')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_search_products(self):
        """Test searching products"""
        response = self.client.get('/api/products/?search=rose')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_pagination(self):
        """Test product pagination"""
        # Create more products
        for i in range(25):
            Product.objects.create(
                name=f'Product {i}',
                description='Test',
                price=50.00,
                category=self.category,
                stock_quantity=10
            )
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 20)  # Default page size
        self.assertIsNotNone(response.data['next'])
    
    def test_create_product_requires_admin(self):
        """Test that creating a product requires admin permissions"""
        data = {
            'name': 'New Product',
            'description': 'Test',
            'price': 100.00,
            'category': self.category.id,
            'stock_quantity': 10
        }
        response = self.client.post('/api/products/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_create_product_as_admin(self):
        """Test creating a product as admin"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'New Product',
            'description': 'Test description',
            'price': 100.00,
            'category': self.category.id,
            'stock_quantity': 10
        }
        response = self.client.post('/api/products/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
