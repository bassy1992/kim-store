#!/usr/bin/env python3
"""
Railway Deployment Validation Script
Checks if the Django project is ready for Railway deployment
"""

import os
import sys
from pathlib import Path

def check_file_exists(file_path, description):
    """Check if a file exists and print status"""
    if Path(file_path).exists():
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - MISSING")
        return False

def check_requirements():
    """Check if all required packages are in requirements.txt"""
    required_packages = [
        'Django',
        'djangorestframework', 
        'gunicorn',
        'dj-database-url',
        'whitenoise',
        'psycopg2-binary',
        'django-cors-headers',
        'python-decouple'
    ]
    
    try:
        with open('requirements.txt', 'r') as f:
            content = f.read().lower()
            
        missing = []
        for package in required_packages:
            if package.lower() not in content:
                missing.append(package)
        
        if not missing:
            print("✅ All required packages in requirements.txt")
            return True
        else:
            print(f"❌ Missing packages in requirements.txt: {', '.join(missing)}")
            return False
            
    except FileNotFoundError:
        print("❌ requirements.txt not found")
        return False

def check_django_settings():
    """Check Django settings for production readiness by reading settings.py file"""
    try:
        settings_path = Path('config/settings.py')
        if not settings_path.exists():
            print("❌ Django settings.py not found")
            return False
            
        with open(settings_path, 'r') as f:
            settings_content = f.read()
        
        checks = []
        
        # Check if decouple is used for SECRET_KEY
        secret_key_configured = "config('SECRET_KEY'" in settings_content
        checks.append(("SECRET_KEY uses environment variable", secret_key_configured))
        
        # Check if ALLOWED_HOSTS includes Railway domains
        railway_hosts_configured = '.railway.app' in settings_content and '.up.railway.app' in settings_content
        checks.append(("Railway hosts in ALLOWED_HOSTS default", railway_hosts_configured))
        
        # Check if WhiteNoise is in middleware
        whitenoise_configured = 'whitenoise' in settings_content.lower()
        checks.append(("WhiteNoise middleware configured", whitenoise_configured))
        
        # Check if CORS is configured
        cors_configured = 'corsheaders' in settings_content
        checks.append(("CORS headers configured", cors_configured))
        
        # Check if DEBUG uses environment variable
        debug_configured = "config('DEBUG'" in settings_content
        checks.append(("DEBUG uses environment variable", debug_configured))
        
        # Check if database configuration supports Railway
        db_url_configured = 'dj_database_url' in settings_content and 'DATABASE_URL' in settings_content
        checks.append(("Database URL configuration for Railway", db_url_configured))
        
        for check_name, status in checks:
            if status:
                print(f"✅ {check_name}")
            else:
                print(f"❌ {check_name}")
                
        return all(status for _, status in checks)
        
    except Exception as e:
        print(f"❌ Django settings check failed: {e}")
        return False

def main():
    """Main validation function"""
    print("🚂 Railway Deployment Validation")
    print("=" * 40)
    print()
    
    # Change to back directory if we're in root
    if Path('back').exists() and not Path('manage.py').exists():
        os.chdir('back')
        print("📁 Changed to back/ directory")
        print()
    
    all_checks_passed = True
    
    # File existence checks
    files_to_check = [
        ('manage.py', 'Django manage.py'),
        ('requirements.txt', 'Requirements file'),
        ('runtime.txt', 'Python runtime specification'),
        ('../railway.json', 'Railway configuration'),
        ('../Procfile', 'Procfile'),
        ('.env.railway', 'Railway environment template'),
        ('config/settings.py', 'Django settings'),
        ('config/wsgi.py', 'WSGI configuration'),
    ]
    
    print("📋 File Checks:")
    for file_path, description in files_to_check:
        if not check_file_exists(file_path, description):
            all_checks_passed = False
    
    print()
    print("📦 Package Checks:")
    if not check_requirements():
        all_checks_passed = False
    
    print()
    print("⚙️  Django Configuration Checks:")
    if not check_django_settings():
        all_checks_passed = False
    
    print()
    print("=" * 40)
    
    if all_checks_passed:
        print("🎉 ALL CHECKS PASSED!")
        print("✅ Your project is ready for Railway deployment!")
        print()
        print("🚀 Next steps:")
        print("1. Run: deploy-railway.bat (or follow RAILWAY_DEPLOY_CHECKLIST.md)")
        print("2. Deploy to Railway")
        print("3. Update frontend with Railway backend URL")
    else:
        print("❌ SOME CHECKS FAILED!")
        print("Please fix the issues above before deploying to Railway.")
        print("See RAILWAY_DEPLOY_CHECKLIST.md for detailed instructions.")
    
    print()

if __name__ == "__main__":
    main()