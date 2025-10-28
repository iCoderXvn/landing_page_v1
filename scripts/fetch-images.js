#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Usage:
// node scripts/fetch-images.js --slug=<post-slug>
// or
// node scripts/fetch-images.js --id=<post-id>

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  args.forEach(a => {
    if (a.startsWith('--slug=')) out.slug = a.split('=')[1];
    if (a.startsWith('--id=')) out.id = parseInt(a.split('=')[1], 10);
  });
  return out;
}

async function fetchAndSave(url, destPath) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(destPath, buffer);
}

async function main() {
  const args = parseArgs();
  if (!args.slug && !args.id) {
    console.error('Please provide --slug=<post-slug> or --id=<post-id>');
    process.exit(1);
  }

  const dbPath = path.join(process.cwd(), 'data', 'admin.db');
  if (!fs.existsSync(dbPath)) {
    console.error('Database not found at', dbPath);
    process.exit(1);
  }

  const db = new Database(dbPath, { readonly: false });

  let post;
  if (args.slug) {
    post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(args.slug);
  } else {
    post = db.prepare('SELECT * FROM posts WHERE id = ?').get(args.id);
  }

  if (!post) {
    console.error('Post not found');
    process.exit(1);
  }

  const content = post.content || '';

  // Find markdown image links: ![alt](https://...)
  const imgRegex = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  const matches = [...content.matchAll(imgRegex)];
  if (matches.length === 0) {
    console.log('No remote markdown image links found in post content.');
    process.exit(0);
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  let newContent = content;
  let idx = 1;
  for (const m of matches) {
    const url = m[1];
    try {
      const parsed = new URL(url);
      // Determine extension
      let ext = path.extname(parsed.pathname).split('?')[0];
      if (!ext) {
        // Try to fetch head to determine content-type
        try {
          const head = await fetch(url, { method: 'HEAD', redirect: 'follow' });
          const ct = head.headers.get('content-type') || '';
          if (ct.includes('png')) ext = '.png';
          else if (ct.includes('jpeg') || ct.includes('jpg')) ext = '.jpg';
          else if (ct.includes('gif')) ext = '.gif';
          else ext = '.bin';
        } catch (e) {
          ext = '.bin';
        }
      }

      const filename = `${post.slug || post.id}-${Date.now()}-${idx}${ext}`;
      const destPath = path.join(uploadsDir, filename);
      console.log(`Downloading ${url} -> /public/uploads/${filename}`);
      await fetchAndSave(url, destPath);

      // Replace URL in markdown content with local path
      const localUrl = `/uploads/${filename}`;
      newContent = newContent.split(url).join(localUrl);
      idx++;
    } catch (err) {
      console.error(`Failed to fetch ${url}:`, err.message || err);
    }
  }

  // Update database
  try {
    db.prepare('UPDATE posts SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newContent, post.id);
    console.log('Post content updated. Images saved to public/uploads and content rewritten.');
  } catch (err) {
    console.error('Failed to update post in database:', err.message || err);
    process.exit(1);
  }

  db.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
