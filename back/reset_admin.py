#!/usr/bin/env python
"""
Reset admin user with known password
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

# Delete existing user and create fresh
try:
    user = User.objects.get(username='kim')
    user.delete()
    print("Deleted existing user 'kim'")
except User.DoesNotExist:
    print("User 'kim' doesn't exist")

# Create new superuser with known password
user = User.objects.create_superuser(
    username='admin',
    email='wwyarquah@gmail.com',
    password='Admin@123'  # Change this to your preferred password
)

print("\n" + "=" * 50)
print("✅ NEW SUPERUSER CREATED")
print("=" * 50)
print(f"Username: admin")
print(f"Password: Admin@123")
print(f"Email: {user.email}")
print(f"Is Active: {user.is_active}")
print(f"Is Staff: {user.is_staff}")
print(f"Is Superuser: {user.is_superuser}")
print("=" * 50)
print("\nLogin at: https://kim-store-production.up.railway.app/admin/")
print("=" * 50)
