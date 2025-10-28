import { NextRequest, NextResponse } from 'next/server';
import { postOperations } from '@/lib/database';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);
    const post = postOperations.getById(postId);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if this is an admin request (has auth token)
    const auth = requireAuth(request);
    
    if (auth.isAuthenticated) {
      // Admin request - return post regardless of published status
      return NextResponse.json({ 
        success: true, 
        post 
      });
    } else {
      // Public request - only return if published
      if (post.isPublished) {
        return NextResponse.json({ 
          success: true, 
          post 
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Post not found' },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication - only authenticated users can update posts
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const body = await request.json();
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);

    const { 
      title, 
      content, 
      isPublished, 
      topicId,
      excerpt,
      metaDescription,
      keywords,
      featuredImage,
      slug,
      scheduledAt
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const updated = postOperations.update(
      postId, 
      title, 
      content, 
      isPublished, 
      topicId,
      excerpt,
      metaDescription,
      keywords,
      featuredImage,
      slug,
      scheduledAt
    );
    
    if (updated) {
      const updatedPost = postOperations.getById(postId);
      return NextResponse.json({ 
        success: true, 
        post: updatedPost 
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication - only authenticated users can delete posts
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);
    const deleted = postOperations.delete(postId);
    
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication - only authenticated users can toggle publish status
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);
    const toggled = postOperations.togglePublish(postId);
    
    if (toggled) {
      const updatedPost = postOperations.getById(postId);
      return NextResponse.json({ 
        success: true, 
        post: updatedPost 
      });
    } else {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Toggle publish error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
