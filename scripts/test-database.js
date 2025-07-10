// Test database operations
const { postOperations, topicOperations, userOperations } = require('../lib/database');

async function testDatabase() {
  console.log('Testing database operations...');
  
  try {
    // Test user operations
    console.log('\n=== Testing User Operations ===');
    const user = await userOperations.findByUsername('admin');
    console.log('Found admin user:', user ? 'YES' : 'NO');
    
    // Test topic operations
    console.log('\n=== Testing Topic Operations ===');
    const topics = await topicOperations.getAll();
    console.log('Topics found:', topics.length);
    topics.forEach(topic => console.log(`- ${topic.name}: ${topic.description}`));
    
    // Test post operations
    console.log('\n=== Testing Post Operations ===');
    const posts = await postOperations.getAll();
    console.log('Posts found:', posts.length);
    
    // Create a test post
    const testPost = await postOperations.create(
      'Test Post',
      'This is a test post with **bold** text and *italic* text.',
      topics[0]?.id || null,
      true
    );
    console.log('Created test post:', testPost ? 'YES' : 'NO');
    
    // Get posts again
    const updatedPosts = await postOperations.getAll();
    console.log('Posts after creation:', updatedPosts.length);
    
    console.log('\n=== Database Test Complete ===');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();
