release: cd back && python manage.py migrate && python manage.py collectstatic --noinput
web: cd back && gunicorn config.wsgi --bind 0.0.0.0:$PORT
