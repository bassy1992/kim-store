# Deployment Guide

## Deploy to Vercel

### Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Vercel CLI installed (optional): `npm i -g vercel`

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the framework settings

3. **Configure Environment Variables** (if needed)
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add any required variables (e.g., `PAYSTACK_SECRET_KEY`, `PING_MESSAGE`)

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes!

### Method 2: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   For production:
   ```bash
   vercel --prod
   ```

### Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Framework**: Vite
- **Node Version**: 20.x

### Environment Variables

Make sure to set these in Vercel dashboard if you're using Paystack:
- `PAYSTACK_SECRET_KEY` - Your Paystack secret key
- `PING_MESSAGE` - Custom ping message (optional)

### Post-Deployment

After deployment:
1. Test all pages and functionality
2. Verify API routes are working (`/api/ping`, `/api/paystack/initialize`)
3. Set up a custom domain (optional)
4. Enable automatic deployments from GitHub

### Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Verify Node version compatibility
- Check build logs in Vercel dashboard

**API routes not working?**
- Ensure environment variables are set
- Check function logs in Vercel dashboard
- Verify the `api/index.js` file exists

**404 errors on routes?**
- The `vercel.json` handles SPA routing automatically
- Make sure the rewrite rules are in place

### Alternative: Deploy to Netlify

If you prefer Netlify, the project already has `netlify.toml` configured:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Performance Tips

1. **Enable Vercel Analytics** - Track performance metrics
2. **Use Edge Functions** - For faster API responses
3. **Enable Caching** - Configure cache headers for static assets
4. **Optimize Images** - Use Vercel Image Optimization

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
