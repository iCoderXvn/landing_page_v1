# 🚀 iCoderX Landing Page - Deployment Tutorial

This comprehensive tutorial will guide you through deploying your iCoderX landing page to various platforms and setting up a professional development workflow.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Deployment Options](#deployment-options)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18.17+ installed
- ✅ Git installed and configured
- ✅ GitHub account
- ✅ Code editor (VS Code recommended)
- ✅ Basic knowledge of command line

### Quick Node.js Installation Check

```bash
node --version
npm --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/).

## Local Development Setup

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/iCoderXvn/icoderx-landing.git
cd icoderx-landing

# Install dependencies (choose one)
npm install
# OR
yarn install
# OR
pnpm install  # Recommended for faster installation
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Contact form endpoint
NEXT_PUBLIC_FORM_ENDPOINT=https://your-form-endpoint.com

# Optional: Site URL
NEXT_PUBLIC_SITE_URL=https://icoderx.vn
```

### 3. Development Server

```bash
# Start development server
npm run dev

# Or with specific port
npm run dev -- --port 3001
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Test Production

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

## GitHub Repository Setup

### 1. Create New Repository

1. Go to [github.com](https://github.com) and click "New repository"
2. Name it `icoderx-landing` or your preferred name
3. Make it public (for free GitHub Pages) or private
4. Don't initialize with README (we already have one)

### 2. Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: iCoderX landing page"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/icoderx-landing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Branch Protection (Optional but Recommended)

1. Go to repository Settings → Branches
2. Add rule for `main` branch
3. Enable "Require pull request reviews before merging"

## Deployment Options

### Option 1: Vercel (Recommended) 🌟

**Why Vercel?**
- Built for Next.js
- Automatic deployments
- Global CDN
- Built-in analytics
- Zero configuration

**Steps:**

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy from command line
   vercel
   ```
   
   Or use the web interface:
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables**
   Add any environment variables in Vercel dashboard.

5. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

**Steps:**

1. **Sign up at [netlify.com](https://netlify.com)**

2. **Deploy via Git**
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository

3. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

4. **Add Build Script** (Required for static export)
   Update your `package.json`:
   ```json
   {
     "scripts": {
       "build": "next build && next export"
     }
   }
   ```

5. **Configure next.config.mjs**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   export default nextConfig
   ```

### Option 3: GitHub Pages

**Steps:**

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Create Workflow File**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v4
         
       - name: Setup Node.js
         uses: actions/setup-node@v4
         with:
           node-version: '18'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Build
         run: npm run build
         
       - name: Export
         run: npm run export
         
       - name: Deploy
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

3. **Update next.config.mjs**
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/icoderx-landing',
     assetPrefix: '/icoderx-landing/',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

### Option 4: AWS S3 + CloudFront

**Prerequisites:**
- AWS Account
- AWS CLI configured

**Steps:**

1. **Build Static Site**
   ```bash
   npm run build
   npm run export
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://icoderx-landing-bucket
   ```

3. **Upload Files**
   ```bash
   aws s3 sync out/ s3://icoderx-landing-bucket --delete
   ```

4. **Configure Bucket for Website**
   ```bash
   aws s3 website s3://icoderx-landing-bucket --index-document index.html
   ```

5. **Setup CloudFront Distribution**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

## Custom Domain Setup

### 1. Domain Registration

Register your domain at:
- **Namecheap** (recommended)
- **GoDaddy**
- **Google Domains**
- **Cloudflare Registrar**

### 2. DNS Configuration

**For Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

**For Netlify:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**For Cloudflare:**
1. Add site to Cloudflare
2. Update nameservers at registrar
3. Enable proxy for performance

### 3. SSL Certificate

Most platforms (Vercel, Netlify) provide automatic SSL certificates. For manual setups:

```bash
# Using Certbot for Let's Encrypt
sudo certbot --nginx -d icoderx.vn -d www.icoderx.vn
```

## Performance Optimization

### 1. Image Optimization

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  }
}
```

### 2. Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze bundle
ANALYZE=true npm run build
```

### 3. Performance Monitoring

Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
```

## Monitoring & Analytics

### 1. Google Analytics Setup

1. Create Google Analytics account
2. Create property for your website
3. Get tracking ID (G-XXXXXXXXXX)
4. Add to `.env.local`

### 2. Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property with your domain
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 3. Performance Monitoring

**Lighthouse CI:**
```bash
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun
```

**Web Vitals:**
```bash
npm install web-vitals

# Add to _app.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics provider
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

## Security Best Practices

### 1. Content Security Policy

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

### 2. Environment Variables

Never commit sensitive data:
```bash
# Good ✅
NEXT_PUBLIC_API_URL=https://api.example.com

# Bad ❌ (private keys should not have NEXT_PUBLIC_)
NEXT_PUBLIC_SECRET_KEY=your-secret-key
```

## Troubleshooting

### Common Issues

**1. Build Fails**
```bash
# Clear cache
rm -rf .next
npm run build
```

**2. Images Not Loading**
```javascript
// Check next.config.mjs
const nextConfig = {
  images: {
    domains: ['example.com'],
    // or for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  }
}
```

**3. 404 on Refresh (SPA routing)**
```javascript
// For static export, add to next.config.mjs
const nextConfig = {
  trailingSlash: true,
  output: 'export'
}
```

**4. Slow Performance**
```bash
# Check bundle size
npm run build-analyze

# Optimize images
npm install sharp
```

### Debug Commands

```bash
# Check build output
npm run build -- --debug

# Analyze bundle
npm run build-analyze

# Type checking
npm run type-check

# Lint check
npm run lint
```

## Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Custom domain configured with SSL
- [ ] Google Analytics/Search Console setup
- [ ] Images optimized and loading correctly
- [ ] All links working (internal and external)
- [ ] Contact forms functional
- [ ] Mobile responsiveness tested
- [ ] Performance tested (Lighthouse score 90+)
- [ ] SEO meta tags complete
- [ ] Sitemap accessible
- [ ] 404 error page configured
- [ ] Backup/version control in place

## Maintenance

### Regular Tasks

1. **Weekly:**
   - Check analytics
   - Monitor performance
   - Review error logs

2. **Monthly:**
   - Update dependencies
   - Security audit
   - Content updates

3. **Quarterly:**
   - Performance optimization
   - SEO review
   - User feedback integration

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Security audit
npm audit
npm audit fix
```

## Support

If you encounter any issues:

1. **Check the documentation** first
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Contact support**: admin@icoderx.vn

---

🎉 **Congratulations!** Your iCoderX landing page is now deployed and ready to showcase your automation services to the world!

Remember to monitor performance and keep dependencies updated for the best user experience.
