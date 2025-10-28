# iCoderX Landing Page

🚀 **Professional automation solutions for Web, MMO, and Crypto industries**

A modern, responsive landing page built with Next.js 15, TypeScript, and Tailwind CSS, showcasing iCoderX's automation services including trading bots, MMO automation, Discord/Telegram bots, and custom software solutions.

## 🌟 Features

- **Modern Design**: Cyberpunk-inspired UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Complete meta tags, structured data, and sitemap
- **Accessibility**: ARIA labels and semantic HTML
- **TypeScript**: Full type safety throughout the codebase
- **Component Library**: Built with Radix UI and shadcn/ui components
- **Blog System**: SQLite-powered blog with topic categorization
- **Admin Dashboard**: Rich text editor with formatting toolbar
- **Security**: JWT-based authentication for admin operations
- **Content Management**: Create, edit, delete posts and topics

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind
- **Font**: System fonts with fallbacks

## 📦 Installation

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/iCoderXvn/icoderx-landing.git
   cd icoderx-landing
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm (recommended)
   pnpm install
   ```

3. **Run the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Blog System

The project includes a comprehensive blog system with:

### Features
- **SQLite Database**: Persistent storage for posts and topics
- **Topic Categories**: Organize posts with topics/categories
- **Rich Text Editor**: Format posts with markdown-style toolbar
- **Publishing Control**: Draft and published post states
- **Admin Dashboard**: Secure admin interface at `/admin`

### Admin Access
- **Default Login**: `admin` / `admin123`
- **Security**: JWT-based authentication
- **Features**: Create, edit, delete posts and topics

### Content Creation
- **Formatting Support**: Bold, italic, headings, quotes, lists
- **Media Support**: Image embedding by URL
- **Link Support**: Hyperlinks and embedded links
- **Code Support**: Inline code and code blocks

For detailed formatting instructions, see:
- [`BLOG_FORMATTING_GUIDE.md`](./BLOG_FORMATTING_GUIDE.md) - Complete formatting reference
- [`AI_ASSISTANT_GUIDE.md`](./AI_ASSISTANT_GUIDE.md) - Quick reference for AI assistants

### Security
All admin operations are secured with JWT authentication. See [`SECURITY_IMPLEMENTATION.md`](./SECURITY_IMPLEMENTATION.md) for complete security details.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder or connect your GitHub repository

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

2. **Static Export (if needed)**
   ```bash
   npm run export
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run export` - Export static files

## 📁 Project Structure

```
icoderx-landing/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Sitemap generation
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── animated-counter.tsx
│   ├── binary-rain.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── config files          # Various config files
```

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      }
    }
  }
}
```

### Content

Update the content in `app/page.tsx`:

- **Hero Section**: Modify the main heading and description
- **Services**: Update service cards with your offerings
- **Testimonials**: Replace with real client feedback
- **Contact Info**: Update social links and contact details

### Images

Replace images in the `public/` folder:

- `favicon.ico` - Your company logo
- `client.png` - Client testimonial photos
- `trading.png` - Service showcase images
- `mmo.png` - Service showcase images

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Contact form (if implemented)
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

### SEO Configuration

Update `app/layout.tsx` for SEO:

```typescript
export const metadata: Metadata = {
  title: 'Your Company Name',
  description: 'Your company description',
  // ... other metadata
}
```

## 📊 Performance

This landing page is optimized for performance:

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Minification**: Built-in with Next.js build process

## 🔒 Security

- **Content Security Policy**: Configured in `next.config.mjs`
- **Security Headers**: Added for production
- **Image Security**: Safe SVG handling
- **XSS Protection**: Built-in React protection

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: admin@icoderx.vn
- **Telegram**: [@iCoderXvn](https://t.me/iCoderXvn)
- **YouTube**: [@iCoderXvn](https://youtube.com/@iCoderX_vn)

## 🏆 Credits

Built with ❤️ by [iCoderX](https://icoderx.vn)

- **Design**: Custom cyberpunk-inspired design
- **Development**: Next.js, TypeScript, Tailwind CSS
- **Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React

---

⭐ **Star this repository if it helped you!**
