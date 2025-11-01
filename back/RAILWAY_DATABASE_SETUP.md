# Railway PostgreSQL Database Setup

## Database Credentials Added ✅

Your Railway PostgreSQL database has been configured in `back/.env`:

```
DATABASE_URL=postgresql://postgres:EFqoUKhYKCeEcdSlhiWcUtfpZFZiUcYp@shinkansen.proxy.rlwy.net:39218/railway
```

## Next Steps

### 1. Set Environment Variable on Railway

In your Railway project dashboard:
1. Go to your Django service
2. Click on "Variables" tab
3. Add this variable:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:EFqoUKhYKCeEcdSlhiWcUtfpZFZiUcYp@shinkansen.proxy.rlwy.net:39218/railway`

### 2. Run Database Migrations

After deploying, you need to run migrations. SSH into your Railway service or use Railway CLI:

```bash
# Using Railway CLI
railway run python manage.py migrate

# Or add to your Procfile (already configured)
```

### 3. Create Superuser (Optional)

To access Django admin:

```bash
railway run python manage.py createsuperuser
```

Or use the `set_admin_password.py` script:

```bash
railway run python set_admin_password.py
```

### 4. Test Local Connection (Optional)

To test the Railway database locally:

```bash
cd back
python manage.py migrate
python manage.py runserver
```

## Database Information

- **Host**: shinkansen.proxy.rlwy.net
- **Port**: 39218
- **Database**: railway
- **User**: postgres
- **Password**: EFqoUKhYKCeEcdSlhiWcUtfpZFZiUcYp

## Important Notes

⚠️ **Security**: Never commit the `.env` file with real credentials to Git. It's already in `.gitignore`.

✅ **Auto-Configuration**: Your Django settings (`config/settings.py`) already support `DATABASE_URL` via `dj-database-url`.

✅ **Dependencies**: All required packages (`psycopg2-binary`, `dj-database-url`) are in `requirements.txt`.

## Troubleshooting

If you encounter connection issues:

1. Verify the `DATABASE_URL` is set in Railway environment variables
2. Check that your Railway service has redeployed after adding the variable
3. Ensure migrations have run: `railway run python manage.py migrate`
4. Check Railway logs for any database connection errors
