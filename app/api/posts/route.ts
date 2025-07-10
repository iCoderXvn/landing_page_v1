import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check if this is an admin request (has auth token)
    const auth = requireAuth(request);
    
    if (auth.isAuthenticated) {
      // Admin request - return all posts (including drafts)
      const posts = postOperations.getAll();
      return NextResponse.json({ 
        success: true, 
        posts 
      });
    } else {
      // Public request - return only published posts
      const posts = postOperations.getAll().filter(post => post.isPublished);
      return NextResponse.json({ 
        success: true, 
        posts 
      });
    }
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication - only authenticated users can create posts
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const { title, content, isPublished = true, topicId } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const postId = postOperations.create(title, content, isPublished, topicId);
    const newPost = postOperations.getById(Number(postId));

    return NextResponse.json({ 
      success: true, 
      post: newPost 
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
