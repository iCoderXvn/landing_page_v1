import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BinaryRain } from "@/components/binary-rain"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Bot,
  Gamepad2,
  MessageSquare,
  TrendingUp,
  Settings,
  Building,
  Star,
  ArrowRight,
  Mail,
  Copy,
  Zap,
  Shield,
  Cpu,
  Target,
  Users,
  Award,
  Facebook,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSiteSettings } from "@/lib/settings"
import { MobileMenu } from "@/components/mobile-menu"

// Custom X (Twitter) and Telegram icons as SVG components
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default async function HomePage() {
  // Fetch settings directly from database on server
  const settings = await getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-black/90 backdrop-blur-md" role="banner">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#home" className="flex items-center space-x-3">
            <Image
              src="/favicon.ico"
              alt={`${settings.siteName} Logo - Automation Solutions`}
              width={40}
              height={40}
              className="rounded-lg animate-float"
              priority
            />
            <span className="text-2xl font-bold gradient-text">{settings.siteName}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" role="navigation" aria-label="Main navigation">
            <Link href="#home" className="text-blue-400 font-semibold" aria-label="Đi đến trang chủ">
              Trang Chủ
            </Link>
            <Link href="#services" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Xem dịch vụ của chúng tôi">
              Dịch Vụ
            </Link>
            <Link href="#solutions" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Khám phá giải pháp tự động hóa">
              Giải Pháp
            </Link>
            <Link href="#clients" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Đọc phản hồi khách hàng">
              Khách Hàng
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Đọc blog và tin tức">
              Blog
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Liên hệ với chúng tôi">
              Liên Hệ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex cyber-button text-black font-semibold px-6 items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10" aria-label="Nhận báo giá miễn phí cho dự án tự động hóa">Báo Giá Miễn Phí</Link>
            
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 pt-16" role="main">
        {/* Hero Section */}
        <section id="home" className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-6xl mx-auto">
              <div className="space-y-6 animate-slide-in-up">
                <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2" role="img" aria-label="Giải pháp tự động hóa thế hệ mới">
                  <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                  Giải Pháp Tự Động Hóa Thế Hệ Mới
                </Badge>
                <h1 id="hero-heading" className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                  <span className="gradient-text">Tự Động Hóa Mọi Thứ.</span>
                  <br />
                  <span className="text-white">Mở Rộng Nhanh Hơn.</span>
                </h1>
                <p className="max-w-[700px] text-gray-300 text-lg md:text-xl leading-relaxed">
                  Chúng tôi xây dựng bot, công cụ và phần mềm tự động hóa cho các ngành Web, MMO và Crypto. Chuyển đổi
                  doanh nghiệp của bạn với công nghệ tự động hóa tiên tiến.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up">
                <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12" aria-label="Bắt đầu dự án tự động hóa ngay hôm nay">
                  Khởi Động Dự Án
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent h-12 border-2 rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Xem portfolio và công việc đã thực hiện trên YouTube"
                >
                  Xem Công Việc
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl" role="region" aria-label="Thống kê thành tích của iCoderX">
                <div className="text-center space-y-2">
                  <AnimatedCounter end={100} suffix="+" />
                  <p className="text-gray-400 text-sm">Dự Án Tự Động Hóa</p>
                </div>
                <div className="text-center space-y-2">
                  <AnimatedCounter end={50} suffix="+" />
                  <p className="text-gray-400 text-sm">Bot Giao Dịch Đã Xây Dựng</p>
                </div>
                <div className="text-center space-y-2">
                  <AnimatedCounter end={99} suffix="%" />
                  <p className="text-gray-400 text-sm">Hài Lòng Khách Hàng</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-20 md:py-32 relative" aria-labelledby="services-heading">
          <div className="container mx-auto px-4 md:px-6">
            <header className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
                Chuyên Môn Của Chúng Tôi
              </Badge>
              <h2 id="services-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">Giải Pháp Tự Động Hóa</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl">
                Từ bot tùy chỉnh đến tự động hóa doanh nghiệp, chúng tôi cung cấp các giải pháp tiên tiến
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2" role="list">
              <article className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm" role="listitem">
                <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 animate-float" aria-label="Biểu tượng bot tự động hóa">
                    <Bot className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Phần Mềm Tự Động Hóa Tùy Chỉnh</h3>
                  <p className="text-gray-400">
                    Giải pháp tự động hóa được thiết kế riêng cho web scraping, xử lý dữ liệu và tối ưu hóa quy trình
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300" role="list">
                    <li className="flex items-center" role="listitem">
                      <Target className="w-3 h-3 mr-2 text-blue-400" aria-hidden="true" /> Bot Thu Thập Web
                    </li>
                    <li className="flex items-center" role="listitem">
                      <Target className="w-3 h-3 mr-2 text-blue-400" aria-hidden="true" /> Công Cụ Xử Lý Dữ Liệu
                    </li>
                    <li className="flex items-center" role="listitem">
                      <Target className="w-3 h-3 mr-2 text-blue-400" aria-hidden="true" /> Tự Động Hóa Quy Trình
                    </li>
                  </ul>
                </CardContent>
                </Card>
              </article>

              <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 animate-float">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Bot MMO & Công Cụ Game</h3>
                  <p className="text-gray-400">Tự động hóa game tiên tiến, bot nhân vật và công cụ nâng cao MMO</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-purple-400" /> Tự Động Hóa Nhân Vật
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-purple-400" /> Thu Hoạch Tài Nguyên
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-purple-400" /> Nâng Cao Game
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 animate-float">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Bot Telegram & Discord</h3>
                  <p className="text-gray-400">Chatbot thông minh, quản lý cộng đồng và hệ thống tin nhắn tự động</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-green-400" /> Quản Lý Cộng Đồng
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-green-400" /> Kiểm Duyệt Tự Động
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-green-400" /> Lệnh Tùy Chỉnh
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 animate-float">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Bot Crypto & Giao Dịch</h3>
                  <p className="text-gray-400">
                    Giao dịch thuật toán, tự động hóa DeFi và quản lý danh mục tiền điện tử
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-yellow-400" /> Giao Dịch Thuật Toán
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-yellow-400" /> Tự Động Hóa DeFi
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-yellow-400" /> Quản Lý Danh Mục
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 animate-float">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Công Cụ Trình Duyệt & Desktop</h3>
                  <p className="text-gray-400">
                    Tiện ích mở rộng trình duyệt, tự động hóa desktop và công cụ tích hợp hệ thống
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-red-400" /> Tiện Ích Trình Duyệt
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-red-400" /> Tự Động Hóa Desktop
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-red-400" /> Tích Hợp Hệ Thống
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="service-card bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 animate-float">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Phần Mềm SaaS & Doanh Nghiệp</h3>
                  <p className="text-gray-400">
                    Nền tảng SaaS có thể mở rộng, giải pháp doanh nghiệp và tự động hóa dựa trên đám mây
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-indigo-400" /> Nền Tảng SaaS
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-indigo-400" /> Giải Pháp Doanh Nghiệp
                    </li>
                    <li className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-indigo-400" /> Tích Hợp Đám Mây
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialization Highlights */}
        <section className="w-full py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
              <div className="text-center space-y-4 cyber-border rounded-lg p-6">
                <div className="flex justify-center">
                  <Award className="h-12 w-12 text-blue-400" />
                </div>
                <AnimatedCounter end={100} suffix="+" />
                <p className="text-gray-400">Dự Án Tự Động Hóa Đã Hoàn Thành</p>
              </div>

              <div className="text-center space-y-4 cyber-border rounded-lg p-6">
                <div className="flex justify-center">
                  <Users className="h-12 w-12 text-purple-400" />
                </div>
                <p className="text-2xl font-bold gradient-text">Được Tin Tưởng Toàn Cầu</p>
                <p className="text-gray-400">Bởi Các Trader Crypto</p>
              </div>

              <div className="text-center space-y-4 cyber-border rounded-lg p-6">
                <div className="flex justify-center">
                  <Cpu className="h-12 w-12 text-green-400" />
                </div>
                <p className="text-2xl font-bold gradient-text">Thời Gian Thực</p>
                <p className="text-gray-400">Bảng Điều Khiển Hiệu Suất Bot</p>
              </div>

              <div className="text-center space-y-4 cyber-border rounded-lg p-6">
                <div className="flex justify-center">
                  <Shield className="h-12 w-12 text-yellow-400" />
                </div>
                <AnimatedCounter end={24} suffix="/7" />
                <p className="text-gray-400">Hỗ Trợ & Giám Sát</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="clients" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                Thành Công Khách Hàng
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                Được Tin Tưởng Bởi Các Nhà Đổi Mới
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
              <Card className="testimonial-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 font-mono text-sm">
                    {">"} iCoderX đã xây dựng bot giao dịch crypto của chúng tôi tạo ra 300% ROI trong 6 tháng. Chuyên
                    môn tự động hóa của họ là không thể sánh được. {"<"}
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/client.png?height=40&width=40"
                      width="40"
                      height="40"
                      alt="Ảnh đại diện của Anh Tuấn - Trader Crypto chuyên nghiệp"
                      className="rounded-full border-2 border-blue-500/50"
                    />
                    <div>
                      <div className="font-semibold text-white">Anh Tuấn</div>
                      <div className="text-sm text-gray-400">Trader Crypto</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="testimonial-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 font-mono text-sm">
                    {">"} Bot MMO của họ đã tiết kiệm cho chúng tôi 40 giờ/tuần làm việc thủ công. Chuyên nghiệp, đáng
                    tin cậy và cực kỳ hiệu quả. {"<"}
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/client.png?height=40&width=40"
                      width="40"
                      height="40"
                      alt="Ảnh đại diện của Anh Kim - Trưởng nhóm game MMO"
                      className="rounded-full border-2 border-purple-500/50"
                    />
                    <div>
                      <div className="font-semibold text-white">Anh Kim</div>
                      <div className="text-sm text-gray-400">Trưởng Nhóm Game</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="testimonial-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 font-mono text-sm">
                    {">"} Bot quản lý cộng đồng Discord của chúng tôi xử lý 10K+ người dùng một cách hoàn hảo. iCoderX
                    đã giao hàng vượt mong đợi. {"<"}
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/client.png?height=40&width=40"
                      width="40"
                      height="40"
                      alt="Ảnh đại diện của Anh Trường - Quản lý cộng đồng Discord"
                      className="rounded-full border-2 border-green-500/50"
                    />
                    <div>
                      <div className="font-semibold text-white">Anh Trường</div>
                      <div className="text-sm text-gray-400">Quản Lý Cộng Đồng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section
          id="solutions"
          className="w-full py-20 md:py-32 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                Nghiên Cứu Trường Hợp
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">Câu Chuyện Thành Công</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="cyber-border bg-black/40 overflow-hidden">
                <div className="relative">
                  <Image
                    src="/trading.png?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Giao diện bảng điều khiển bot giao dịch cryptocurrency với AI - Hiển thị biểu đồ, thống kê ROI và các chỉ số hiệu suất giao dịch tự động"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500">Giao Dịch Crypto</Badge>
                  <h3 className="text-xl font-bold mb-2 text-white">Bot Giao Dịch Được Hỗ Trợ AI</h3>
                  <p className="text-gray-400 mb-4">
                    Hệ thống giao dịch crypto tự động với thuật toán ML đạt được lợi nhuận ổn định
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">300%</div>
                      <div className="text-sm text-gray-400">Tăng ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">24/7</div>
                      <div className="text-sm text-gray-400">Giao Dịch Tự Động</div>
                    </div>
                  </div>
                  <Link
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent border rounded-md px-3 py-2 text-sm inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Xem Chi Tiết
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-black/40 overflow-hidden">
                <div className="relative">
                  <Image
                    src="/mmo.png?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Giao diện bot MMO tự động hóa nhân vật game - Hiển thị bản đồ, inventory, và hệ thống quản lý tài nguyên trong MMORPG"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500">Tự Động Hóa Game</Badge>
                  <h3 className="text-xl font-bold mb-2 text-white">Bot Tài Nguyên MMO</h3>
                  <p className="text-gray-400 mb-4">
                    Tự động hóa nhân vật tiên tiến cho việc thu hoạch tài nguyên và nâng cấp trong MMORPG phổ biến
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">40giờ</div>
                      <div className="text-sm text-gray-400">Tiết Kiệm Hàng Tuần</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">500+</div>
                      <div className="text-sm text-gray-400">Người Dùng Hoạt Động</div>
                    </div>
                  </div>
                  <Link
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent border rounded-md px-3 py-2 text-sm inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Xem Chi Tiết
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="cyber-border rounded-2xl p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Sẵn Sàng Xây Dựng Tương Lai Với Tự Động Hóa?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  Tham gia cuộc cách mạng tự động hóa. Hãy thảo luận về dự án của bạn và chuyển đổi doanh nghiệp với
                  công nghệ bot tiên tiến.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Nói Chuyện Với Chuyên Gia
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/contact" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Đặt Lịch Tư Vấn Miễn Phí
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Đánh Giá Dự Án Miễn Phí</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span>Giải Pháp Tùy Chỉnh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span>Triển Khai Nhanh</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Google Maps Location Section */}
      <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900 border-t border-blue-500/20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2 mb-6">
              <Target className="w-4 h-4 mr-2" />
              Vị Trí Của Chúng Tôi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Tìm Thấy Chúng Tôi</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Địa chỉ văn phòng iCoderX tại Hà Nội. Ghé thăm chúng tôi để trao đổi trực tiếp về dự án tự động hóa của bạn.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="relative rounded-xl overflow-hidden border border-blue-500/20 bg-gray-900/50 backdrop-blur-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14895.455724729164!2d105.8542!3d21.0285!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xab80f820cb7b8f91!2siCoderX%20-%20Code%20tool%20bot%20auto%20theo%20y%C3%AAu%20c%E1%BA%A7u!5e0!3m2!1svi!2s!4v1736637200000!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[450px]"
                title="Vị trí iCoderX - Code tool bot auto theo yêu cầu"
              ></iframe>
              <div className="absolute top-4 right-4">
                <a
                  href="https://www.google.com/maps/place/iCoderX+-+Code+tool+bot+auto+theo+y%C3%AAu+c%E1%BA%A7u/data=!4m2!3m1!1s0x0:0xab80f820cb7b8f91?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Xem trên Google Maps
                </a>
              </div>
            </div>

            {/* Location Info - Single Combined Card */}
            <div className="space-y-6">
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 service-card h-[450px] overflow-y-auto">
                <CardContent className="p-6">
                  {/* Address Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-400" />
                      Thông Tin Địa Chỉ
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start space-x-3">
                        <Target className="w-4 h-4 text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">Địa chỉ:</p>
                          <p>116 Đ. Tả Thanh Oai, Tả Thanh Oai, Thanh Trì, Hà Nội</p>
                          <p className="text-sm text-gray-400">Mã bưu điện: 100000</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-start space-x-3">
                          <Mail className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <p className="font-medium">Email:</p>
                            <a href="mailto:admin@icoderx.vn" className="text-blue-400 hover:text-blue-300 transition-colors">
                              admin@icoderx.vn
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <TelegramIcon className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <p className="font-medium">Telegram:</p>
                            <a href="https://t.me/iCoderXvn" className="text-blue-400 hover:text-blue-300 transition-colors">
                              @iCoderXvn
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 mt-3">
                        <Facebook className="w-4 h-4 text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">Facebook:</p>
                          <a href="https://facebook.com/iCoderXvn" className="text-blue-400 hover:text-blue-300 transition-colors">
                            iCoderXvn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-600 my-6"></div>

                  {/* Working Hours Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-blue-400" />
                      Giờ Làm Việc
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between items-center">
                        <span>Thứ 2 - Thứ 6:</span>
                        <span className="text-blue-400 font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Thứ 7:</span>
                        <span className="text-blue-400 font-medium">9:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Chủ nhật:</span>
                        <span className="text-gray-400">Nghỉ</span>
                      </div>
                      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm text-blue-300 flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Hỗ trợ 24/7 qua Telegram cho các dự án khẩn cấp
                        </p>
                      </div>
                      
                      {/* Additional Contact Info */}
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-purple-300 mb-2">Liên Hệ Nhanh</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300">📞 Tư vấn miễn phí qua Telegram</p>
                          <p className="text-gray-300">💬 Phản hồi trong vòng 30 phút</p>
                          <p className="text-gray-300">🚀 Báo giá dự án trong 24h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full border-t border-blue-500/20 bg-black/80" role="contentinfo">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/favicon.ico"
                  alt={`${settings.siteName} Logo - Automation Solutions`}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-2xl font-bold gradient-text">{settings.siteName}</span>
              </div>
              <p className="text-sm text-gray-400">{settings.siteDescription}</p>
              <nav className="flex space-x-4" aria-label="Social Media Links">
                <Link
                  href={settings.facebookUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Theo dõi ${settings.siteName} trên Facebook`}
                >
                  <Facebook className="h-6 w-6" aria-hidden="true" />
                </Link>
                <Link
                  href={settings.twitterUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Theo dõi ${settings.siteName} trên Twitter/X`}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                <Link
                  href={settings.youtubeUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Subscribe kênh YouTube ${settings.siteName}`}
                >
                  <Youtube className="h-6 w-6" aria-hidden="true" />
                </Link>
                <Link
                  href={settings.telegramUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Liên hệ ${settings.siteName} qua Telegram`}
                >
                  <TelegramIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Liên Kết Nhanh</h4>
              <nav className="flex flex-col space-y-2 text-sm" aria-label="Quick Links">
                <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Điều Khoản Dịch Vụ
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Chính Sách Bảo Mật
                </Link>
                <Link href="/docs" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tài Liệu
                </Link>
                <Link href="/api" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tham Khảo API
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Dịch Vụ</h4>
              <nav className="flex flex-col space-y-2 text-sm" aria-label="Services">
                <Link href="/services/trading-bots" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Bot Giao Dịch
                </Link>
                <Link href="/services/mmo-automation" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tự Động Hóa MMO
                </Link>
                <Link href="/services/discord-bots" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Bot Discord
                </Link>
                <Link href="/services/custom-software" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Phần Mềm Tùy Chỉnh
                </Link>
              </nav>
            </div>

            <address className="space-y-4 not-italic">
              <h4 className="text-sm font-semibold text-white">Liên Hệ</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-blue-400 transition-colors">{settings.contactEmail}</a>
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                <div className="flex items-center space-x-2">
                  <TelegramIcon className="h-4 w-4" aria-hidden="true" />
                  <a href={settings.telegramUrl} className="hover:text-blue-400 transition-colors">{settings.telegramUrl.replace('https://t.me/', '')}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <a href={settings.youtubeUrl} className="hover:text-blue-400 transition-colors">{settings.youtubeUrl.replace('https://www.youtube.com/', '').replace('https://youtube.com/', '')}</a>
                </div>
              </div>
            </address>
          </div>

          <div className="mt-8 border-t border-blue-500/20 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} {settings.siteName}. Tất cả quyền được bảo lưu. Được xây dựng với ⚡ tự động hóa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
