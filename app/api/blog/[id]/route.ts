import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    let post;
    
    // Check if id is a number (old ID-based routing) or a string (new slug-based routing)
    if (/^\d+$/.test(id)) {
      // Numeric ID - get by ID and increment view count
      const postId = parseInt(id);
      post = postOperations.getById(postId);
      if (post && post.isPublished) {
        postOperations.incrementViewCount(postId);
      }
    } else {
      // String slug - get by slug and increment view count
      post = postOperations.getBySlug(id);
      if (post && post.isPublished) {
        postOperations.incrementViewCount(post.id);
      }
    }
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Only return published posts for public viewing
    if (!post.isPublished) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ post });
    
    // Prevent caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Get public post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
