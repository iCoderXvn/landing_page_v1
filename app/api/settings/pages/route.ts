import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const PAGE_SEO_FILE = path.join(process.cwd(), 'data', 'page-seo.json');

interface PageSEO {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  priority: string;
  changefreq: string;
  noindex: boolean;
  nofollow: boolean;
}

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load page SEO data
function loadPageSEOData(): PageSEO[] {
  ensureDataDirectory();
  try {
    if (fs.existsSync(PAGE_SEO_FILE)) {
      const data = fs.readFileSync(PAGE_SEO_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading page SEO data:', error);
  }
  return [];
}

// Save page SEO data
function savePageSEOData(pages: PageSEO[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(PAGE_SEO_FILE, JSON.stringify(pages, null, 2));
  } catch (error) {
    console.error('Error saving page SEO data:', error);
    throw new Error('Failed to save page SEO data');
  }
}

// GET - Get all page SEO configurations
export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pages = loadPageSEOData();
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error('Error fetching page SEO data:', error);
    return NextResponse.json({ error: 'Failed to fetch page SEO data' }, { status: 500 });
  }
}

// POST - Create or update page SEO configuration
export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { pageSEO } = body;

    if (!pageSEO || typeof pageSEO !== 'object') {
      return NextResponse.json({ error: 'Invalid page SEO data' }, { status: 400 });
    }

    const pages = loadPageSEOData();
    const existingIndex = pages.findIndex(p => p.id === pageSEO.id);

    if (existingIndex >= 0) {
      pages[existingIndex] = pageSEO;
    } else {
      pages.push(pageSEO);
    }

    savePageSEOData(pages);

    return NextResponse.json({ success: true, message: 'Page SEO saved successfully' });
  } catch (error) {
    console.error('Error saving page SEO:', error);
    return NextResponse.json({ error: 'Failed to save page SEO' }, { status: 500 });
  }
}