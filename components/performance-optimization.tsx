'use client'

import { useEffect } from 'react'

// Performance monitoring and optimization hooks
export function usePerformanceOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/inter.woff2'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Preload critical images
      const heroImageLink = document.createElement('link')
      heroImageLink.rel = 'preload'
      heroImageLink.href = '/og-image.webp'
      heroImageLink.as = 'image'
      document.head.appendChild(heroImageLink)
    }

    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          console.log('CLS:', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      }
    }

    preloadResources()
    observeWebVitals()
  }, [])
}

// Lazy loading component for better performance
export function LazyImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  ...props 
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  [key: string]: any
}) {
  useEffect(() => {
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach((img) => imageObserver.observe(img))

    return () => {
      lazyImages.forEach((img) => imageObserver.unobserve(img))
    }
  }, [])

  return (
    <img
      data-src={src}
      alt={alt}
      className={`lazy ${className || ''}`}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  )
}
