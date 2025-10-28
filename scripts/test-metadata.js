const { getSiteSettings, clearSettingsCache } = require('../lib/settings');

console.log('\n=== Testing Metadata Generation ===\n');

// Clear cache first
clearSettingsCache();

// Get fresh settings
const settings = getSiteSettings(false);

console.log('Site Name:', settings.siteName);
console.log('\nDefault Meta Description:');
console.log(settings.defaultMetaDescription);
console.log('\nDefault Keywords (first 200 chars):');
console.log(settings.defaultKeywords.substring(0, 200) + '...');
console.log('\nTotal Keywords Length:', settings.defaultKeywords.length);
