# Image Optimization Guide for iCoderX

## Required Images for SEO

### 1. Open Graph Image
- **File**: `/public/og-image.jpg`
- **Dimensions**: 1200x630px
- **Format**: WebP (preferred) or JPG
- **Size**: < 300KB
- **Content**: iCoderX logo + tagline + automation visuals

### 2. Favicon Set
- **Files**: 
  - `/public/favicon.svg` (vector, preferred)
  - `/public/favicon.ico` (32x32px fallback)
  - `/public/favicon.ico` (legacy support)

### 3. Logo Files
- **File**: `/public/favicon.ico`
- **Dimensions**: 512x512px
- **Format**: WebP with PNG fallback
- **Background**: Transparent

### 4. Service Images
Replace placeholder images with:
- **Trading Bot Dashboard**: Screenshot of crypto trading interface
- **MMO Bot Interface**: Game automation dashboard
- **Discord Bot**: Community management interface

## Image Optimization Tips

1. **Use WebP format** for modern browsers with fallbacks
2. **Compress images** using tools like TinyPNG or Squoosh
3. **Add proper alt text** for accessibility
4. **Use lazy loading** for images below the fold
5. **Implement responsive images** with different sizes

## Implementation Example

```jsx
// Responsive image with WebP support
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.jpg" type="image/jpeg" />
  <img 
    src="/image.jpg" 
    alt="Descriptive alt text" 
    width={400} 
    height={300}
    loading="lazy"
  />
</picture>
```
