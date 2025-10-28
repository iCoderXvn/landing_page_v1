import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Mail, Copy } from "lucide-react"

interface FooterProps {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
)

export function Footer({ siteName, siteDescription, contactEmail, facebookUrl, twitterUrl, youtubeUrl, telegramUrl }: FooterProps) {
  return (
    <footer id="contact" className="w-full border-t border-blue-500/20 bg-black/80" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/favicon.ico"
                alt={`${siteName} Logo - Automation Solutions`}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold gradient-text">{siteName}</span>
            </div>
            <p className="text-sm text-gray-400">{siteDescription}</p>
            <nav className="flex space-x-4" aria-label="Social Media Links">
              {facebookUrl && (
                <Link
                  href={facebookUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Theo dõi ${siteName} trên Facebook`}
                >
                  <Facebook className="h-6 w-6" aria-hidden="true" />
                </Link>
              )}
              {twitterUrl && (
                <Link
                  href={twitterUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Theo dõi ${siteName} trên Twitter/X`}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              )}
              {youtubeUrl && (
                <Link
                  href={youtubeUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Subscribe kênh YouTube ${siteName}`}
                >
                  <Youtube className="h-6 w-6" aria-hidden="true" />
                </Link>
              )}
              {telegramUrl && (
                <Link
                  href={telegramUrl}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 neon-glow"
                  aria-label={`Liên hệ ${siteName} qua Telegram`}
                >
                  <TelegramIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              )}
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
              {contactEmail && (
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a href={`mailto:${contactEmail}`} className="hover:text-blue-400 transition-colors">
                    {contactEmail}
                  </a>
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
              )}
              {telegramUrl && (
                <div className="flex items-center space-x-2">
                  <TelegramIcon className="h-4 w-4" aria-hidden="true" />
                  <a href={telegramUrl} className="hover:text-blue-400 transition-colors">
                    {telegramUrl.split('/').pop()}
                  </a>
                </div>
              )}
              {youtubeUrl && (
                <div className="flex items-center space-x-2">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <a href={youtubeUrl} className="hover:text-blue-400 transition-colors">
                    {youtubeUrl.split('/').pop()}
                  </a>
                </div>
              )}
            </div>
          </address>
        </div>

        <div className="mt-8 border-t border-blue-500/20 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {siteName}. Tất cả quyền được bảo lưu. Được xây dựng với ⚡ tự động hóa.
          </p>
        </div>
      </div>
    </footer>
  )
}
