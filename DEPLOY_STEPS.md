# 🚀 Quick Deployment Steps

## Step-by-Step Visual Guide

### 1️⃣ Push to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/kimmys-fragrance.git
git push -u origin main
```

### 2️⃣ Import to Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository: `kimmys-fragrance`
4. Click **"Import"**

### 3️⃣ Configure Project Settings

```
┌─────────────────────────────────────────┐
│  Configure Project                      │
├─────────────────────────────────────────┤
│                                         │
│  Framework Preset:  [Vite ▼]           │
│                                         │
│  Root Directory:    [front]  ← IMPORTANT│
│                     [Edit]              │
│                                         │
│  Build Command:     npm run build:client│
│                                         │
│  Output Directory:  dist/spa            │
│                                         │
│  Install Command:   npm install         │
│                                         │
└─────────────────────────────────────────┘
```

**⚠️ CRITICAL:** Make sure Root Directory is set to `front`!

### 4️⃣ Add Environment Variables

Click **"Environment Variables"** and add:

```
┌─────────────────────────────────────────┐
│  Environment Variables                  │
├─────────────────────────────────────────┤
│                                         │
│  Key:    VITE_API_URL                   │
│  Value:  https://your-backend-url.com   │
│  Env:    [✓] Production                 │
│          [✓] Preview                    │
│          [✓] Development                │
│                                         │
│  [Add]                                  │
└─────────────────────────────────────────┘
```

### 5️⃣ Deploy

Click the big **"Deploy"** button!

```
┌─────────────────────────────────────────┐
│                                         │
│         [Deploy] ← Click here           │
│                                         │
└─────────────────────────────────────────┘
```

### 6️⃣ Wait for Build

You'll see:
```
Building...
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%

✓ Build completed
✓ Deployment ready
```

### 7️⃣ Success! 🎉

Your site is live at:
```
https://kimmys-fragrance.vercel.app
```

---

## 🔧 If Build Fails

### Check Root Directory

1. Go to **Settings** → **General**
2. Find **Root Directory**
3. Click **Edit**
4. Enter: `front`
5. Click **Save**
6. Go to **Deployments**
7. Click **⋯** → **Redeploy**

### Test Locally First

```bash
cd front
npm install
npm run build:client
```

If this works locally, it should work on Vercel!

---

## 📱 Mobile Responsive Check

After deployment, test on:
- 📱 Your phone
- 💻 Tablet
- 🖥️ Desktop

Use Chrome DevTools:
```
Press F12 → Click device icon → Select device
```

---

## 🎯 Next Steps

1. ✅ Deploy frontend to Vercel
2. ⬜ Deploy Django backend to Railway
3. ⬜ Connect frontend to backend
4. ⬜ Test all features
5. ⬜ Add custom domain (optional)

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 on routes | Check `vercel.json` has rewrites |
| Build fails | Set Root Directory to `front` |
| API not working | Check CORS in Django backend |
| Images not loading | Check image URLs are absolute |
| Blank page | Check browser console for errors |

---

**Need more help?** Check `VERCEL_FIX.md` for detailed troubleshooting!
