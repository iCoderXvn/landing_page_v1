const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

console.log('\n=== SEO Configuration Test ===\n');

// Get all settings
const settings = db.prepare('SELECT key, value, category FROM settings ORDER BY category, key').all();

// Group by category
const grouped = settings.reduce((acc, setting) => {
  if (!acc[setting.category]) {
    acc[setting.category] = [];
  }
  acc[setting.category].push(setting);
  return acc;
}, {});

console.log('📊 Current Settings by Category:\n');

Object.keys(grouped).forEach(category => {
  console.log(`\n${category.toUpperCase()} Settings:`);
  console.log('─'.repeat(50));
  grouped[category].forEach(setting => {
    const value = setting.value || '(empty)';
    console.log(`  ${setting.key}: ${value}`);
  });
});

// Check if all required SEO fields are present
console.log('\n\n✅ SEO Configuration Check:\n');

const requiredSEOFields = [
  'site_name',
  'site_description',
  'site_url',
  'contact_email',
  'default_meta_description',
  'default_keywords',
  'google_analytics_id',
  'google_search_console'
];

const missingFields = [];
const emptyFields = [];

requiredSEOFields.forEach(field => {
  const setting = settings.find(s => s.key === field);
  if (!setting) {
    missingFields.push(field);
  } else if (!setting.value || setting.value.trim() === '') {
    emptyFields.push(field);
  }
});

if (missingFields.length > 0) {
  console.log('❌ Missing Fields:');
  missingFields.forEach(field => console.log(`   - ${field}`));
} else {
  console.log('✅ All required SEO fields exist in database');
}

if (emptyFields.length > 0) {
  console.log('\n⚠️  Empty Fields (should be filled for better SEO):');
  emptyFields.forEach(field => console.log(`   - ${field}`));
}

console.log('\n' + '='.repeat(50) + '\n');

db.close();
