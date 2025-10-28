const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

console.log('\n=== Checking SEO Settings ===\n');

const seoSettings = db.prepare('SELECT key, value FROM settings WHERE category = ?').all('seo');

seoSettings.forEach(setting => {
  console.log(`\n${setting.key}:`);
  console.log(setting.value);
  console.log('---');
});

const metaDesc = db.prepare('SELECT value FROM settings WHERE key = ?').get('default_meta_description');
const keywords = db.prepare('SELECT value FROM settings WHERE key = ?').get('default_keywords');

console.log('\n=== Summary ===');
console.log('Default Meta Description:', metaDesc?.value ? 'SET' : 'NOT SET');
console.log('Default Keywords:', keywords?.value ? 'SET' : 'NOT SET');

db.close();
