import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "./mobile-menu"

interface HeaderProps {
  siteName: string;
}

export function Header({ siteName }: HeaderProps) {

  return (
    <header className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-black/90 backdrop-blur-md" role="banner">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/favicon.ico"
            alt={`${siteName} Logo - Automation Solutions`}
            width={40}
            height={40}
            className="rounded-lg animate-float"
            priority
          />
          <span className="text-2xl font-bold gradient-text">{siteName}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" role="navigation" aria-label="Main navigation">
          <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Đi đến trang chủ">
            Trang Chủ
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Về chúng tôi">
            Về Chúng Tôi
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Xem dịch vụ của chúng tôi">
            Dịch Vụ
          </Link>
          <Link href="/docs" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Tài liệu hướng dẫn">
            Tài Liệu
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Đọc blog và tin tức">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Liên hệ với chúng tôi">
            Liên Hệ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:inline-flex cyber-button text-black font-semibold px-6 items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10" aria-label="Nhận báo giá miễn phí cho dự án tự động hóa">
            Báo Giá Miễn Phí
          </Link>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
