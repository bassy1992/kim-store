import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute("""
    SELECT column_name, character_maximum_length, data_type 
    FROM information_schema.columns 
    WHERE table_name='orders_order' 
    ORDER BY column_name
""")
results = cursor.fetchall()
print("\norders_order table columns:")
for row in results:
    if row[1]:  # Only show varchar fields with length
        print(f"  {row[0]:<30} max_length={row[1]:<5} type={row[2]}")
