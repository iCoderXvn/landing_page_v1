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

// Load page SEO data
function loadPageSEOData(): PageSEO[] {
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
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  try {
    fs.writeFileSync(PAGE_SEO_FILE, JSON.stringify(pages, null, 2));
  } catch (error) {
    console.error('Error saving page SEO data:', error);
    throw new Error('Failed to save page SEO data');
  }
}

// DELETE - Delete page SEO configuration
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const pages = loadPageSEOData();
    const filteredPages = pages.filter(p => p.id !== id);

    if (filteredPages.length === pages.length) {
      return NextResponse.json({ error: 'Page SEO not found' }, { status: 404 });
    }

    savePageSEOData(filteredPages);

    return NextResponse.json({ success: true, message: 'Page SEO deleted successfully' });
  } catch (error) {
    console.error('Error deleting page SEO:', error);
    return NextResponse.json({ error: 'Failed to delete page SEO' }, { status: 500 });
  }
}