# ⚡ Quick Deploy to Vercel

## 🚀 Deploy in 3 Steps

### Step 1: Push to Git
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your repository
4. **⚠️ Set Root Directory to: `front`**
5. Click **"Deploy"**

### Step 3: Add Environment Variable
After deployment:
1. Go to **Project Settings → Environment Variables**
2. Add:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.railway.app/api`
3. Click **"Save"** and redeploy

---

## ✅ That's it!

Your site will be live at: `https://your-project.vercel.app`

---

## 🔧 Alternative: Use CLI

```bash
cd front
npm install -g vercel
vercel login
vercel --prod
```

Or run the helper script:
```bash
deploy-vercel.bat
```

---

## 📋 After Deployment

- [ ] Test your live site
- [ ] Update Django CORS settings with Vercel URL
- [ ] Add custom domain (optional)
- [ ] Enable Vercel Analytics

---

**Need help?** See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.
