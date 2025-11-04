#!/usr/bin/env python
"""
Test admin login and check superuser
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

print("=" * 50)
print("ADMIN LOGIN DIAGNOSTIC")
print("=" * 50)

# Check superusers
superusers = User.objects.filter(is_superuser=True)
print(f"\n✅ Superusers found: {superusers.count()}")

for user in superusers:
    print(f"\n👤 Username: {user.username}")
    print(f"   Email: {user.email}")
    print(f"   Is Active: {user.is_active}")
    print(f"   Is Staff: {user.is_staff}")
    print(f"   Is Superuser: {user.is_superuser}")
    print(f"   Last Login: {user.last_login}")
    print(f"   Date Joined: {user.date_joined}")

# Check settings
from django.conf import settings
print("\n" + "=" * 50)
print("SETTINGS CHECK")
print("=" * 50)
print(f"DEBUG: {settings.DEBUG}")
print(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
print(f"CSRF_TRUSTED_ORIGINS: {settings.CSRF_TRUSTED_ORIGINS}")
print(f"SESSION_COOKIE_SECURE: {getattr(settings, 'SESSION_COOKIE_SECURE', False)}")
print(f"CSRF_COOKIE_SECURE: {getattr(settings, 'CSRF_COOKIE_SECURE', False)}")

print("\n" + "=" * 50)
print("ADMIN URL")
print("=" * 50)
print("Admin URL: https://kim-store-production.up.railway.app/admin/")
print(f"Username: {superusers.first().username if superusers.exists() else 'No superuser found'}")
print("=" * 50)
