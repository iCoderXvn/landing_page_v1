const { generatePageMetadata } = require('./lib/settings');

async function testPrivacyPage() {
  try {
    console.log('Testing privacy page SEO settings...');
    
    const metadata = await generatePageMetadata('/privacy');
    
    console.log('Generated metadata for /privacy:');
    console.log('Title:', metadata.title);
    console.log('Description:', metadata.description);
    console.log('Canonical URL:', metadata.alternates?.canonical);
    
    // Check if custom description is loaded
    if (metadata.description === 'test') {
      console.log('✅ SUCCESS: Custom SEO settings are working! Description shows "test"');
    } else {
      console.log('❌ FAILURE: Custom SEO settings not loaded. Description is:', metadata.description);
    }
    
  } catch (error) {
    console.error('Error testing privacy page:', error);
  }
}

testPrivacyPage();