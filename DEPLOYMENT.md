# Deployment Guide

This guide explains how to deploy the shadcn-preact component registry to make it accessible via `https://shadcn.preact.regarde.dev`.

## Overview

The registry is a collection of JSON files that users can install using the shadcn CLI:

```bash
npx shadcn@latest add https://shadcn.preact.regarde.dev/button.json
```

## Prerequisites

- Vercel account (free tier works)
- Domain `regarde.dev` configured in your DNS provider
- GitHub repository with the registry files

## Deployment Steps

### 1. Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `regarde-dev/shadcn-preact`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `.` (repository root)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `registry`
   - **Install Command**: Leave empty (no dependencies needed)
5. Click "Deploy"

#### Option B: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy from the repository root
vercel --prod
```

### 3. Configure Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Add the domain: `shadcn.preact.regarde.dev`
3. Vercel will provide DNS records to add

### 4. Add DNS Records

In your DNS provider (where `regarde.dev` is hosted), add the following records:

**For Vercel:**
- **Type**: CNAME
- **Name**: `shadcn.preact`
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600 (or default)

Wait for DNS propagation (can take up to 48 hours, usually much faster).

### 5. Verify Deployment

Once deployed and DNS is configured, test the registry:

```bash
# Test a single component
curl https://shadcn.preact.regarde.dev/button.json

# Install a component
npx shadcn@latest add https://shadcn.preact.regarde.dev/button.json
```

## How It Works

### Static File Serving

When you deploy to Vercel:

1. Vercel serves the `registry/` directory as static files
2. No build process needed - JSON files are committed to the repository
3. The `vercel.json` configuration adds CORS headers and URL rewrites

### CORS Configuration

The `vercel.json` file includes CORS headers to allow the shadcn CLI to fetch registry files:

```json
{
  "headers": [
    {
      "source": "/registry/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" },
        { "key": "Content-Type", "value": "application/json" }
      ]
    }
  ]
}
```

### URL Rewrites

The `vercel.json` also includes rewrites to make URLs cleaner:

```json
{
  "rewrites": [
    {
      "source": "/(.*).json",
      "destination": "/registry/$1.json"
    }
  ]
}
```

This allows both URLs to work:
- `https://shadcn.preact.regarde.dev/button.json`
- `https://shadcn.preact.regarde.dev/registry/button.json`

## Updating Components

When you update components in `apps/v4/src/components/ui/`:

1. **Manually update the corresponding JSON file** in `registry/`:
   - Edit `registry/button.json` if you changed `apps/v4/src/components/ui/button.tsx`
   - Update the `content` field with the new component source code
   - Update `dependencies` or `registryDependencies` if needed

2. **Commit and push changes**:
   ```bash
   git add registry/button.json
   git commit -m "Update button component"
   git push
   ```

3. **Vercel auto-deploys** (if connected to GitHub)
   - Vercel automatically redeploys on every push to `main`
   - Changes are live immediately (no build process)

## Alternative: GitHub Pages

If you prefer not to use Vercel, you can use GitHub Pages:

### Setup GitHub Pages

1. Ensure the `registry/` directory is committed:
   ```bash
   git add registry/
   git commit -m "Add registry files"
   git push
   ```

2. Enable GitHub Pages:
   - Go to repository **Settings** → **Pages**
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

3. Configure custom domain:
   - Add `shadcn.preact.regarde.dev` in the custom domain field
   - Add DNS CNAME record pointing to `regarde-dev.github.io`

4. Users install with:
   ```bash
   npx shadcn@latest add https://shadcn.preact.regarde.dev/registry/button.json
   ```

**Note**: GitHub Pages requires the `/registry/` path in the URL.

## Alternative: GitHub Raw URLs (No Deployment)

For immediate testing without deployment:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/regarde-dev/shadcn-preact/main/registry/button.json
```

**Pros:**
- Works immediately
- No deployment needed
- Free

**Cons:**
- Long URLs
- Not as professional
- No custom domain

## Troubleshooting

### DNS Not Resolving

```bash
# Check DNS propagation
dig shadcn.preact.regarde.dev

# Or use online tools
# https://dnschecker.org
```

### CORS Errors

Make sure `vercel.json` includes the CORS headers. Redeploy if needed:

```bash
vercel --prod --force
```

### Registry Files Not Found

Ensure the `registry/` directory is committed to your repository:

```bash
git add registry/
git commit -m "Add registry files"
git push
```

Then redeploy on Vercel.

### Component Not Installing

Test the JSON file directly:

```bash
curl https://shadcn.preact.regarde.dev/button.json
```

Should return valid JSON with component metadata and source code.

## Summary

**Recommended Setup:**
1. ✅ Deploy to Vercel (free tier)
2. ✅ Configure custom domain: `shadcn.preact.regarde.dev`
3. ✅ Auto-deploy on push to `main`
4. ✅ Users install with: `npx shadcn@latest add https://shadcn.preact.regarde.dev/button.json`

**Maintenance:**
- Update component source in `apps/v4/src/components/ui/`
- Manually update corresponding JSON file in `registry/`
- Commit and push both files
- Vercel auto-deploys (no build process needed)

