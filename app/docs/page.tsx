import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BinaryRain } from '@/components/binary-rain'
import { BreadcrumbBar } from '@/components/breadcrumb-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Code,
  Rocket,
  Settings,
  Terminal,
  FileCode,
  Package,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Play,
  GitBranch,
  Database,
  Key,
  Server,
  Bug,
  LifeBuoy,
  FileText,
  Layers,
  Box,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()
  
  return {
    title: `Tài Liệu Hướng Dẫn - Documentation | ${settings.siteName}`,
    description: 'Hướng dẫn đầy đủ về cài đặt, cấu hình và sử dụng các dịch vụ của iCoderX. Documentation cho trading bots, chatbots, MMO automation và custom software.',
    keywords: 'documentation, hướng dẫn sử dụng, tài liệu kỹ thuật, api documentation, bot setup guide, trading bot tutorial, installation guide, configuration docs',
  }
}

export default function DocsPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs with Ticker - Fixed */}
      <BreadcrumbBar
        items={[
          { name: 'Trang Chủ', href: '/' },
          { name: 'Tài Liệu', href: '/docs' }
        ]}
      />
      
      {/* Spacer for fixed breadcrumb bar */}
      <div className="h-11"></div>

      <main className="flex-1 relative z-10" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Tài Liệu & Hướng Dẫn
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Documentation Center</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Hướng dẫn chi tiết về cài đặt, cấu hình và sử dụng các dịch vụ của chúng tôi. 
                Tài liệu kỹ thuật đầy đủ từ cơ bản đến nâng cao.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="#getting-started" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                  Bắt Đầu Ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                >
                  Liên Hệ Hỗ Trợ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                Bắt Đầu Nhanh
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
                Chọn Dịch Vụ Của Bạn
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Trading Bots</h3>
                  <p className="text-gray-400 text-sm">
                    Setup và cấu hình bot giao dịch crypto
                  </p>
                  <Link href="#trading-bots" className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center">
                    Xem hướng dẫn <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Chat Bots</h3>
                  <p className="text-gray-400 text-sm">
                    Deploy chatbot lên Telegram, Discord
                  </p>
                  <Link href="#chat-bots" className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center">
                    Xem hướng dẫn <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">MMO Automation</h3>
                  <p className="text-gray-400 text-sm">
                    Cài đặt bot game và multi-account
                  </p>
                  <Link href="#mmo-automation" className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center">
                    Xem hướng dẫn <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-blue-500/20 hover:border-blue-500/50 transition-all group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Custom Software</h3>
                  <p className="text-gray-400 text-sm">
                    API docs và integration guide
                  </p>
                  <Link href="#custom-software" className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center">
                    Xem hướng dẫn <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                  Bắt Đầu
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Hướng Dẫn Cơ Bản</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3">1. Yêu Cầu Hệ Thống</h3>
                        <div className="space-y-3 text-gray-300">
                          <p><strong className="text-white">Server/VPS:</strong></p>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                              <span>RAM: Tối thiểu 2GB (khuyến nghị 4GB+)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                              <span>CPU: 2 cores hoặc cao hơn</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                              <span>Storage: 20GB+ SSD</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                              <span>OS: Ubuntu 20.04+ / Debian 11+ / Windows Server 2019+</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                              <span>Network: Kết nối internet ổn định, low latency</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3">2. Cài Đặt Dependencies</h3>
                        <div className="space-y-4 text-gray-300">
                          <p><strong className="text-white">Node.js & npm:</strong></p>
                          <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              # Ubuntu/Debian<br />
                              curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -<br />
                              sudo apt-get install -y nodejs<br />
                              <br />
                              # Verify installation<br />
                              node --version<br />
                              npm --version
                            </code>
                          </div>
                          
                          <p className="mt-4"><strong className="text-white">Python 3.9+:</strong></p>
                          <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              sudo apt update<br />
                              sudo apt install python3 python3-pip<br />
                              python3 --version
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3">3. Cấu Hình API Keys</h3>
                        <div className="space-y-3 text-gray-300">
                          <p>Tạo file <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">.env</code> trong thư mục gốc:</p>
                          <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              # Exchange API Keys<br />
                              BINANCE_API_KEY=your_api_key_here<br />
                              BINANCE_API_SECRET=your_api_secret_here<br />
                              <br />
                              # Telegram Bot<br />
                              TELEGRAM_BOT_TOKEN=your_bot_token<br />
                              TELEGRAM_CHAT_ID=your_chat_id<br />
                              <br />
                              # Database<br />
                              DATABASE_URL=your_database_url
                            </code>
                          </div>
                          <div className="mt-4 p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5">
                            <p className="flex items-start text-sm">
                              <Shield className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                              <span>
                                <strong className="text-white">Bảo mật:</strong> Không commit file .env lên git. 
                                Thêm .env vào .gitignore
                              </span>
                            </p>
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

        {/* Trading Bots */}
        <section id="trading-bots" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 mb-4">
                  <Rocket className="w-4 h-4 mr-2" />
                  Trading Bots
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Hướng Dẫn Trading Bot</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Terminal className="w-6 h-6 mr-3 text-blue-400" />
                      Installation
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          # Clone repository (sau khi được cấp quyền)<br />
                          git clone https://github.com/your-repo/trading-bot.git<br />
                          cd trading-bot<br />
                          <br />
                          # Install dependencies<br />
                          npm install<br />
                          <br />
                          # Copy environment file<br />
                          cp .env.example .env<br />
                          <br />
                          # Edit .env với API keys của bạn<br />
                          nano .env
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Settings className="w-6 h-6 mr-3 text-green-400" />
                      Configuration
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Chỉnh sửa file <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">config.json</code>:</p>
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <code className="text-green-400">
                          {`{
  "exchange": "binance",
  "symbol": "BTCUSDT",
  "strategy": "grid_trading",
  "parameters": {
    "gridLevels": 10,
    "upperPrice": 50000,
    "lowerPrice": 40000,
    "quantity": 0.01,
    "stopLoss": 3,
    "takeProfit": 5
  },
  "riskManagement": {
    "maxPositionSize": 1000,
    "dailyLossLimit": 100
  }
}`}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Play className="w-6 h-6 mr-3 text-purple-400" />
                      Running
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          # Test mode (paper trading)<br />
                          npm run test<br />
                          <br />
                          # Production mode<br />
                          npm start<br />
                          <br />
                          # Run as background service<br />
                          pm2 start npm --name "trading-bot" -- start<br />
                          pm2 save<br />
                          pm2 startup
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Bots */}
        <section id="chat-bots" className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 mb-4">
                  <Package className="w-4 h-4 mr-2" />
                  Chat Bots
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Hướng Dẫn Chat Bot</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Telegram Bot Setup</h3>
                    <div className="space-y-4 text-gray-300">
                      <ol className="space-y-3 ml-6 list-decimal">
                        <li>Chat với <Link href="https://t.me/BotFather" target="_blank" className="text-blue-400 hover:text-blue-300 underline">@BotFather</Link> trên Telegram</li>
                        <li>Gửi lệnh <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">/newbot</code></li>
                        <li>Đặt tên cho bot của bạn</li>
                        <li>Đặt username (phải kết thúc bằng "bot")</li>
                        <li>Copy Bot Token và thêm vào file .env</li>
                      </ol>
                      
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm mt-4">
                        <code className="text-green-400">
                          # .env<br />
                          TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz<br />
                          TELEGRAM_CHAT_ID=your_chat_id
                        </code>
                      </div>

                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm mt-4">
                        <code className="text-green-400">
                          # Start bot<br />
                          npm run bot:telegram
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Discord Bot Setup</h3>
                    <div className="space-y-4 text-gray-300">
                      <ol className="space-y-3 ml-6 list-decimal">
                        <li>Truy cập <Link href="https://discord.com/developers/applications" target="_blank" className="text-blue-400 hover:text-blue-300 underline">Discord Developer Portal</Link></li>
                        <li>Click "New Application" và đặt tên</li>
                        <li>Vào tab "Bot" → Click "Add Bot"</li>
                        <li>Copy Bot Token</li>
                        <li>Enable "Message Content Intent"</li>
                        <li>Vào tab "OAuth2" → URL Generator → Chọn scope "bot" và permissions cần thiết</li>
                        <li>Copy URL và mở để invite bot vào server</li>
                      </ol>

                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm mt-4">
                        <code className="text-green-400">
                          # .env<br />
                          DISCORD_BOT_TOKEN=your_discord_token<br />
                          DISCORD_CLIENT_ID=your_client_id
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* MMO Automation */}
        <section id="mmo-automation" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10 mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  MMO Automation
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Hướng Dẫn MMO Bot</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Multi-Account Management</h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Cấu hình file <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">accounts.json</code>:</p>
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <code className="text-green-400">
                          {`{
  "accounts": [
    {
      "id": "acc_001",
      "username": "player1",
      "password": "encrypted_password",
      "proxy": "http://proxy1.com:8080",
      "tasks": ["farm", "quest", "dungeon"]
    },
    {
      "id": "acc_002",
      "username": "player2",
      "password": "encrypted_password",
      "proxy": "http://proxy2.com:8080",
      "tasks": ["farm", "trade"]
    }
  ],
  "schedule": {
    "enabled": true,
    "startTime": "08:00",
    "endTime": "23:00"
  }
}`}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Proxy Configuration</h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Khuyến nghị sử dụng proxy để tránh bị phát hiện:</p>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                          <span>Mỗi account nên có 1 proxy riêng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                          <span>Sử dụng residential proxy nếu có thể</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                          <span>Thêm random delay giữa các hành động</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section id="custom-software" className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mb-4">
                  <Code className="w-4 h-4 mr-2" />
                  API Reference
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Custom Software API</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Authentication</h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Tất cả API requests cần API key trong header:</p>
                      <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          POST /api/endpoint<br />
                          Headers:<br />
                          &nbsp;&nbsp;Authorization: Bearer YOUR_API_KEY<br />
                          &nbsp;&nbsp;Content-Type: application/json
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Example Endpoints</h3>
                    <div className="space-y-6 text-gray-300">
                      
                      <div>
                        <p className="font-bold text-white mb-2">GET /api/status</p>
                        <p className="text-sm mb-2">Kiểm tra trạng thái bot</p>
                        <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                          <code className="text-green-400">
                            Response:<br />
                            {`{
  "status": "running",
  "uptime": 3600,
  "lastUpdate": "2025-10-31T10:00:00Z"
}`}
                          </code>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-white mb-2">POST /api/start</p>
                        <p className="text-sm mb-2">Khởi động bot</p>
                        <div className="bg-black/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                          <code className="text-green-400">
                            Request:<br />
                            {`{
  "strategy": "grid_trading",
  "symbol": "BTCUSDT"
}`}
                            <br /><br />
                            Response:<br />
                            {`{
  "success": true,
  "message": "Bot started successfully"
}`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-red-500/50 text-red-400 bg-red-500/10 mb-4">
                  <Bug className="w-4 h-4 mr-2" />
                  Troubleshooting
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Xử Lý Sự Cố</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">❌ Bot không kết nối được với exchange</h3>
                        <ul className="space-y-2 ml-6 text-gray-300">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Kiểm tra API key và secret có chính xác không</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Đảm bảo API key có quyền "Enable Trading"</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Kiểm tra whitelist IP trên sàn</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Test kết nối: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">npm run test:connection</code></span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">❌ Bot bị crash liên tục</h3>
                        <ul className="space-y-2 ml-6 text-gray-300">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Kiểm tra logs: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">pm2 logs trading-bot</code></span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Kiểm tra RAM và CPU usage</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Update dependencies: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">npm update</code></span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Restart bot: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">pm2 restart trading-bot</code></span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">❌ Telegram bot không phản hồi</h3>
                        <ul className="space-y-2 ml-6 text-gray-300">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Verify bot token trong .env</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Check bot đang chạy: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">pm2 list</code></span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span>Test webhook: <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">curl https://api.telegram.org/bot{'{'}TOKEN{'}'}/getMe</code></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                <CardContent className="p-12 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <LifeBuoy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      <span className="gradient-text">Cần Hỗ Trợ?</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                      Đội ngũ kỹ thuật của chúng tôi sẵn sàng hỗ trợ 24/7. 
                      Liên hệ ngay khi gặp vấn đề hoặc cần tư vấn.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                        Liên Hệ Support
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
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Hỗ Trợ 24/7</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        <span>Free Updates</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        <span>Remote Setup</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
