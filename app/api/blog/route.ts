import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';

export async function GET() {
  try {
    const publishedPosts = postOperations.getPublished();
    
    const response = NextResponse.json({ posts: publishedPosts });
    
    // Prevent caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Get public posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
