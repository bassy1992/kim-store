# 📋 Pre-Deployment Checklist

Before deploying to Vercel, make sure you've completed these steps:

## ✅ Code Quality

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms are functional
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] No console errors in browser

## ✅ Build & Test

- [ ] Run `npm run build` successfully
- [ ] Run `npm run start` and test locally
- [ ] Test all routes work
- [ ] Test API endpoints (`/api/ping`)

## ✅ Configuration

- [ ] `vercel.json` is present
- [ ] `package.json` has correct scripts
- [ ] Environment variables documented
- [ ] `.env` file is in `.gitignore`

## ✅ Content

- [ ] Update company information in pages
- [ ] Add real product images (if available)
- [ ] Update contact information
- [ ] Review all text content
- [ ] Update social media links

## ✅ SEO & Meta

- [ ] Page titles are descriptive
- [ ] Meta descriptions added (optional)
- [ ] Favicon is set
- [ ] robots.txt configured

## ✅ Git & GitHub

- [ ] Code is committed
- [ ] Pushed to GitHub repository
- [ ] Repository is public or accessible to Vercel
- [ ] `.env` files are NOT committed

## ✅ Vercel Setup

- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Environment variables ready (if using Paystack)

## 🚀 Ready to Deploy!

Once all items are checked, you're ready to deploy:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click Deploy
4. Wait for build to complete
5. Visit your live site!

## 📝 Post-Deployment

After deployment:
- [ ] Test all pages on live site
- [ ] Test API endpoints
- [ ] Check mobile responsiveness
- [ ] Test payment flow (if applicable)
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)

---

**Need help?** Check [DEPLOY_NOW.md](./DEPLOY_NOW.md) for step-by-step instructions.
