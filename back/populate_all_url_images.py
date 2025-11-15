#!/usr/bin/env python
"""
Script to populate all models with URL-based images
Run this after migrating to the new URL-based image system
"""

import os
import sys
import django
from datetime import date

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import BlogPost
from apps.content.models import (
    GalleryImage, GiftCard, DupeProduct, 
    AirAmbience, PerfumeOil
)
from django.contrib.auth.models import User

def create_sample_data():
    """Create sample data with URL-based images"""
    
    # Get or create admin user
    admin_user, _ = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'is_staff': True,
            'is_superuser': True
        }
    )
    
    # Sample image URLs from Unsplash (fragrance/beaut