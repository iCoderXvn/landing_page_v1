import { NextRequest, NextResponse } from 'next/server';
import { analyticsOperations } from '@/lib/database';
import crypto from 'crypto';

// Helper function to get country from request headers
function getCountryFromHeaders(headers: Headers): string {
  // Try to get country from CF-IPCountry header (Cloudflare)
  const cfCountry = headers.get('cf-ipcountry');
  if (cfCountry && cfCountry !== 'XX') {
    return cfCountry;
  }

  // Try to get country from X-Country header (some CDNs)
  const xCountry = headers.get('x-country');
  if (xCountry) {
    return xCountry;
  }

  // Try to determine from Accept-Language header
  const acceptLanguage = headers.get('accept-language');
  if (acceptLanguage) {
    if (acceptLanguage.includes('vi-VN') || acceptLanguage.includes('vi')) {
      return 'Vietnam';
    }
    if (acceptLanguage.includes('en-US')) {
      return 'United States';
    }
    if (acceptLanguage.includes('en-GB')) {
      return 'United Kingdom';
    }
  }

  // Default to Vietnam for Vietnamese website
  return 'Vietnam';
}

// Helper function to hash IP address
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT || 'default-salt').digest('hex');
}

// Helper function to parse user agent
function parseUserAgent(ua: string) {
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  
  let deviceType = 'desktop';
  if (isTablet) deviceType = 'tablet';
  else if (isMobile) deviceType = 'mobile';

  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { deviceType, browser, os };
}

// POST - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagePath, postId } = body;

    // Get visitor ID from cookie or generate new one
    const cookieVisitorId = request.cookies.get('visitor_id')?.value;
    const visitorId = cookieVisitorId || crypto.randomUUID();

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const ipHash = hashIP(ip);

    // Parse user agent
    const userAgent = request.headers.get('user-agent') || '';
    const { deviceType, browser, os } = parseUserAgent(userAgent);

    // Get referrer
    const referrer = request.headers.get('referer') || '';

    // Get country from headers
    const country = getCountryFromHeaders(request.headers);

    // Track page view
    analyticsOperations.trackPageView({
      pagePath,
      postId,
      visitorId,
      ipHash,
      userAgent,
      referrer,
      deviceType,
      browser,
      os,
      country
    });

    // Update visitor session
    analyticsOperations.upsertVisitorSession({
      visitorId,
      ipHash,
      deviceType,
      browser,
      os
    });

    // Create response
    const response = NextResponse.json({ success: true });

    // Set visitor ID cookie if it's a new visitor
    if (!cookieVisitorId) {
      response.cookies.set('visitor_id', visitorId, {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        httpOnly: true,
        sameSite: 'lax'
      });
    }

    return response;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 });
  }
}

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const period = (searchParams.get('period') || 'week') as 'day' | 'week' | 'month' | 'year';
    const limit = parseInt(searchParams.get('limit') || '10');

    let data;

    switch (type) {
      case 'dashboard':
        data = analyticsOperations.getDashboardStats(period);
        break;
      
      case 'views-over-time':
        const groupBy = searchParams.get('groupBy') as 'hour' | 'day' | 'week' | 'month' || 'day';
        data = analyticsOperations.getViewsOverTime(period, groupBy);
        break;
      
      case 'top-posts':
        data = analyticsOperations.getTopPosts(limit, period);
        break;
      
      case 'traffic-sources':
        const sources = analyticsOperations.getTrafficSources(period) as any[];
        const totalSources = sources.reduce((sum, s) => sum + s.count, 0);
        data = sources.map(s => ({
          source: s.source,
          visits: s.count,
          percentage: totalSources > 0 ? Math.round((s.count / totalSources) * 100) : 0
        }));
        break;
      
      case 'device-stats':
        const devices = analyticsOperations.getDeviceStats(period) as any[];
        const totalDevices = devices.reduce((sum, d) => sum + d.count, 0);
        data = devices.map(d => ({
          device: d.device_type || 'unknown',
          count: d.count,
          percentage: totalDevices > 0 ? Math.round((d.count / totalDevices) * 100) : 0
        }));
        break;
      
      case 'browser-stats':
        const browsers = analyticsOperations.getBrowserStats(period) as any[];
        const totalBrowsers = browsers.reduce((sum, b) => sum + b.count, 0);
        data = browsers.map(b => ({
          browser: b.browser || 'Unknown',
          count: b.count,
          percentage: totalBrowsers > 0 ? Math.round((b.count / totalBrowsers) * 100) : 0
        }));
        break;
      
      case 'recent-activity':
        data = analyticsOperations.getRecentActivity(limit);
        break;
      
      case 'active-visitors':
        data = { count: analyticsOperations.getActiveVisitors() };
        break;
      
      case 'live-stats':
        data = analyticsOperations.getLiveStats();
        break;
      
      case 'top-referrers':
        data = analyticsOperations.getTopReferrers(limit, period);
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
