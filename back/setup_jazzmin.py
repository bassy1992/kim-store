#!/usr/bin/env python
"""
Setup script for Jazzmin admin customization
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()
    
    print("🎨 Setting up Jazzmin admin customization...")
    
    # Collect static files
    print("📁 Collecting static files...")
    execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
    
    # Create superuser if needed
    from django.contrib.auth.models import User
    if not User.objects.filter(is_superuser=True).exists():
        print("👤 Creating superuser...")
        User.objects.create_superuser(
            username='admin',
            email='admin@kimstore.com',
            password='admin123'
        )
        print("✅ Superuser created: admin / admin123")
    else:
        print("👤 Superuser already exists")
    
    print("🎉 Jazzmin setup complete!")
    print("🚀 Run 'python manage.py runserver' and visit /admin to see your customized admin panel")