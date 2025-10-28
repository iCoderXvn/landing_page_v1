import { settingsOperations } from './database';

export interface SiteSettings {
  // Site Information
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  hotline: string;
  
  // SEO
  defaultMetaDescription: string;
  defaultKeywords: string;
  googleAnalyticsId: string;
  googleSearchConsole: string;
  
  // Social Media
  twitterUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  
  // Content
  postsPerPage: number;
  enableComments: boolean;
  allowGuestPosts: boolean;
  
  // System
  maintenanceMode: boolean;
  dateFormat: string;
  timezone: string;
}

// In-memory cache for settings
let settingsCache: SiteSettings | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 60000; // 1 minute cache

/**
 * Clear the settings cache (call this when settings are updated)
 */
export function clearSettingsCache(): void {
  settingsCache = null;
  cacheTimestamp = 0;
}

/**
 * Fetch all settings from database and return as structured object
 * Uses in-memory cache to improve performance
 */
export function getSiteSettings(useCache: boolean = true): SiteSettings {
  // Return cached settings if available and not expired
  const now = Date.now();
  if (useCache && settingsCache && (now - cacheTimestamp) < CACHE_TTL) {
    return settingsCache;
  }
  const settings = settingsOperations.getAll() as Array<{ key: string; value: string; category: string }>;
  
  const settingsMap = new Map(settings.map(s => [s.key, s.value]));
  
  const siteSettings: SiteSettings = {
    // Site Information
    siteName: settingsMap.get('site_name') || 'iCoderX',
    siteTitle: settingsMap.get('site_title') || 'iCoderX - Bot Trading & Tự Động Hóa Chuyên Nghiệp',
    siteDescription: settingsMap.get('site_description') || 'Xây dựng tương lai với tự động hóa. Từng bot một.',
    siteUrl: settingsMap.get('site_url') || 'https://icoderx.vn',
    contactEmail: settingsMap.get('contact_email') || 'admin@icoderx.vn',
    hotline: settingsMap.get('hotline') || '+84 123 456 789',
    
    // SEO
    defaultMetaDescription: settingsMap.get('default_meta_description') || 'Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI. Dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa, RPA. Thuê code tool auto, bot web scraping, tool auto click. 100+ dự án thành công.',
    defaultKeywords: settingsMap.get('default_keywords') || 'lập trình bot, code bot theo yêu cầu, viết bot web tự động, bot web auto, bot thao tác web, viết bot Facebook, viết bot Telegram, viết bot AI, dịch vụ viết bot, thuê viết bot, thuê người code bot, thuê code tool auto, code tool MMO, tool spam, tool tự động hóa, tool auto click, tool auto scroll, tool auto web, tool fill form tự động, phần mềm auto, phần mềm tự động hóa, phần mềm thao tác web, tool MMO auto, tool kiếm tiền online, dịch vụ viết tool MMO, viết tool auto game, bot auto đăng ký tài khoản, bot đăng nhập website, bot tự động crawl dữ liệu, bot web scraping, tool automation trình duyệt, automation web bằng Puppeteer, automation web bằng Selenium, tool auto captcha, code auto đăng bài Facebook, tool auto comment YouTube, tool tương tác TikTok, tool tăng lượt like Facebook, bot seeding TikTok, code bot Instagram, dịch vụ lập trình theo yêu cầu, code phần mềm theo yêu cầu, phần mềm tùy chỉnh, phần mềm automation theo ngành, RPA robotic process automation, lập trình bot thao tác chuột, lập trình auto click chuột, tool auto thao tác chuột và bàn phím, auto thao tác nhiều tab trình duyệt, tool đa luồng, tool chạy nền, tool giả lập Android, viết bot tự động hóa quy trình doanh nghiệp, bot AI tùy chỉnh GPT, tích hợp API automation, tool lấy dữ liệu sản phẩm Shopee, tool kiểm tra đơn hàng tự động, tool auto báo cáo, lập trình bot AI học sinh, tool chấm điểm tự động, công cụ tự động hóa giáo dục, bot Telegram xử lý yêu cầu khách hàng, bot chăm sóc khách hàng tự động, tool hỗ trợ làm việc nhóm, tool đồng bộ dữ liệu, tool crawl dữ liệu đối thủ, tool báo cáo giá thị trường, bot giao dịch crypto tự động, crypto trading bot, dịch vụ viết bot crypto, dịch vụ lập trình bot MMO, bot auto đăng ký tài khoản email, tool tạo tài khoản hàng loạt, bot tự động hoàn thành captcha, tool auto submit form, dịch vụ tạo tool automation theo yêu cầu, giải pháp tự động hóa phần mềm, thiết kế hệ thống bot chuyên dụng, tool giám sát hệ thống, viết bot AI với ChatGPT hoặc GPT-4, lập trình phần mềm hỗ trợ MMO, tool auto SEO, phần mềm auto marketing Facebook TikTok',
    googleAnalyticsId: settingsMap.get('google_analytics_id') || '',
    googleSearchConsole: settingsMap.get('google_search_console') || '',
    
    // Social Media
    twitterUrl: settingsMap.get('twitter_url') || 'https://x.com/iCoderXvn',
    facebookUrl: settingsMap.get('facebook_url') || 'https://www.facebook.com/iCoderXvn',
    linkedinUrl: settingsMap.get('linkedin_url') || '',
    githubUrl: settingsMap.get('github_url') || 'https://github.com/iCoderXvn',
    youtubeUrl: settingsMap.get('youtube_url') || 'https://www.youtube.com/@iCoderX_vn',
    telegramUrl: settingsMap.get('telegram_url') || 'https://t.me/iCoderXvn',
    
    // Content
    postsPerPage: parseInt(settingsMap.get('posts_per_page') || '10'),
    enableComments: settingsMap.get('enable_comments') === 'true',
    allowGuestPosts: settingsMap.get('allow_guest_posts') === 'true',
    
    // System
    maintenanceMode: settingsMap.get('maintenance_mode') === 'true',
    dateFormat: settingsMap.get('date_format') || 'MMM dd, yyyy',
    timezone: settingsMap.get('timezone') || 'UTC',
  };
  
  // Cache the settings
  if (useCache) {
    settingsCache = siteSettings;
    cacheTimestamp = now;
  }
  
  return siteSettings;
}

/**
 * Get a single setting value
 */
export function getSetting(key: string, defaultValue: string = ''): string {
  return settingsOperations.get(key) || defaultValue;
}
