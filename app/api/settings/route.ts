import { NextRequest, NextResponse } from 'next/server';
import { settingsOperations } from '@/lib/database';
import { authenticateRequest } from '@/lib/auth';
import { clearSettingsCache } from '@/lib/settings';

// GET - Get all settings or by category
export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let settings;
    if (category) {
      settings = settingsOperations.getByCategory(category);
    } else {
      settings = settingsOperations.getAll();
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Invalid settings data' }, { status: 400 });
    }

    // Convert object to array format for setMultiple
    const settingsArray = Object.entries(settings).map(([key, value]) => ({
      key,
      value: String(value)
    }));

    settingsOperations.setMultiple(settingsArray);
    
    // Clear the cache so next request gets fresh data
    clearSettingsCache();

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
