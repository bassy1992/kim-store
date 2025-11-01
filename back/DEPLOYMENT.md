# Deployment Guide

## Quick Start with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Build and start services
docker-compose up --build

# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser

# Load seed data
docker-compose exec web python manage.py seed_data
```

The API will be available at `http://localhost:8000/`

## Manual Deployment

### 1. Prepare Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create `.env` file with production settings:

```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
USE_POSTGRES=True
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### 3. Database Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load initial data (optional)
python manage.py seed_data
```

### 4. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 5. Run with Gunicorn

```bash
gunicorn --bind 0.0.0.0:8000 --workers 3 config.wsgi:application
```

## Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up PostgreSQL database
- [ ] Configure CORS for your frontend domain
- [ ] Set up HTTPS/SSL
- [ ] Configure media file storage (AWS S3, etc.)
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Enable database connection pooling
- [ ] Configure caching (Redis/Memcached)

## Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /path/to/staticfiles/;
    }

    location /media/ {
        alias /path/to/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Environment-Specific Settings

### Development
- SQLite database
- DEBUG=True
- Local file storage

### Staging
- PostgreSQL database
- DEBUG=False
- Cloud storage (optional)
- Similar to production

### Production
- PostgreSQL with replication
- DEBUG=False
- Cloud storage (AWS S3, etc.)
- CDN for static files
- Load balancing
- Monitoring and logging

## Monitoring

Consider setting up:
- Sentry for error tracking
- New Relic or DataDog for performance monitoring
- CloudWatch or similar for logs
- Uptime monitoring (Pingdom, UptimeRobot)

## Backup Strategy

1. **Database Backups**
   - Daily automated backups
   - Retention policy (30 days)
   - Test restore procedures

2. **Media Files**
   - Sync to cloud storage
   - Versioning enabled

3. **Code**
   - Version control (Git)
   - Tagged releases

## Scaling Considerations

- Use database connection pooling
- Implement caching (Redis)
- Use CDN for static/media files
- Horizontal scaling with load balancer
- Separate read replicas for database
- Queue system for background tasks (Celery)
