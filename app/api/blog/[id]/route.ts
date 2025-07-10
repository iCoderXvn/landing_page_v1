import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);
    const post = postOperations.getById(postId);
    
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
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Get public post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
