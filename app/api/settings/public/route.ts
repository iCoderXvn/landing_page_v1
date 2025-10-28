import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = getSiteSettings();
    
    // Return settings for public use (exclude sensitive data)
    const publicSettings = {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      siteUrl: settings.siteUrl,
      contactEmail: settings.contactEmail,
      twitterUrl: settings.twitterUrl,
      facebookUrl: settings.facebookUrl,
      linkedinUrl: settings.linkedinUrl,
      githubUrl: settings.githubUrl,
      youtubeUrl: settings.youtubeUrl,
      telegramUrl: settings.telegramUrl,
      postsPerPage: settings.postsPerPage,
      enableComments: settings.enableComments,
    };

    return NextResponse.json({ success: true, settings: publicSettings });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
