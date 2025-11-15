#!/bin/bash
set -e

echo "🚀 Starting Django application..."

# Run migrations
echo "📦 Running migrations..."
python manage.py migrate --noinput

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Populate database if empty (optional)
echo "🌱 Checking database..."
python manage.py check_database || echo "Database check failed, continuing..."

# Start gunicorn
echo "🌐 Starting Gunicorn server..."
exec gunicorn config.wsgi --bind 0.0.0.0:$PORT