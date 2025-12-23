# GitHub Pages Deployment Guide

This guide will walk you through deploying your portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project ready to deploy

## Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project directory
cd /Users/stephenhowe/Repos/figma-portfolio

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Repository name: `figma-portfolio` (or your preferred name)
5. Set it to **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (you already have files)
7. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/figma-portfolio.git

# Rename your branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Step 4: Update GitHub Actions Workflow (if needed)

If your repository name is **NOT** `figma-portfolio`, you need to update the workflow file:

1. Open `.github/workflows/deploy.yml`
2. Find the line: `run: npm run build -- --base /figma-portfolio/`
3. Replace `/figma-portfolio/` with `/[YOUR_REPO_NAME]/`

**Note:** The base path in `vite.config.ts` can stay as `"/"` for local development. The GitHub Actions workflow will override it during deployment.

## Step 5: Create GitHub Actions Workflow

Create the following file to enable automatic deployment:

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          BASE_URL: /figma-portfolio/

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Note:** Replace `/figma-portfolio/` with your repository name if different.

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

## Step 7: Push Your Changes

```bash
# Add all files (including the new workflow and .gitignore)
git add .

# Commit the changes
git commit -m "Add GitHub Pages deployment workflow"

# Push to GitHub
git push
```

## Step 8: Monitor Deployment

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. You should see a workflow run called "Deploy to GitHub Pages"
4. Wait for it to complete (usually 2-3 minutes)
5. Once complete, your site will be live at:
   `https://YOUR_USERNAME.github.io/figma-portfolio/`

## Step 9: Verify Configuration

The GitHub Actions workflow automatically sets the correct base path during deployment. Your `vite.config.ts` can remain as `base = "/"` for local development.

**If you need to change the repository name:**

- Update `.github/workflows/deploy.yml` line with `--base /[YOUR_REPO_NAME]/`

## Future Updates

Every time you push to the `main` branch, GitHub Actions will automatically:

1. Build your project
2. Deploy it to GitHub Pages
3. Your site will update within a few minutes

## Troubleshooting

### Site shows 404 or blank page

- Check that `vite.config.ts` has the correct base path matching your repository name
- Verify that `App.tsx` uses `basename={import.meta.env.BASE_URL}` in BrowserRouter
- Check the Actions tab for build errors

### Assets not loading

- Ensure all asset paths start with `/` (absolute paths)
- Check that files are in the `public/` folder
- Verify the base path in `vite.config.ts` matches your repository name

### Build fails

- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Try running `npm run build` locally to catch errors

## Local Development vs Production

- **Local Development:** Use `base = "/"` in `vite.config.ts`
- **Production:** Use `base = "/figma-portfolio/"` (or your repo name) in `vite.config.ts`

You can use environment variables to switch automatically, or manually change before deploying.

## Your Site URL

Once deployed, your portfolio will be available at:

```
https://YOUR_USERNAME.github.io/figma-portfolio/
```

Replace `YOUR_USERNAME` with your GitHub username and `figma-portfolio` with your repository name.
