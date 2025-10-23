# Next Steps - Deployment Instructions

## What Was Done

✅ Removed over-engineered custom CLI package  
✅ Created simple Vercel deployment configuration  
✅ Updated all documentation to use URL-based installation  
✅ Simplified to match components.build approach  

## What You Need to Do

### 1. Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `regarde-dev/shadcn-preact`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `.` (repository root)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `registry`
   - **Install Command**: Leave empty (no dependencies needed)
5. Click **"Deploy"**

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from repository root
cd /Users/clem/Projects/regarde/shadcn-preact
vercel --prod
```

### 2. Configure Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Add the domain: `shadcn.preact.regarde.dev`
3. Vercel will show you the DNS records to add

### 3. Update DNS Records

In your DNS provider (where `regarde.dev` is hosted):

**Add a CNAME record:**
- **Type**: CNAME
- **Name**: `shadcn.preact` (or `shadcn.preact.regarde.dev` depending on your DNS provider)
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600 (or default)

**Save and wait for DNS propagation** (usually 5-30 minutes, can take up to 48 hours).

### 4. Verify Deployment

Once DNS propagates, test the registry:

```bash
# Test the JSON file
curl https://shadcn.preact.regarde.dev/button.json

# Install a component
npx shadcn@latest add https://shadcn.preact.regarde.dev/button.json
```

## How Users Will Install Components

```bash
# Single component
npx shadcn@latest add https://shadcn.preact.regarde.dev/button.json

# Multiple components (via script)
#!/bin/bash
BASE_URL="https://shadcn.preact.regarde.dev"
for component in button dialog select; do
  npx shadcn@latest add "$BASE_URL/$component.json"
done
```

## Updating Components

When you update components in `apps/v4/src/components/ui/`:

1. **Update the component source code** in `apps/v4/src/components/ui/button.tsx`

2. **Manually update the registry JSON** in `registry/button.json`:
   - Update the `content` field with the new component source code
   - Update `dependencies` or `registryDependencies` if needed

3. **Commit and push both files**:
   ```bash
   git add apps/v4/src/components/ui/button.tsx registry/button.json
   git commit -m "Update button component"
   git push
   ```

4. **Vercel auto-deploys** (if connected to GitHub)
   - Vercel automatically redeploys on every push to `main`
   - No build process needed!

## Files Created/Modified

### Created:
- ✅ `vercel.json` - Vercel deployment config with CORS headers
- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `NEXT_STEPS.md` - This file (quick reference)

### Modified:
- ✅ `README.md` - Updated to show URL-based installation
- ✅ `apps/v4/README.md` - Updated installation instructions
- ✅ `pnpm-workspace.yaml` - Removed packages/* workspace

### Removed:
- ✅ `packages/cli/` - Custom CLI (over-engineered)
- ✅ `IMPLEMENTATION_SUMMARY.md` - Outdated summary
- ✅ `PUBLISHING.md` - Outdated publishing guide

## Registry Files

The `registry/` directory contains 31 JSON files:

**UI Components (20):**
- alert.json, avatar.json, badge.json, button.json, card.json
- dialog.json, dropdown-menu.json, input.json, label.json, modal.json
- portal.json, select.json, skeleton.json, spinner.json, table.json
- textarea.json, theme.json, toggle.json, tooltip.json

**Utilities (11):**
- cn.json, slot.json, use-composed-refs.json, use-controllable-state.json
- use-escape-keydown.json, use-focus-outside.json, use-id.json
- use-outside-click.json, use-portal.json, use-previous.json, use-toggle.json

## Troubleshooting

### DNS Not Resolving

Check DNS propagation:
```bash
dig shadcn.preact.regarde.dev
```

Or use: https://dnschecker.org

### CORS Errors

Redeploy to ensure `vercel.json` is applied:
```bash
vercel --prod --force
```

### Component Not Installing

Test the JSON file:
```bash
curl https://shadcn.preact.regarde.dev/button.json
```

Should return valid JSON with component metadata.

## Summary

**You only need to:**
1. Deploy to Vercel (5 minutes)
2. Add DNS CNAME record (5 minutes)
3. Wait for DNS propagation (5-30 minutes)
4. Test installation (1 minute)

**Total time: ~15-40 minutes**

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

