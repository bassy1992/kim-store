import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute("""
    SELECT column_name, character_maximum_length, data_type 
    FROM information_schema.columns 
    WHERE table_name='orders_order' AND column_name='phone'
""")
result = cursor.fetchone()
if result:
    print(f"Column: {result[0]}, Max Length: {result[1]}, Type: {result[2]}")
else:
    print("Column not found")
