# Railway Root Directory Configuration

## The Issue
Your Django app is in the `back/` subdirectory, but Railway is looking at the root.

## Solution: Set Root Directory in Railway Dashboard

### Step 1: Go to Railway Service Settings
1. Open your Railway project
2. Click on your service
3. Go to **Settings** tab
4. Scroll to **Root Directory**

### Step 2: Set Root Directory
- Set **Root Directory** to: `back`
- Click **Save**

### Step 3: Redeploy
Railway will now:
- Look for `requirements.txt` in `back/`
- Look for `runtime.txt` in `back/`
- Auto-detect Django app
- Install dependencies
- Run your start command from the `back/` directory

## Alternative: Keep Current Setup

If you prefer to keep root-level files, the current setup should work:
- ✅ `requirements.txt` copied to root
- ✅ `runtime.txt` copied to root  
- ✅ `railway.json` configured with `cd back` in start command
- ✅ `Procfile` configured with `cd back`

Railway will detect Python from root files, then change to `back/` directory to run Django.

## Recommended Approach

**Use the Root Directory setting** - it's cleaner and Railway will handle everything correctly.

1. In Railway Dashboard → Settings → Root Directory → `back`
2. Remove root-level `requirements.txt` and `runtime.txt` (optional)
3. Update `railway.json` start command to remove `cd back`

This way Railway treats `back/` as the project root.
