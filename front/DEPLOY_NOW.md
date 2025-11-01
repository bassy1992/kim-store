# 🚀 Quick Deploy to Vercel

## Option 1: Deploy via Web (Easiest - 5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Ready for Vercel"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Vercel will auto-detect settings ✅
5. Click **"Deploy"**
6. Done! 🎉

Your site will be live at: `https://your-project.vercel.app`

---

## Option 2: Deploy via CLI (For developers)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy
```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## ⚙️ Environment Variables (Important!)

If you're using Paystack payments, add these in Vercel:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - `PAYSTACK_SECRET_KEY` = your_secret_key_here
   - `PING_MESSAGE` = "pong" (optional)

---

## 🔧 What's Already Configured

✅ Build command: `npm run build`  
✅ Output directory: `dist/spa`  
✅ Framework: Vite (auto-detected)  
✅ API routes: `/api/*` → serverless functions  
✅ SPA routing: All routes work correctly  

---

## 📱 After Deployment

### Test Your Site
- Homepage: `https://your-site.vercel.app/`
- Shop: `https://your-site.vercel.app/shop`
- API: `https://your-site.vercel.app/api/ping`

### Add Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `kimmysfragrance.com`)
3. Follow DNS instructions
4. Done! 🌐

---

## 🐛 Troubleshooting

### Build Failed?
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### API Not Working?
- Check environment variables are set
- View function logs in Vercel dashboard
- Test locally: `npm run dev`

### 404 on Routes?
- Should work automatically with `vercel.json`
- If not, check the rewrite rules

---

## 🎯 Quick Commands

```bash
# Build locally to test
npm run build

# Start production server locally
npm run start

# Deploy to Vercel
vercel --prod

# View deployment logs
vercel logs
```

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## 🎉 You're All Set!

Your modern fragrance e-commerce site is ready to go live. Just follow the steps above and you'll be deployed in minutes!

Need help? Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for more detailed instructions.
