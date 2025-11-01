from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.db.models import Avg
from apps.products.models import Category, Product
from .models import Review


class ReviewModelTest(TestCase):
    """Test Review model"""
    
    def setUp(self):
        self.category = Category.objects.create(name='Test')
        self.product = Product.objects.create(
            name='Test Product',
            description='Test',
            price=50.00,
            category=self.category
        )
    
    def test_review_creation(self):
        """Test creating a review"""
        review = Review.objects.create(
            product=self.product,
            reviewer_name='Test User',
            rating=5,
            comment='Great product!'
        )
        self.assertEqual(review.rating, 5)
        self.assertEqual(review.reviewer_name, 'Test User')
    
    def test_rating_validation(self):
        """Test rating must be between 1 and 5"""
        # This will be caught by model validators
        review = Review(
            product=self.product,
            reviewer_name='Test User',
            rating=6,  # Invalid
            comment='Test'
        )
        with self.assertRaises(Exception):
            review.full_clean()


class ReviewAPITest(APITestCase):
    """Test Review API endpoints"""
    
    def setUp(self):
        self.category = Category.objects.create(name='Test')
        self.product = Product.objects.create(
            name='Test Product',
            description='Test',
            price=50.00,
            category=self.category
        )
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@test.com',
            password='admin123'
        )
    
    def test_create_review(self):
        """Test creating a review"""
        data = {
            'reviewer_name': 'Test User',
            'rating': 5,
            'comment': 'Excellent product!'
        }
        response = self.client.post(f'/api/products/{self.product.id}/reviews/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['rating'], 5)
        
        # Verify review was created
        self.assertEqual(Review.objects.count(), 1)
    
    def test_create_review_invalid_rating(self):
        """Test creating review with invalid rating"""
        data = {
            'reviewer_name': 'Test User',
            'rating': 6,  # Invalid
            'comment': 'Test'
        }
        response = self.client.post(f'/api/products/{self.product.id}/reviews/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_list_product_reviews(self):
        """Test listing reviews for a product"""
        Review.objects.create(
            product=self.product,
            reviewer_name='User 1',
            rating=5,
            comment='Great!'
        )
        Review.objects.create(
            product=self.product,
            reviewer_name='User 2',
            rating=4,
            comment='Good'
        )
        
        response = self.client.get(f'/api/products/{self.product.id}/reviews/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Response might be paginated or a list
        if isinstance(response.data, dict) and 'results' in response.data:
            self.assertEqual(len(response.data['results']), 2)
        else:
            self.assertEqual(len(response.data), 2)
    
    def test_delete_review_requires_admin(self):
        """Test deleting a review requires admin permissions"""
        review = Review.objects.create(
            product=self.product,
            reviewer_name='Test User',
            rating=5,
            comment='Test'
        )
        
        response = self.client.delete(f'/api/reviews/{review.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_delete_review_as_admin(self):
        """Test deleting a review as admin"""
        review = Review.objects.create(
            product=self.product,
            reviewer_name='Test User',
            rating=5,
            comment='Test'
        )
        
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(f'/api/reviews/{review.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Review.objects.filter(id=review.id).exists())
    
    def test_average_rating_calculation(self):
        """Test average rating calculation"""
        Review.objects.create(
            product=self.product,
            reviewer_name='User 1',
            rating=5,
            comment='Excellent'
        )
        Review.objects.create(
            product=self.product,
            reviewer_name='User 2',
            rating=3,
            comment='Average'
        )
        
        avg_rating = self.product.reviews.aggregate(Avg('rating'))['rating__avg']
        self.assertEqual(avg_rating, 4.0)
        
        # Test in product detail endpoint
        response = self.client.get(f'/api/products/{self.product.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['average_rating'], 4.0)
