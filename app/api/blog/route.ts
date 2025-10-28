import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    
    let posts;
    
    switch (category) {
      case 'newest':
        posts = postOperations.getNewest(limit ? parseInt(limit) : undefined);
        break;
      case 'most-visited':
        posts = postOperations.getMostVisited(limit ? parseInt(limit) : undefined);
        break;
      default:
        posts = postOperations.getPublished();
        break;
    }
    
    const response = NextResponse.json({ posts });
    
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
