# 🚂 Railway Quick Start - Deploy Django in 5 Minutes

## Why Railway?

Your Vercel backend is crashing because Django + Vercel serverless = problems.

**Railway is built for Django.** It just works. ✅

---

## 🚀 Deploy Now (5 Minutes)

### 1. Go to Railway

**Open:** https://railway.app

Click **"Start a New Project"**

### 2. Sign In with GitHub

Click **"Login with GitHub"**

Authorize Railway to access your repositories

### 3. Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Select your repository
3. Railway will detect Django automatically ✅

### 4. Add PostgreSQL Database

1. Click **"New"** in your project
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Done! Railway connects it automatically

### 5. Configure Environment Variables

Click on your **Django service** → **"Variables"** tab

Add these variables:

```
SECRET_KEY=django-insecure-please-change-this-to-random-string-12345
DEBUG=False
ALLOWED_HOSTS=*.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
```

**Note:** `DATABASE_URL` is automatically set by Railway when you add PostgreSQL!

### 6. Generate Domain

1. Click on your Django service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. Click **"Generate Domain"**
5. Copy your URL (e.g., `https://your-app.railway.app`)

### 7. Wait for Deployment

Railway will automatically:
- ✅ Install dependencies
- ✅ Run migrations
- ✅ Collect static files
- ✅ Start your Django app

Wait 2-3 minutes. Watch the logs in the **"Deployments"** tab.

### 8. Update Vercel Frontend

1. Go to: **https://vercel.com/dashboard**
2. Click on your **kinf** project
3. **Settings** → **Environment Variables**
4. Update `VITE_API_URL`:
   - **Value:** `https://your-app.railway.app/api` (use your Railway URL)
5. **Deployments** tab → Click **"Redeploy"**

### 9. Test Your Site

1. Wait 1-2 minutes for Vercel redeployment
2. Open: **https://kinf.vercel.app**
3. Open browser console (F12)
4. Check Network tab
5. Should see requests to Railway URL
6. No CORS errors!
7. Products should load!

**🎉 Done! Your site is live!**

---

## 🔍 Verify It's Working

### Test Backend Directly

Open your Railway URL in browser:
```
https://your-app.railway.app/api/products/
```

Should see JSON data (or Django REST Framework browsable API)

### Test Frontend

Open: **https://kinf.vercel.app**

Should see:
- ✅ Products loading
- ✅ No CORS errors in console
- ✅ Images displaying
- ✅ Navigation working

---

## 📋 Checklist

- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] PostgreSQL database added
- [ ] Environment variables set
- [ ] Domain generated
- [ ] Deployment successful (check logs)
- [ ] Backend URL copied
- [ ] Vercel environment variable updated
- [ ] Frontend redeployed
- [ ] Site tested and working

---

## 🐛 Troubleshooting

### Deployment Failed?

**Check the logs:**
1. Click on your Django service
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Read the logs

**Common issues:**
- Missing dependencies → Check `requirements.txt`
- Migration errors → Check database connection
- Static files errors → Usually auto-fixed by Railway

### Backend Returns 500 Error?

**Check environment variables:**
- Make sure all variables are set
- Check `ALLOWED_HOSTS` includes `*.railway.app`
- Verify `DATABASE_URL` is present (auto-set by Railway)

**Check logs:**
1. Click on your Django service
2. Go to **"Logs"** tab (not Deployments)
3. Look for Python errors

### Frontend Still Shows CORS Error?

**Check:**
1. Railway backend is deployed and accessible
2. `CORS_ALLOWED_ORIGINS` includes `https://kinf.vercel.app`
3. Vercel `VITE_API_URL` is set correctly
4. Frontend has been redeployed after updating env var

---

## 💰 Pricing

**Railway Free Tier:**
- $5 free credit per month
- Enough for development and testing
- No credit card required to start

**For production:**
- Pay as you go
- ~$5-10/month for small apps
- Much cheaper than managing your own server

---

## 🎯 Why Railway > Vercel for Django

| Feature | Railway | Vercel |
|---------|---------|--------|
| Django Support | ✅ Native | ⚠️ Serverless (complex) |
| Setup | 5 minutes | 30+ minutes |
| Database | ✅ Free PostgreSQL | ❌ Need external |
| Migrations | ✅ Automatic | ❌ Manual |
| Static Files | ✅ Built-in | ⚠️ Need CDN |
| Cold Starts | ✅ None | ❌ 5-10 seconds |
| Logs | ✅ Real-time | ⚠️ Limited |

---

## 📚 Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Django on Railway:** https://docs.railway.app/guides/django

---

## 🎉 Success!

Once deployed, you'll have:

- ✅ Frontend: `https://kinf.vercel.app`
- ✅ Backend: `https://your-app.railway.app`
- ✅ Database: PostgreSQL on Railway
- ✅ Auto-deployments: On every Git push
- ✅ SSL: Automatic HTTPS
- ✅ Logs: Real-time monitoring

---

## 💡 Pro Tips

1. **Auto-deployments:** Railway auto-deploys on Git push
2. **Environment variables:** Can be different per environment
3. **Logs:** Check logs tab for debugging
4. **Metrics:** Monitor CPU, memory, network usage
5. **Rollback:** Easy to rollback to previous deployment

---

**Ready? Go to https://railway.app and deploy!** 🚀
