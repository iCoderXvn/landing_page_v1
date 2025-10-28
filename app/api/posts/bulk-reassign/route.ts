import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { postOperations } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const { fromTopicId, toTopicId } = await request.json();

    if (!fromTopicId || !toTopicId) {
      return NextResponse.json(
        { success: false, error: 'Both fromTopicId and toTopicId are required' },
        { status: 400 }
      );
    }

    if (fromTopicId === toTopicId) {
      return NextResponse.json(
        { success: false, error: 'Source and target topics must be different' },
        { status: 400 }
      );
    }

    const count = await postOperations.bulkReassignTopic(
      parseInt(fromTopicId),
      parseInt(toTopicId)
    );

    return NextResponse.json({ 
      success: true, 
      count,
      message: `Successfully reassigned ${count} post(s)`
    });
  } catch (error) {
    console.error('Error reassigning posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reassign posts' },
      { status: 500 }
    );
  }
}
