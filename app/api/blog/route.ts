import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';

export async function GET() {
  try {
    const publishedPosts = postOperations.getPublished();
    
    return NextResponse.json({ posts: publishedPosts });
  } catch (error) {
    console.error('Get public posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
