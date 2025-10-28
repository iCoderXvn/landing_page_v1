import { NextRequest, NextResponse } from 'next/server';
import { topicOperations } from '@/lib/database';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Topics are publicly accessible for blog navigation
    const { searchParams } = new URL(request.url);
    const includePostCount = searchParams.get('includePostCount') === 'true';
    
    const topics = await topicOperations.getAll(includePostCount);
    const response = NextResponse.json({ success: true, topics });
    
    // Prevent caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication - only authenticated users can create topics
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const { name, description, color } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Topic name is required' },
        { status: 400 }
      );
    }

    const topicId = await topicOperations.create(
      name.trim(), 
      description?.trim(),
      color || '#3B82F6'
    );
    
    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic with this name already exists' },
        { status: 400 }
      );
    }
    
    const topic = await topicOperations.getById(Number(topicId));
    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}
