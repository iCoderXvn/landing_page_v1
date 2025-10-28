# SEO Metadata Fix - Default Description & Keywords

## Problem
The Default Meta Description and Default Keywords from the admin settings panel were not being applied to all pages. Instead, the system was using the short `siteDescription` tagline.

## Root Cause
In `lib/metadata.ts`, the description priority was incorrect:
```typescript
// BEFORE (WRONG)
description: settings.siteDescription || settings.defaultMetaDescription,
```

This meant the short tagline ("Xây dựng tương lai với tự động hóa. Từng bot một.") was always used instead of the comprehensive SEO description.

## Solution
Fixed the priority in `lib/metadata.ts` to use `defaultMetaDescription` first:
```typescript
// AFTER (CORRECT)
description: settings.defaultMetaDescription || settings.siteDescription,
```

## Files Changed
1. **lib/metadata.ts**
   - Line 13: Main description field
   - Line 48: OpenGraph description
   - Line 59: Twitter description
   - Line 82: Structured data description
   
2. **app/about/page.tsx**
   - Changed from static metadata to dynamic `generateMetadata()` function
   - Now uses `settings.defaultMetaDescription` and `settings.defaultKeywords`

## What Now Works
✅ Homepage uses default SEO description and keywords from admin panel
✅ About page uses default SEO description and keywords from admin panel
✅ All other pages inherit default metadata from layout
✅ OpenGraph and Twitter cards use the full SEO description
✅ JSON-LD structured data uses the full SEO description

## How to Update SEO Settings
1. Go to https://icoderx.vn/admin/settings
2. Navigate to the "SEO" tab
3. Update "Default Meta Description" and "Default Keywords"
4. Save changes
5. Wait 1 minute for cache to clear (or restart the server)
6. Refresh your pages - new metadata will appear

## Notes
- Settings are cached for 1 minute for performance
- Use `clearSettingsCache()` to force immediate refresh during development
- Keywords are automatically applied to all pages
- Individual blog posts can override these defaults with their own meta descriptions and keywords
