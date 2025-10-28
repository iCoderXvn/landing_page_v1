const Database = require('better-sqlite3');
const db = new Database('data/admin.db');

const sources = db.prepare(`
  SELECT 
    CASE 
      WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
      WHEN referrer LIKE '%localhost%' OR referrer LIKE '%127.0.0.1%' THEN 'Internal'
      WHEN referrer LIKE '%google%' THEN 'Google'
      WHEN referrer LIKE '%facebook%' OR referrer LIKE '%fb.%' THEN 'Facebook'
      WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
      WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
      ELSE 'Other'
    END as source,
    COUNT(*) as count
  FROM page_views
  WHERE created_at >= datetime('now', '-7 days')
  GROUP BY source
  ORDER BY count DESC
`).all();

console.log('Traffic Sources (Last 7 Days):');
console.log(JSON.stringify(sources, null, 2));

db.close();
