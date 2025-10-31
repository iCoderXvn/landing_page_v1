"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-500/20 bg-black/95 backdrop-blur-md absolute top-16 left-0 right-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4" role="navigation">
            <Link 
              href="/" 
              className="text-blue-400 font-semibold py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang Chủ
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Về Chúng Tôi
            </Link>
            <Link 
              href="/services" 
              className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dịch Vụ
            </Link>
            <Link 
              href="/docs" 
              className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tài Liệu
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-blue-400 py-2 px-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên Hệ
            </Link>
            <Link 
              href="/contact" 
              className="cyber-button text-black font-semibold px-6 py-2 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Báo Giá Miễn Phí
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
