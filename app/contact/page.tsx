'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BinaryRain } from "@/components/binary-rain"
import {
  MessageSquare,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom Telegram and Zalo icons as SVG components
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.256-.408-.447-.692-.554-.284-.107-.59-.107-.874 0-.284.107-.523.298-.692.554l-1.405 2.134-1.405-2.134c-.169-.256-.408-.447-.692-.554-.284-.107-.59-.107-.874 0-.284.107-.523.298-.692.554-.169.256-.169.576 0 .832l2.097 3.201v3.674c0 .332.132.65.367.884.234.235.553.367.885.367.332 0 .65-.132.885-.367.234-.235.367-.552.367-.884v-3.674l2.097-3.201c.169-.256.169-.576 0-.832z"/>
  </svg>
)

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-black/80 backdrop-blur-md" role="banner">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="iCoderX Logo - Automation Solutions"
              width={40}
              height={40}
              className="rounded-lg animate-float"
              priority
            />
            <span className="text-2xl font-bold gradient-text">iCoderX</span>
          </Link>

          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 py-20" role="main">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Liên Hệ Chuyên Gia
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none mb-6">
              <span className="gradient-text">Bắt Đầu Dự Án</span>
              <br />
              <span className="text-white">Của Bạn Ngay Hôm Nay</span>
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              Chọn phương thức liên hệ phù hợp để thảo luận về dự án tự động hóa của bạn. 
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí 24/7.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 mb-16">
            {/* Telegram */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 animate-float">
                    <TelegramIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
                  <p className="text-gray-400 mb-4">Trò chuyện trực tiếp và nhận phản hồi nhanh chóng</p>
                  <p className="text-sm text-blue-400 mb-6">Phản hồi trong vòng 5 phút</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://t.me/iCoderXvn', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Error opening Telegram:', error);
                      // Fallback: try to navigate in same window
                      window.location.href = 'https://t.me/iCoderXvn';
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                >
                  Nhắn tin Telegram
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </CardContent>
            </Card>

            {/* Facebook */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 animate-float">
                    <Facebook className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Facebook</h3>
                  <p className="text-gray-400 mb-4">Kết nối qua Messenger để tư vấn chi tiết</p>
                  <p className="text-sm text-blue-400 mb-6">Hỗ trợ đa phương tiện</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://www.facebook.com/iCoderXvn', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Error opening Facebook Messenger:', error);
                      // Fallback: try to navigate in same window
                      window.location.href = 'https://www.facebook.com/iCoderXvn';
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                >
                  Nhắn tin Facebook
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </CardContent>
            </Card>

            {/* Zalo */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 animate-float">
                    <Image
                      src="/zalo.png"
                      alt="Zalo Logo"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Zalo</h3>
                  <p className="text-gray-400 mb-4">Liên hệ qua Zalo cho khách hàng Việt Nam</p>
                  <p className="text-sm text-blue-400 mb-6">Tư vấn bằng tiếng Việt</p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        window.open('https://zalo.me/0877748888', '_blank', 'noopener,noreferrer');
                      }
                    } catch (error) {
                      console.error('Error opening Zalo:', error);
                      // Fallback: try to navigate in same window
                      window.location.href = 'https://zalo.me/0877748888';
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                >
                  Nhắn tin Zalo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          </section>

          {/* Additional Contact Info */}
          <section className="grid gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Thông Tin Liên Hệ</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <a href="mailto:admin@icoderx.vn" className="text-blue-400 hover:text-blue-300 transition-colors">
                        admin@icoderx.vn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Hotline</h4>
                      <a href="tel:+8487748888" className="text-blue-400 hover:text-blue-300 transition-colors">
                        +84 877 488 88
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Địa chỉ</h4>
                      <p className="text-gray-400">TP. Hà Nội, Việt Nam</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Giờ làm việc</h4>
                      <p className="text-gray-400">24/7 - Hỗ trợ liên tục</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="cyber-border bg-black/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Tại Sao Chọn iCoderX?</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div>
                      <h4 className="font-semibold text-white">Phản hồi nhanh</h4>
                      <p className="text-gray-400">Trả lời trong vòng 5 phút</p>
                    </div>
                    <div className="text-2xl font-bold gradient-text">⚡</div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div>
                      <h4 className="font-semibold text-white">Tư vấn miễn phí</h4>
                      <p className="text-gray-400">Đánh giá dự án không mất phí</p>
                    </div>
                    <div className="text-2xl font-bold gradient-text">💡</div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div>
                      <h4 className="font-semibold text-white">100+ Dự án</h4>
                      <p className="text-gray-400">Kinh nghiệm thực tế phong phú</p>
                    </div>
                    <div className="text-2xl font-bold gradient-text">🚀</div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div>
                      <h4 className="font-semibold text-white">Hỗ trợ 24/7</h4>
                      <p className="text-gray-400">Luôn sẵn sàng hỗ trợ bạn</p>
                    </div>
                    <div className="text-2xl font-bold gradient-text">🛡️</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
