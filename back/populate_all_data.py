#!/usr/bin/env python
"""
Master script to populate ALL sample data for Kimmy's Fragrance Store

Run with: python populate_all_data.py

This script will create:
- Categories
- Products
- FAQs
- Testimonials
- Shipping Info & Return Policy
- Gift Cards
- Dupe Products
"""

import os
import sys

print("=" * 70)
print("🌸 KIMMY'S FRAGRANCE STORE - SAMPLE DATA POPULATION")
print("=" * 70)

# List of scripts to run in order
scripts = [
    'populate_sample_data.py',
    'populate_products.py',
    'populate_content.py',
    'populate_testimonials.py',
    'populate_policies.py',
    'populate_giftcards.py',
    'populate_dupes.py',
]

print("\n📋 Running population scripts...\n")

for script in scripts:
    script_path = os.path.join(os.path.dirname(__file__), script)
    if os.path.exists(script_path):
        print(f"\n{'=' * 70}")
        print(f"▶️  Running: {script}")
        print('=' * 70)
        try:
            with open(script_path, 'r', encoding='utf-8') as f:
                exec(f.read())
        except Exception as e:
            print(f"❌ Error in {script}: {e}")
            sys.exit(1)
    else:
        print(f"⚠️  Warning: {script} not found, skipping...")

print("\n" + "=" * 70)
print("✅ ALL SAMPLE DATA POPULATED SUCCESSFULLY!")
print("=" * 70)
print("\n📊 Summary:")
print("  - Categories created")
print("  - Products added")
print("  - FAQs populated")
print("  - Testimonials added")
print("  - Policies configured")
print("  - Gift cards created")
print("  - Dupe products added")
print("\n🚀 Your backend is now ready with sample data!")
print("🌐 Visit: http://localhost:8000/admin/ to manage content")
print("📖 API Docs: http://localhost:8000/api/docs/")
print("=" * 70)
