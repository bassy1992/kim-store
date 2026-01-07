# Railway Deployment Checklist

## Pre-Deployment (Local)

### Code & Dependencies
- [ ] All code changes committed to git
- [ ] `requirements.txt` updated with all dependencies
- [ ] No syntax errors in Python files
- [ ] No missing imports
- [ ] `.gitignore` includes sensitive files

### Configuration Files
- [ ] `Procfile` exists and is correct
- [ ] `nixpacks.toml` exists and is correct
- [ ] `runtime.txt` specifies Python 3.11.7
- [ ] `back/config/settings.py` has Railway support

### Database
- [ ] Migrations created: `python back/manage.py makemigrations`
- [ ] Migrations tested locally: `python back/manage.py migrate`
- [ ] No migration errors

### Static Files
- [ ] Static files collected: `python back/manage.py collectstatic --noinput`
- [ ] No collection errors
- [ ] WhiteNoise middleware installed

### Testing
- [ ] API endpoints tested locally
- [ ] Admin interface works
- [ ] No 500 errors in logs
- [ ] CORS working correctly

## Railway Setup

### Project & Service
- [ ] Railway project created
- [ ] Backend service created
- [ ] Service connected to git repository
- [ ] Auto-deploy enabled (optional)

### Environment Variables
- [ ] `SECRET_KEY` set
- [ ] `DEBUG` set to `False`
- [ ] `DATABASE_URL` set (if using Railway database)
- [ ] `USE_S3` set to `true` (if using S3)
- [ ] `AWS_ACCESS_KEY_ID` set
- [ ] `AWS_SECRET_ACCESS_KEY` set
- [ ] `AWS_STORAGE_BUCKET_NAME` set
- [ ] `AWS_S3_ENDPOINT_URL` set
- [ ] `AWS_S3_REGION_NAME` set (optional)
- [ ] `CORS_ALLOWED_ORIGINS` set (if needed)
- [ ] `CSRF_TRUSTED_ORIGINS` set (if needed)

### Database
- [ ] PostgreSQL plugin added (if using Railway database)
- [ ] Database created and running
- [ ] Connection string verified

### S3 Bucket (if using)
- [ ] Bucket created
- [ ] Access credentials generated
- [ ] Bucket endpoint URL obtained
- [ ] Bucket permissions set to public-read

## Deployment

### Deploy Code
- [ ] Latest code pushed to git
- [ ] Railway auto-deploy triggered (or manual deploy)
- [ ] Deployment started
- [ ] No build errors in logs

### Post-Deployment Tasks
- [ ] Check deployment logs: `railway logs`
- [ ] Verify service is running
- [ ] Run migrations: `railway run python back/manage.py migrate`
- [ ] Create superuser: `railway run python back/manage.py createsuperuser`
- [ ] Collect static files: `railway run python back/manage.py collectstatic --noinput`

## Testing (Production)

### API Endpoints
- [ ] Test products list: `GET /api/products/`
- [ ] Test product detail: `GET /api/products/{slug}/`
- [ ] Test categories: `GET /api/categories/`
- [ ] Test admin login: `POST /api/auth/login/`

### Admin Interface
- [ ] Access admin: `https://your-app.up.railway.app/admin`
- [ ] Login works
- [ ] Can view products
- [ ] Can add/edit products

### Media Upload (if using S3)
- [ ] Upload image in admin
- [ ] Image appears in S3 bucket
- [ ] Image URL is correct
- [ ] Image displays on frontend

### Static Files
- [ ] CSS loads correctly
- [ ] JavaScript loads correctly
- [ ] Images load correctly
- [ ] No 404 errors for static files

### Database
- [ ] Can query products
- [ ] Can query categories
- [ ] Can query orders
- [ ] No database connection errors

### CORS
- [ ] Frontend can access API
- [ ] No CORS errors in browser console
- [ ] Credentials sent correctly
- [ ] Preflight requests working

## Monitoring

### Logs
- [ ] Check logs regularly: `railway logs`
- [ ] No error messages
- [ ] No warning messages
- [ ] Response times acceptable

### Performance
- [ ] API response time < 500ms
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Memory usage reasonable

### Security
- [ ] DEBUG is False
- [ ] SECRET_KEY is strong
- [ ] HTTPS is enforced
- [ ] CSRF protection enabled
- [ ] No sensitive data in logs

## Troubleshooting

### If Deployment Fails
- [ ] Check build logs: `railway logs`
- [ ] Verify Procfile syntax
- [ ] Check Python version compatibility
- [ ] Verify all dependencies in requirements.txt
- [ ] Check for syntax errors in code

### If API Returns 500 Error
- [ ] Check logs: `railway logs`
- [ ] Verify database connection
- [ ] Check migrations ran successfully
- [ ] Verify environment variables set
- [ ] Check for missing imports

### If Images Not Uploading
- [ ] Verify USE_S3=true
- [ ] Check AWS credentials
- [ ] Verify bucket endpoint URL
- [ ] Check bucket permissions
- [ ] Check S3 logs for errors

### If Static Files Not Loading
- [ ] Run collectstatic: `railway run python back/manage.py collectstatic --noinput`
- [ ] Check STATIC_URL and STATIC_ROOT
- [ ] Verify WhiteNoise middleware
- [ ] Check file permissions

### If Database Connection Fails
- [ ] Verify DATABASE_URL is set
- [ ] Check database is running
- [ ] Run migrations: `railway run python back/manage.py migrate`
- [ ] Check database credentials

## Rollback Plan

If something goes wrong:

```bash
# View previous deployments
railway deployments

# Rollback to previous version
railway rollback <deployment-id>

# Or redeploy from git
git revert <commit-hash>
git push
```

## Maintenance

### Regular Tasks
- [ ] Monitor logs daily
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Update dependencies monthly
- [ ] Backup database regularly

### Security Updates
- [ ] Update Django regularly
- [ ] Update dependencies for security patches
- [ ] Rotate SECRET_KEY periodically
- [ ] Rotate AWS credentials periodically
- [ ] Review access logs

### Performance Optimization
- [ ] Add database indexes
- [ ] Optimize queries
- [ ] Cache frequently accessed data
- [ ] Compress static files
- [ ] Use CDN for static files

## Documentation

- [ ] README updated with deployment instructions
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide created
- [ ] Team trained on deployment process

## Sign-Off

- [ ] All checklist items completed
- [ ] Tested in production
- [ ] No critical issues
- [ ] Ready for users
- [ ] Team notified

---

## Quick Commands Reference

```bash
# View logs
railway logs

# View variables
railway variables

# Run migrations
railway run python back/manage.py migrate

# Create superuser
railway run python back/manage.py createsuperuser

# Collect static files
railway run python back/manage.py collectstatic --noinput

# Restart service
railway restart

# SSH into container
railway shell

# View deployments
railway deployments

# Rollback
railway rollback <deployment-id>
```

## Support

- Railway Docs: https://docs.railway.app
- Django Docs: https://docs.djangoproject.com
- GitHub Issues: Check your repository
- Email Support: support@railway.app

---

**Last Updated:** January 7, 2026
**Status:** Ready for Deployment ✅
