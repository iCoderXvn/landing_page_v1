import { NextRequest, NextResponse } from 'next/server';
import { topicOperations } from '@/lib/database';
import { requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication for topic access
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid topic ID' },
        { status: 400 }
      );
    }

    const topic = await topicOperations.getById(id);
    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication - only authenticated users can update topics
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid topic ID' },
        { status: 400 }
      );
    }

    const { name, description } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Topic name is required' },
        { status: 400 }
      );
    }

    const topic = await topicOperations.update(id, name.trim(), description?.trim());
    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication - only authenticated users can delete topics
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid topic ID' },
        { status: 400 }
      );
    }

    // Check if topic has posts and warn user
    const postCount = await topicOperations.getPostsCount(id);
    let message = 'Topic deleted successfully';
    if (postCount > 0) {
      message = `Topic deleted successfully. ${postCount} posts were unassigned from this topic.`;
    }

    const deleted = await topicOperations.delete(id);
    if (deleted) {
      return NextResponse.json({ success: true, message });
    } else {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
