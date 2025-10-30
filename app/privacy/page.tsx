import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BinaryRain } from '@/components/binary-rain'
import { BreadcrumbSchema } from '@/components/breadcrumb-schema'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserX,
  Cookie,
  Globe,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Mail,
  Server,
  FileKey,
  Trash2,
  Settings,
} from 'lucide-react'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  const settings = getSiteSettings()
  
  return {
    title: `Chính Sách Bảo Mật - Privacy Policy | ${settings.siteName}`,
    description: 'Chính sách bảo mật và quyền riêng tư của iCoderX. Cách thức thu thập, sử dụng, bảo vệ và quản lý thông tin cá nhân của khách hàng.',
    keywords: 'chính sách bảo mật, privacy policy, bảo vệ dữ liệu, quyền riêng tư, gdpr, thu thập thông tin, bảo mật thông tin, data protection',
  }
}

export default function PrivacyPage() {
  const settings = getSiteSettings()

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <BinaryRain />
      <Header siteName={settings.siteName} />

      {/* Breadcrumbs */}
      <div className="relative z-10 pt-20 bg-black/80 border-b border-blue-500/20">
        <BreadcrumbSchema
          items={[
            { name: 'Chính Sách Bảo Mật', href: '/privacy' }
          ]}
        />
      </div>

      <main className="flex-1 relative z-10" role="main">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/40" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Chính Sách Bảo Mật
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="gradient-text">Bảo Vệ Quyền Riêng Tư</span>
                <br />
                <span className="text-white">Của Bạn</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn. 
                Đọc để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
              </p>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <RefreshCw className="w-4 h-4" />
                <span>Cập nhật lần cuối: 31 Tháng 10, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. Giới Thiệu</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          <span className="text-blue-400 font-semibold">{settings.siteName}</span> ("chúng tôi", "của chúng tôi") 
                          cam kết bảo vệ quyền riêng tư của khách hàng và người dùng ("bạn", "của bạn") khi sử dụng dịch vụ của chúng tôi.
                        </p>
                        <p>
                          Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin cá nhân của bạn. 
                          Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản trong chính sách này.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">2.1. Thông Tin Cá Nhân:</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Họ tên, email, số điện thoại</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Địa chỉ liên hệ và thông tin công ty (nếu có)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Thông tin thanh toán (được xử lý qua bên thứ ba bảo mật)</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">2.2. Thông Tin Kỹ Thuật:</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Địa chỉ IP, loại trình duyệt, hệ điều hành</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Thông tin thiết bị và ID thiết bị</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Dữ liệu log và cookies</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">2.3. Thông Tin Sử Dụng:</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Cách bạn tương tác với website và dịch vụ</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Thời gian truy cập, trang đã xem</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Dữ liệu phân tích và thống kê</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">2.4. API Keys & Credentials (Chỉ Dịch Vụ Bot):</h3>
                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>API keys của sàn giao dịch (được mã hóa)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span>Token và credentials cho bot (chỉ quyền trade, không withdraw)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Cung cấp dịch vụ:</strong> Phát triển, triển khai và duy trì các bot và phần mềm theo yêu cầu</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Hỗ trợ khách hàng:</strong> Giải đáp thắc mắc, xử lý vấn đề kỹ thuật</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Thanh toán:</strong> Xử lý giao dịch và hóa đơn</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Cải thiện dịch vụ:</strong> Phân tích, tối ưu hóa và phát triển tính năng mới</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Marketing:</strong> Gửi thông tin về sản phẩm, dịch vụ mới (có thể hủy đăng ký)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Bảo mật:</strong> Phát hiện và ngăn chặn gian lận, lạm dụng</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Tuân thủ pháp luật:</strong> Đáp ứng yêu cầu pháp lý khi cần thiết</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">4. Bảo Mật Dữ Liệu</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của bạn:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Mã hóa SSL/TLS:</strong> Tất cả dữ liệu truyền tải được mã hóa</span>
                          </li>
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Mã hóa Database:</strong> API keys và thông tin nhạy cảm được mã hóa AES-256</span>
                          </li>
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Giới hạn truy cập:</strong> Chỉ nhân viên được ủy quyền mới có quyền truy cập</span>
                          </li>
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Firewall & Anti-DDoS:</strong> Bảo vệ chống tấn công mạng</span>
                          </li>
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Backup định kỳ:</strong> Sao lưu dữ liệu thường xuyên và an toàn</span>
                          </li>
                          <li className="flex items-start">
                            <Lock className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Audit log:</strong> Theo dõi và ghi nhận mọi hoạt động truy cập</span>
                          </li>
                        </ul>
                        <div className="mt-6 p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5">
                          <p className="flex items-start">
                            <AlertTriangle className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="text-sm">
                              <strong className="text-white">Lưu ý:</strong> Mặc dù chúng tôi áp dụng các biện pháp bảo mật tốt nhất, 
                              không có hệ thống nào an toàn 100%. Bạn cũng có trách nhiệm bảo vệ thông tin đăng nhập của mình.
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
        </section>

        {/* Data Sharing */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">5. Chia Sẻ Thông Tin</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi <strong className="text-white">KHÔNG</strong> bán hoặc cho thuê thông tin cá nhân của bạn.</p>
                        <p>Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Với sự đồng ý:</strong> Khi bạn cho phép rõ ràng</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Nhà cung cấp dịch vụ:</strong> Hosting, payment gateway (tuân thủ nghiêm ngặt bảo mật)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Yêu cầu pháp lý:</strong> Khi bắt buộc bởi pháp luật hoặc lệnh tòa án</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Bảo vệ quyền lợi:</strong> Để ngăn chặn gian lận hoặc vi phạm</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">6. Cookies & Công Nghệ Theo Dõi</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi sử dụng cookies và công nghệ tương tự để:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Essential cookies:</strong> Đảm bảo website hoạt động bình thường</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Analytics cookies:</strong> Hiểu cách người dùng tương tác với website</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Preference cookies:</strong> Ghi nhớ cài đặt và tùy chọn của bạn</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Marketing cookies:</strong> Cá nhân hóa quảng cáo và nội dung</span>
                          </li>
                        </ul>
                        <p className="mt-4">
                          Bạn có thể quản lý cookies thông qua cài đặt trình duyệt. Lưu ý rằng việc vô hiệu hóa cookies 
                          có thể ảnh hưởng đến trải nghiệm sử dụng website.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">7. Lưu Trữ Dữ Liệu</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Chúng tôi lưu trữ thông tin của bạn trong các khoảng thời gian sau:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Thông tin tài khoản:</strong> Cho đến khi bạn yêu cầu xóa hoặc đóng tài khoản</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Dữ liệu giao dịch:</strong> 7 năm (theo yêu cầu pháp lý về thuế và kế toán)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Dữ liệu marketing:</strong> Cho đến khi bạn hủy đăng ký</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Log & Analytics:</strong> 12 tháng</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">API Keys:</strong> Chỉ trong thời gian sử dụng dịch vụ, có thể xóa bất kỳ lúc nào</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <FileKey className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">8. Quyền Của Bạn</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Bạn có các quyền sau đối với dữ liệu cá nhân của mình:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <Eye className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền truy cập:</strong> Xem thông tin chúng tôi lưu trữ về bạn</span>
                          </li>
                          <li className="flex items-start">
                            <Settings className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền chỉnh sửa:</strong> Cập nhật hoặc sửa thông tin không chính xác</span>
                          </li>
                          <li className="flex items-start">
                            <Trash2 className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền xóa:</strong> Yêu cầu xóa dữ liệu cá nhân (với một số ngoại lệ pháp lý)</span>
                          </li>
                          <li className="flex items-start">
                            <UserX className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền hạn chế:</strong> Giới hạn cách chúng tôi sử dụng dữ liệu của bạn</span>
                          </li>
                          <li className="flex items-start">
                            <FileKey className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền di chuyển:</strong> Nhận bản sao dữ liệu ở định dạng có thể đọc được</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                            <span><strong className="text-white">Quyền phản đối:</strong> Phản đối việc xử lý dữ liệu cho mục đích marketing</span>
                          </li>
                        </ul>
                        <p className="mt-6">
                          Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email{' '}
                          <a href={`mailto:${settings.contactEmail}`} className="text-blue-400 hover:text-blue-300 underline">
                            {settings.contactEmail}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">9. Dịch Vụ Bên Thứ Ba</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>Website của chúng tôi có thể chứa liên kết đến các trang web bên thứ ba:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Sàn giao dịch crypto (Binance, Bybit, OKX, v.v.)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Mạng xã hội (Facebook, Twitter, Telegram, Youtube)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Payment gateways và xử lý thanh toán</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span>Công cụ phân tích (Google Analytics, v.v.)</span>
                          </li>
                        </ul>
                        <div className="mt-6 p-4 border border-purple-500/30 rounded-lg bg-purple-500/5">
                          <p className="flex items-start">
                            <AlertTriangle className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0 mt-1" />
                            <span className="text-sm">
                              <strong className="text-white">Lưu ý quan trọng:</strong> Chúng tôi không chịu trách nhiệm về chính sách 
                              bảo mật của các trang web bên thứ ba. Vui lòng đọc chính sách bảo mật của họ trước khi cung cấp thông tin.
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
        </section>

        {/* Children's Privacy */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">10. Quyền Riêng Tư Của Trẻ Em</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Dịch vụ của chúng tôi không dành cho người dưới 18 tuổi. Chúng tôi không cố ý thu thập 
                          thông tin cá nhân từ trẻ em dưới 18 tuổi.
                        </p>
                        <p>
                          Nếu bạn là phụ huynh hoặc người giám hộ và phát hiện con bạn đã cung cấp thông tin cá nhân 
                          cho chúng tôi, vui lòng liên hệ ngay để chúng tôi xóa thông tin đó.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">11. Thay Đổi Chính Sách</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được 
                          đăng tải trên trang này với ngày "Cập nhật lần cuối" được cập nhật.
                        </p>
                        <p>
                          Đối với những thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc thông báo nổi bật 
                          trên website trước khi thay đổi có hiệu lực.
                        </p>
                        <p>
                          Chúng tôi khuyến khích bạn xem lại chính sách này định kỳ để cập nhật về cách chúng tôi 
                          bảo vệ thông tin của bạn.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">12. Liên Hệ</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu nào về chính sách bảo mật này 
                          hoặc cách chúng tôi xử lý dữ liệu cá nhân của bạn, vui lòng liên hệ:
                        </p>
                        <div className="space-y-3 ml-6">
                          <p className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-blue-400" />
                            <span>Email: <a href={`mailto:${settings.contactEmail}`} className="text-blue-400 hover:text-blue-300 underline">{settings.contactEmail}</a></span>
                          </p>
                          <p className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-blue-400" />
                            <span>Telegram: <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">@iCoderX</a></span>
                          </p>
                          <p className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-blue-400" />
                            <span>Trang liên hệ: <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">iCoderX.com/contact</Link></span>
                          </p>
                        </div>
                        <p className="mt-6">
                          Chúng tôi cam kết phản hồi trong vòng 48 giờ làm việc.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="cyber-border bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
                <CardContent className="p-12 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      <span className="gradient-text">Bảo Mật Là Ưu Tiên Hàng Đầu</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                      Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu của bạn với các biện pháp bảo mật cao nhất
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Link href="/contact" className="cyber-button text-black font-semibold px-8 py-4 text-lg inline-flex items-center justify-center rounded-md">
                        Liên Hệ Bảo Mật
                      </Link>
                      <Link
                        href="/terms"
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-4 text-lg bg-transparent border-2 rounded-md inline-flex items-center justify-center"
                      >
                        Xem Điều Khoản
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <Lock className="w-5 h-5 text-green-400" />
                        <span>Mã Hóa SSL/TLS</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span>GDPR Compliant</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        <span>Không Chia Sẻ Dữ Liệu</span>
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
