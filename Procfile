web: cd back && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py createsuperuser --noinput || true && gunicorn config.wsgi --bind 0.0.0.0:$PORT
