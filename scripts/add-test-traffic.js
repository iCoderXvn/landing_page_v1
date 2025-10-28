const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('data/admin.db');

console.log('Adding test traffic source data...\n');

// Generate some test page views with different referrers
const testReferrers = [
  'https://www.google.com/search?q=icoderx',
  'https://www.facebook.com/iCoderXvn',
  'https://twitter.com/iCoderXvn',
  'https://www.linkedin.com/company/icoderx',
  'https://t.me/iCoderXvn',
  '', // Direct traffic
  'https://www.reddit.com/r/programming',
  'https://www.youtube.com/@iCoderX_vn'
];

const stmt = db.prepare(`
  INSERT INTO page_views (page_path, visitor_id, ip_hash, referrer, device_type, browser, os, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

for (let i = 0; i < 50; i++) {
  const referrer = testReferrers[Math.floor(Math.random() * testReferrers.length)];
  const visitorId = crypto.randomUUID();
  const ipHash = crypto.createHash('sha256').update('test-ip-' + i).digest('hex');
  
  stmt.run(
    '/',
    visitorId,
    ipHash,
    referrer,
    'desktop',
    'Chrome',
    'Windows',
    new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() // Random time in last 7 days
  );
}

console.log('✅ Added 50 test page views with various referrers');

// Show traffic sources
const sources = db.prepare(`
  SELECT 
    CASE 
      WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
      WHEN referrer LIKE '%localhost%' OR referrer LIKE '%127.0.0.1%' THEN 'Internal'
      WHEN referrer LIKE '%google%' THEN 'Google'
      WHEN referrer LIKE '%facebook%' OR referrer LIKE '%fb.%' THEN 'Facebook'
      WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
      WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
      WHEN referrer LIKE '%youtube%' THEN 'YouTube'
      WHEN referrer LIKE '%telegram%' OR referrer LIKE '%t.me%' THEN 'Telegram'
      WHEN referrer LIKE '%reddit%' THEN 'Reddit'
      ELSE 'Other'
    END as source,
    COUNT(*) as count
  FROM page_views
  WHERE created_at >= datetime('now', '-7 days')
  GROUP BY source
  ORDER BY count DESC
`).all();

console.log('\n📊 Traffic Sources (Last 7 Days):');
sources.forEach(s => {
  console.log(`  ${s.source}: ${s.count} visits`);
});

db.close();
console.log('\n✅ Done! Refresh your dashboard to see the updated traffic sources.');
