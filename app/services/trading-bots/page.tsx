import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BinaryRain } from '@/components/binary-rain'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BreadcrumbBar } from '@/components/breadcrumb-bar'
import {
  TrendingUp,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  DollarSign,
  LineChart,
  Settings,
  Lock,
  Rocket,
  Building,
  Award,
  Users,
  Star,
  Gamepad2,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()

  return {
    title: `Bot Giao Dịch Crypto - Trading Bot AI | ${settings.siteName}`,
    description: 'Phát triển bot giao dịch crypto tự động với AI, thuật toán trading thông minh, backtest, quản lý rủi ro. Hỗ trợ Binance, Bybit, OKX. Bot trading 24/7 với ROI tối ưu.',
    keywords: 'bot giao dịch crypto, crypto trading bot, bot trading tự động, thuật toán trading, AI trading bot, bot Binance, bot Bybit, automated trading, algorithmic trading, crypto bot development, DCA bot, grid trading bot, arbitrage bot, market making bot',
    alternates: {
      canonical: `${settings.siteUrl}/services/trading-bots`,
    },
  }
}

export default function TradingBotsPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumb Navigation with Ticker - Fixed */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Dịch Vụ', href: '/#services' },
          { name: 'Bot Giao Dịch Crypto', href: '/services/trading-bots' },
        ]}
      />

      <main className="flex-1 relative z-10 pt-[75px]" role="main">

        {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trading Bot Development
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Bot Giao Dịch Crypto</span>
              <br />
              <span className="text-white">Tự Động & Thông Minh</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Phát triển bot giao dịch cryptocurrency tự động với thuật toán AI tiên tiến, 
              backtest chính xác, và quản lý rủi ro thông minh. Giao dịch 24/7 không ngừng nghỉ.
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
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
              >
                Liên Hệ Telegram
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">300%</div>
                <p className="text-gray-400 text-sm mt-2">Tăng ROI Trung Bình</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <p className="text-gray-400 text-sm mt-2">Giao Dịch Không Ngừng</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <p className="text-gray-400 text-sm mt-2">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
              Tính Năng Nổi Bật
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
              Giải Pháp Trading Bot Toàn Diện
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tất cả tính năng bạn cần để xây dựng hệ thống giao dịch tự động hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Thuật Toán AI</h3>
                <p className="text-gray-400">
                  Machine Learning và AI để phân tích thị trường, dự đoán xu hướng và tối ưu hóa chiến lược giao dịch
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                    Pattern Recognition
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                    Sentiment Analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                    Predictive Models
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Backtesting</h3>
                <p className="text-gray-400">
                  Test chiến lược với dữ liệu lịch sử, đánh giá hiệu suất và tối ưu hóa trước khi triển khai thực tế
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                    Historical Data Analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                    Performance Metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                    Strategy Optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Quản Lý Rủi Ro</h3>
                <p className="text-gray-400">
                  Hệ thống quản lý rủi ro thông minh với stop-loss tự động, position sizing và risk management
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                    Auto Stop-Loss/Take-Profit
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                    Position Sizing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                    Risk-Reward Ratio
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Tốc Độ Cao</h3>
                <p className="text-gray-400">
                  Thực thi lệnh nhanh chóng với độ trễ thấp, tận dụng cơ hội thị trường trong tích tắc
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                    Low Latency Trading
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                    High-Frequency Support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                    Real-time Execution
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Đa Chiến Lược</h3>
                <p className="text-gray-400">
                  Hỗ trợ nhiều chiến lược giao dịch: DCA, Grid Trading, Arbitrage, Market Making và nhiều hơn nữa
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                    DCA (Dollar Cost Averaging)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                    Grid Trading
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-red-400" />
                    Arbitrage & Market Making
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Tùy Chỉnh Linh Hoạt</h3>
                <p className="text-gray-400">
                  Cấu hình chi tiết mọi thông số, tùy chỉnh theo phong cách giao dịch và risk profile của bạn
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                    Custom Indicators
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                    Flexible Parameters
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-indigo-400" />
                    Multi-Exchange Support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Exchanges */}
      <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
              Tích Hợp Đa Sàn
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Hỗ Trợ Các Sàn Giao Dịch Hàng Đầu
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Kết nối với các sàn crypto lớn nhất thế giới qua API
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Binance', 'Bybit', 'OKX', 'Kraken', 'KuCoin', 'Huobi', 'Gate.io', 'BitMEX'].map((exchange) => (
              <Card key={exchange} className="bg-black/60 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="font-semibold text-white">{exchange}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Strategies */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
              Chiến Lược Giao Dịch
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
              Các Loại Bot Trading Phổ Biến
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-black/40 border-blue-500/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">DCA Bot (Dollar Cost Averaging)</h3>
                    <p className="text-gray-400 mb-4">
                      Mua tự động theo khoảng thời gian đều đặn, giảm thiểu rủi ro và tận dụng biến động giá
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                        Phù hợp xu hướng tăng dài hạn
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
                        Giảm rủi ro timing thị trường
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Grid Trading Bot</h3>
                    <p className="text-gray-400 mb-4">
                      Đặt lệnh mua/bán theo lưới giá, tự động chốt lời trong thị trường sideway
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                        Hiệu quả trong thị trường dao động
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                        Tự động mua thấp bán cao
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Arbitrage Bot</h3>
                    <p className="text-gray-400 mb-4">
                      Tận dụng chênh lệch giá giữa các sàn để kiếm lời không rủi ro
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                        Rủi ro thấp, lợi nhuận ổn định
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                        Thực thi tốc độ cao
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Trend Following Bot</h3>
                    <p className="text-gray-400 mb-4">
                      Theo xu hướng thị trường với các chỉ báo kỹ thuật và AI prediction
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                        Dựa trên phân tích kỹ thuật
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-400" />
                        Tối ưu lợi nhuận trong trend mạnh
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
              4 Bước Xây Dựng Trading Bot
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                icon: Target,
                title: 'Phân Tích Yêu Cầu',
                description: 'Tư vấn chiến lược, phân tích risk profile và mục tiêu đầu tư',
              },
              {
                step: '02',
                icon: Cpu,
                title: 'Phát Triển & Test',
                description: 'Code bot, backtest với dữ liệu lịch sử, tối ưu hóa thuật toán',
              },
              {
                step: '03',
                icon: Rocket,
                title: 'Deploy & Monitor',
                description: 'Triển khai lên production, giám sát 24/7, điều chỉnh khi cần',
              },
              {
                step: '04',
                icon: BarChart3,
                title: 'Báo Cáo & Tối Ưu',
                description: 'Phân tích hiệu suất, báo cáo định kỳ, cải thiện liên tục',
              },
            ].map((item, index) => (
              <Card key={index} className="bg-black/40 border-blue-500/20 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl font-bold text-blue-500/10 absolute top-2 right-2 group-hover:text-blue-500/20 transition-all">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
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
      <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
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
                q: 'Trading bot có an toàn không?',
                a: 'Bot giao dịch qua API key với quyền hạn giới hạn (chỉ trade, không withdraw). Bạn luôn kiểm soát 100% tài sản của mình trên sàn.',
              },
              {
                q: 'Bot có đảm bảo lợi nhuận không?',
                a: 'Không có đảm bảo lợi nhuận tuyệt đối trong trading. Tuy nhiên, bot giúp tối ưu hóa chiến lược, loại bỏ cảm xúc và giao dịch 24/7 để tận dụng mọi cơ hội.',
              },
              {
                q: 'Tôi cần vốn bao nhiêu để bắt đầu?',
                a: 'Tùy chiến lược, thường từ $500-$1000 trở lên. Khuyến nghị bắt đầu với số vốn nhỏ để test và scale dần.',
              },
              {
                q: 'Thời gian phát triển mất bao lâu?',
                a: 'Bot cơ bản: 1-2 tuần. Bot nâng cao với AI: 3-4 tuần. Enterprise solution: 1-3 tháng tùy độ phức tạp.',
              },
              {
                q: 'Có hỗ trợ sau khi bàn giao không?',
                a: 'Có. Gói Starter: 1 tháng, Pro: 3 tháng, Enterprise: lifetime support. Bao gồm bug fixing, tư vấn và training.',
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-start">
                    <span className="text-blue-400 mr-2">Q:</span>
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
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10 space-y-6">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                  <Rocket className="w-4 h-4 mr-2" />
                  Bắt Đầu Ngay Hôm Nay
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span className="gradient-text">Sẵn Sàng Tự Động Hóa</span>
                  <br />
                  <span className="text-white">Giao Dịch Crypto?</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Tư vấn miễn phí chiến lược trading và giải pháp bot phù hợp với bạn
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
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                  >
                    Chat Telegram
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>Bảo Mật Tối Đa</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>Giao 24/7</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span>ROI Tối Ưu</span>
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
