#!/usr/bin/env python
"""List all URL patterns"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.urls import get_resolver

def show_urls(urlpatterns, prefix=''):
    for pattern in urlpatterns:
        if hasattr(pattern, 'url_patterns'):
            show_urls(pattern.url_patterns, prefix + str(pattern.pattern))
        else:
            print(f"{prefix}{pattern.pattern}")

resolver = get_resolver()
print("All URL patterns:")
print("=" * 80)
show_urls(resolver.url_patterns)
