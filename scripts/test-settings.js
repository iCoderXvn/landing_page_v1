const Database = require('better-sqlite3');
const path = require('path');

// Connect to database
const dbPath = path.join(__dirname, '..', 'data', 'admin.db');
const db = new Database(dbPath);

console.log('=== Testing Settings from Database ===\n');

try {
  // Get all settings
  const settings = db.prepare('SELECT key, value FROM settings').all();
  
  console.log('All Settings:');
  settings.forEach(setting => {
    console.log(`  ${setting.key}: ${setting.value}`);
  });
  
  console.log('\n=== Key Settings ===');
  const siteName = settings.find(s => s.key === 'site_name');
  const siteDescription = settings.find(s => s.key === 'site_description');
  const contactEmail = settings.find(s => s.key === 'contact_email');
  
  console.log(`Site Name: ${siteName?.value || 'NOT SET'}`);
  console.log(`Site Description: ${siteDescription?.value || 'NOT SET'}`);
  console.log(`Contact Email: ${contactEmail?.value || 'NOT SET'}`);
  
  console.log('\n✅ Database connection successful!');
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
}
