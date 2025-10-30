import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BinaryRain } from '@/components/binary-rain'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Gamepad2,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  DollarSign,
  Settings,
  Rocket,
  Award,
  Users,
  MousePointer2,
  Keyboard,
  Eye,
  Sword,
  Package,
  TrendingUp,
  Monitor,
  Code,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()

  return {
    title: `Bot MMO & Tự Động Hóa Game | ${settings.siteName}`,
    description: 'Phát triển bot MMO tự động, bot farming game, auto quest, auto skill. Hỗ trợ MMORPG, mobile game, web game. Tự động hóa nhân vật 24/7, tiết kiệm thời gian, tối ưu hiệu quả.',
    keywords: 'bot MMO, bot game auto, tự động hóa game, bot farming, auto quest, auto skill, bot MMORPG, bot mobile game, bot web game, game automation, character automation, resource farming bot, leveling bot, auto grinding, macro game, script game, bot nhân vật, tool MMO, phần mềm auto game, bot thu thập tài nguyên',
  }
}

export default function MMOAutomationPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      <main className="flex-1 relative z-10 pt-16" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 px-4 py-2">
                <Gamepad2 className="w-4 h-4 mr-2" />
                MMO Automation Development
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Bot MMO & Tự Động Hóa Game</span>
                <br />
                <span className="text-white">Farming 24/7 Không Ngừng</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Phát triển bot tự động cho MMORPG, mobile game, web game. Auto quest, farming tài nguyên, 
                leveling nhân vật thông minh. Tiết kiệm thời gian, tối đa hóa hiệu quả.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                  Tư Vấn Miễn Phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                >
                  Liên Hệ Telegram
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">40h+</div>
                  <p className="text-gray-400 text-sm mt-2">Tiết Kiệm Mỗi Tuần</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <p className="text-gray-400 text-sm mt-2">Farming Tự Động</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">500+</div>
                  <p className="text-gray-400 text-sm mt-2">Bot Đã Xây Dựng</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                Tính Năng Nổi Bật
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Giải Pháp Tự Động Hóa Game Toàn Diện
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Mọi tính năng cần thiết để xây dựng bot game hiệu quả và ổn định
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <MousePointer2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Thao Tác Tự Động</h3>
                  <p className="text-gray-400">
                    Mô phỏng click chuột, di chuyển, thao tác bàn phím tự nhiên như người chơi thật
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      Auto Click & Movement
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      Human-like Behavior
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                      Anti-Detection
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Nhận Diện Hình Ảnh</h3>
                  <p className="text-gray-400">
                    Computer Vision để phát hiện đối tượng, đọc text, phân tích màn hình game
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-pink-400" />
                      OCR Text Recognition
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-pink-400" />
                      Object Detection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-pink-400" />
                      Pattern Matching
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Auto Quest & Mission</h3>
                  <p className="text-gray-400">
                    Tự động nhận nhiệm vụ, hoàn thành quest, nộp phần thưởng theo logic thông minh
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      Quest Auto-Completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      Priority System
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                      Reward Management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Farming Tài Nguyên</h3>
                  <p className="text-gray-400">
                    Thu thập tài nguyên, vật phẩm, gold tự động với route tối ưu
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Resource Collection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Optimal Routing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Inventory Management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Sword className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Combat System</h3>
                  <p className="text-gray-400">
                    Hệ thống chiến đấu tự động với combo skill, dodge, heal thông minh
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      Auto Combat
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      Skill Rotation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                      HP/MP Management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Multi-Account</h3>
                  <p className="text-gray-400">
                    Quản lý và điều khiển nhiều tài khoản cùng lúc, đồng bộ hóa hành động
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      Multi-Window Control
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      Synchronized Actions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                      Account Manager
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Supported Game Types */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                Hỗ Trợ Đa Nền Tảng
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Loại Game Được Hỗ Trợ
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Phát triển bot cho mọi loại game từ PC, Mobile đến Web
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'MMORPG PC', icon: Gamepad2 },
                { name: 'Mobile Game', icon: Monitor },
                { name: 'Web Game', icon: Code },
                { name: 'Idle Game', icon: Clock },
                { name: 'Strategy Game', icon: Target },
                { name: 'Action RPG', icon: Sword },
                { name: 'Card Game', icon: Package },
                { name: 'Simulation', icon: Settings },
              ].map((type) => (
                <Card key={type.name} className="bg-black/60 border-purple-500/20 hover:border-purple-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="font-semibold text-white">{type.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bot Types */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
                Các Loại Bot
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Bot MMO Phổ Biến
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Leveling Bot</h3>
                      <p className="text-gray-400 mb-4">
                        Tự động luyện cấp nhân vật, grinding exp với route và skill rotation tối ưu
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                          Auto grinding zone tốt nhất
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                          Exp/hour optimization
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Farming Bot</h3>
                      <p className="text-gray-400 mb-4">
                        Thu thập tài nguyên, vật phẩm, gold tự động 24/7 không mệt mỏi
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Resource collection tự động
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                          Gold farming optimization
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Quest Bot</h3>
                      <p className="text-gray-400 mb-4">
                        Hoàn thành nhiệm vụ tự động, từ daily quest đến main storyline
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                          Auto quest completion
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                          Dialog auto-skip
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Sword className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Combat Bot</h3>
                      <p className="text-gray-400 mb-4">
                        Chiến đấu tự động với AI thông minh, combo skill chuẩn xác
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                          Smart skill rotation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                          Auto dodge & heal
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                Quy Trình Làm Việc
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                4 Bước Phát Triển Bot Game
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  step: '01',
                  icon: Target,
                  title: 'Phân Tích Game',
                  description: 'Research cơ chế game, xác định chức năng cần tự động hóa',
                },
                {
                  step: '02',
                  icon: Code,
                  title: 'Phát Triển Bot',
                  description: 'Code bot với logic thông minh, test và tối ưu hiệu suất',
                },
                {
                  step: '03',
                  icon: Shield,
                  title: 'Anti-Detection',
                  description: 'Tích hợp anti-ban, randomize behavior, human-like actions',
                },
                {
                  step: '04',
                  icon: Rocket,
                  title: 'Deploy & Support',
                  description: 'Bàn giao bot, hướng dẫn sử dụng, hỗ trợ và update',
                },
              ].map((item, index) => (
                <Card key={index} className="bg-black/40 border-purple-500/20 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl font-bold text-purple-500/10 absolute top-2 right-2 group-hover:text-purple-500/20 transition-all">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center relative z-10">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">{item.title}</h3>
                    <p className="text-sm text-gray-400 relative z-10">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                Câu Hỏi Thường Gặp
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text">FAQ</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'Bot game có bị phát hiện và ban không?',
                  a: 'Bot được tích hợp nhiều kỹ thuật anti-detection như randomize timing, human-like behavior, anti-fingerprint. Tuy nhiên, không có bot nào 100% an toàn. Chúng tôi khuyến nghị sử dụng cẩn thận và tuân thủ ToS game.',
                },
                {
                  q: 'Thời gian phát triển bot mất bao lâu?',
                  a: 'Bot đơn giản (farming, leveling): 1-2 tuần. Bot phức tạp (quest, combat): 3-4 tuần. Bot multi-account hoặc có AI: 1-2 tháng. Tùy vào độ phức tạp của game và yêu cầu.',
                },
                {
                  q: 'Bot có hoạt động với mọi game không?',
                  a: 'Hầu hết các game PC, mobile, web đều có thể làm bot. Tuy nhiên, game có protection mạnh (GameGuard, anti-cheat) sẽ khó hơn. Chúng tôi sẽ đánh giá khả năng thực hiện trước khi nhận dự án.',
                },
                {
                  q: 'Bot có cần máy tính chạy liên tục không?',
                  a: 'Có. Bot cần máy tính/VPS để chạy 24/7. Chúng tôi có thể tư vấn setup VPS hoặc cloud gaming để tiết kiệm chi phí.',
                },
                {
                  q: 'Có hỗ trợ sau khi bàn giao không?',
                  a: 'Có. Bao gồm hướng dẫn sử dụng, fix bug trong thời gian bảo hành, update khi game có patch mới (trong thời gian support). Thời gian support tùy gói dịch vụ.',
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-black/40 border-purple-500/20 hover:border-purple-500/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-start">
                      <span className="text-purple-400 mr-2">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-400 pl-6">
                      <span className="text-green-400 mr-2">A:</span>
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="cyber-border bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                <div className="relative z-10 space-y-6">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                    <Rocket className="w-4 h-4 mr-2" />
                    Bắt Đầu Ngay Hôm Nay
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    <span className="gradient-text">Sẵn Sàng Tự Động Hóa</span>
                    <br />
                    <span className="text-white">Nhân Vật Game?</span>
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Tư vấn miễn phí giải pháp bot phù hợp với game bạn đang chơi
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                      Nhận Tư Vấn Miễn Phí
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href={settings.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                    >
                      Chat Telegram
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span>Anti-Detection</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span>24/7 Farming</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span>Tiết Kiệm Thời Gian</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer 
        siteName={settings.siteName}
        siteDescription={settings.siteDescription}
        contactEmail={settings.contactEmail}
        facebookUrl={settings.facebookUrl}
        twitterUrl={settings.twitterUrl}
        youtubeUrl={settings.youtubeUrl}
        telegramUrl={settings.telegramUrl}
      />
    </div>
  )
}
