# How to Test layout.tsx SEO Configuration

## Quick Test (Local Development)

### 1. Start Dev Server
```bash
pnpm run dev
```

### 2. Open Browser and Check
Visit: http://localhost:3000

#### View Page Source
- Right-click anywhere on page → **View Page Source** (Ctrl+U)
- Search for these elements:

**Title Tag:**
```html
<title>iCoderX - Lập Trình Bot | Code Bot Theo Yêu Cầu | Viết Bot Web Tự Động | Tool MMO</title>
```

**Meta Description:**
```html
<meta name="description" content="Chuyên lập trình bot, code bot theo yêu cầu..."/>
```

**Open Graph Tags:**
```html
<meta property="og:title" content="iCoderX - Lập Trình Bot..."/>
<meta property="og:url" content="https://icoderx.vn"/>
<meta property="og:description" content="..."/>
```

**Structured Data (JSON-LD):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "iCoderX - Lập Trình Bot...",
  "url": "https://icoderx.vn",
  ...
}
</script>
```

### 3. Browser DevTools
- Press **F12** to open DevTools
- Go to **Elements** tab
- Expand `<head>` section
- Check all `<meta>` tags are populated with database values

## Test SEO Changes

### Change Settings in Admin Panel
1. Go to http://localhost:3000/admin
2. Login with your credentials
3. Go to **Settings** → **SEO** tab
4. Change any value (e.g., Site Name, Description)
5. Click **Save Changes**
6. **Restart the dev server** (or rebuild for production)
7. Refresh browser and view source again - values should be updated

## Production Testing

### After Deployment
Use these free SEO testing tools:

1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Enter your URL to test structured data

2. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

3. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Test Twitter card metadata

4. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/
   - Test LinkedIn sharing preview

## Verify Database Values

Run this command to see current settings:
```bash
node scripts/test-seo.js
```

This will show all SEO settings currently in the database.

## Common Issues

### Metadata Not Updating
- **Solution**: Restart the dev server (`pnpm run dev`)
- Next.js caches metadata, restart is needed after DB changes

### Empty Metadata
- **Solution**: Check database has values using `node scripts/test-seo.js`
- If empty, go to admin panel and fill in the settings

### Structured Data Not Showing
- **Solution**: Check browser console for JavaScript errors
- View page source to confirm the `<script type="application/ld+json">` exists

## Screenshot Locations to Check

1. **Browser Tab** - Title should show site name from DB
2. **Search Results** - Meta description appears in Google
3. **Social Media Shares** - Open Graph image and description
4. **WhatsApp/Telegram Links** - Rich preview with site info
