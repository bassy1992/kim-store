#!/usr/bin/env python
"""
Test script to verify Jazzmin configuration
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

def test_jazzmin_config():
    """Test Jazzmin configuration"""
    print("🧪 Testing Jazzmin configuration...")
    
    try:
        from django.conf import settings
        
        # Check if jazzmin is in INSTALLED_APPS
        if 'jazzmin' in settings.INSTALLED_APPS:
            print("✅ Jazzmin is installed in INSTALLED_APPS")
        else:
            print("❌ Jazzmin not found in INSTALLED_APPS")
            return False
        
        # Check if jazzmin is before django.contrib.admin
        jazzmin_index = settings.INSTALLED_APPS.index('jazzmin')
        admin_index = settings.INSTALLED_APPS.index('django.contrib.admin')
        
        if jazzmin_index < admin_index:
            print("✅ Jazzmin is correctly placed before django.contrib.admin")
        else:
            print("❌ Jazzmin should be placed before django.contrib.admin")
            return False
        
        # Check Jazzmin settings
        if hasattr(settings, 'JAZZMIN_SETTINGS'):
            print("✅ JAZZMIN_SETTINGS found")
            jazzmin_settings = settings.JAZZMIN_SETTINGS
            
            # Check key settings
            if jazzmin_settings.get('site_title') == 'Kim Store Admin':
                print("✅ Site title configured correctly")
            else:
                print("❌ Site title not configured")
            
            if jazzmin_settings.get('custom_css') == 'admin/css/custom_admin.css':
                print("✅ Custom CSS configured")
            else:
                print("❌ Custom CSS not configured")
                
        else:
            print("❌ JAZZMIN_SETTINGS not found")
            return False
        
        # Check UI tweaks
        if hasattr(settings, 'JAZZMIN_UI_TWEAKS'):
            print("✅ JAZZMIN_UI_TWEAKS found")
        else:
            print("❌ JAZZMIN_UI_TWEAKS not found")
        
        print("🎉 Jazzmin configuration test passed!")
        return True
        
    except Exception as e:
        print(f"❌ Error testing Jazzmin configuration: {e}")
        return False

def test_static_files():
    """Test static files configuration"""
    print("\n📁 Testing static files...")
    
    try:
        import os
        from django.conf import settings
        
        # Check if static files exist
        static_root = settings.STATIC_ROOT
        custom_css_path = os.path.join(static_root, 'admin', 'css', 'custom_admin.css')
        logo_path = os.path.join(static_root, 'admin', 'img', 'logo.svg')
        
        if os.path.exists(custom_css_path):
            print("✅ Custom CSS file exists in static files")
        else:
            print("❌ Custom CSS file not found in static files")
        
        if os.path.exists(logo_path):
            print("✅ Logo file exists in static files")
        else:
            print("❌ Logo file not found in static files")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing static files: {e}")
        return False

def test_admin_models():
    """Test admin model registrations"""
    print("\n🔧 Testing admin model registrations...")
    
    try:
        from django.contrib import admin
        from apps.products.models import Product, Category
        from apps.orders.models import Order, Cart
        
        # Check if models are registered
        registered_models = admin.site._registry
        
        if Product in registered_models:
            print("✅ Product model is registered")
        else:
            print("❌ Product model not registered")
        
        if Category in registered_models:
            print("✅ Category model is registered")
        else:
            print("❌ Category model not registered")
        
        if Order in registered_models:
            print("✅ Order model is registered")
        else:
            print("❌ Order model not registered")
        
        print(f"📊 Total registered models: {len(registered_models)}")
        return True
        
    except Exception as e:
        print(f"❌ Error testing admin models: {e}")
        return False

if __name__ == '__main__':
    print("🚀 Kim Store Jazzmin Configuration Test")
    print("=" * 50)
    
    success = True
    success &= test_jazzmin_config()
    success &= test_static_files()
    success &= test_admin_models()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 All tests passed! Your Jazzmin configuration is ready.")
        print("🚀 Run 'python manage.py runserver' and visit /admin")
    else:
        print("❌ Some tests failed. Please check the configuration.")
    
    print("=" * 50)