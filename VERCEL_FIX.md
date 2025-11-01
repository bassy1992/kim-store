# 🔧 Vercel Deployment Fix

## Error: "Could not read package.json"

This error occurs when Vercel is looking in the wrong directory.

## ✅ Solution

### Option 1: Set Root Directory in Vercel Dashboard (Recommended)

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **General**
3. Scroll to **Root Directory**
4. Click **Edit**
5. Enter: `front`
6. Click **Save**
7. Go to **Deployments** → Click **Redeploy**

### Option 2: Deploy from Front Directory

Instead of deploying the entire project, deploy only the `front` folder:

1. **Create a new repository with only the front folder:**
   ```bash
   cd front
   git init
   git add .
   git commit -m "Frontend only"
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```

2. **Import this new repository to Vercel**
   - The `package.json` will be in the root
   - Vercel will auto-detect Vite
   - No need to set Root Directory

### Option 3: Use Vercel CLI from Front Directory

```bash
cd front
vercel login
vercel
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (or Y if you want to link)
- Project name? `kimmys-fragrance`
- Directory? `./` (you're already in front)
- Override settings? **N**

Then deploy to production:
```bash
vercel --prod
```

## 📝 Correct Configuration

Your `front/vercel.json` should have:
```json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/spa",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

## 🎯 Quick Fix Steps

1. **Delete the current Vercel project** (if it exists)
2. **In Vercel Dashboard:**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - **IMPORTANT:** Set Root Directory to `front`
   - Click Deploy

## ✅ Verification

After deployment, check:
- [ ] Build completes successfully
- [ ] Site loads at your Vercel URL
- [ ] No 404 errors
- [ ] Assets load correctly

## 🆘 Still Having Issues?

### Check Build Logs
Look for these in Vercel deployment logs:
```
✓ Building...
✓ Compiled successfully
✓ Collecting page data
```

### Common Issues

**Issue:** "Module not found"
**Fix:** Make sure all dependencies are in `package.json`

**Issue:** "Build failed"
**Fix:** Test build locally first:
```bash
cd front
npm install
npm run build:client
```

**Issue:** "404 on routes"
**Fix:** The `vercel.json` in root handles this with rewrites

## 📞 Need Help?

1. Check Vercel deployment logs
2. Test build locally first
3. Verify `front/package.json` exists
4. Ensure Root Directory is set to `front`

---

**TL;DR:** Set Root Directory to `front` in Vercel Dashboard settings!
