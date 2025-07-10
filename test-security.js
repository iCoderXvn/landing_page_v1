// Test script to verify API security
// Run with: node test-security.js (make sure the dev server is running)

const BASE_URL = 'http://localhost:3000';

// Test data
const testPost = {
  title: 'Security Test Post',
  content: 'This is a test post to verify security implementation.',
  isPublished: false // Draft post to test admin vs public access
};

const testTopic = {
  name: 'Security Test Topic',
  description: 'Test topic for security verification'
};

// Login credentials (default admin account)
const loginCredentials = {
  username: 'admin',
  password: 'admin123'
};

async function testPublicEndpoints() {
  console.log('\n=== Testing Public Endpoints (no auth) ===');
  
  try {
    // Test GET posts (should work - public published posts)
    const postsResponse = await fetch(`${BASE_URL}/api/posts`);
    const postsData = await postsResponse.json();
    console.log('GET /api/posts (public):', postsResponse.status, postsData.success ? 'SUCCESS' : 'FAILED');
    
    // Test GET topics (should work - public topics)
    const topicsResponse = await fetch(`${BASE_URL}/api/topics`);
    const topicsData = await topicsResponse.json();
    console.log('GET /api/topics (public):', topicsResponse.status, topicsData.success ? 'SUCCESS' : 'FAILED');
    
  } catch (error) {
    console.error('Error testing public endpoints:', error);
  }
}

async function testUnauthenticatedWrite() {
  console.log('\n=== Testing Write Operations (no auth - should fail) ===');
  
  try {
    // Test POST posts (should fail)
    const postResponse = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPost)
    });
    console.log('POST /api/posts (no auth):', postResponse.status, postResponse.status === 401 ? 'CORRECTLY BLOCKED' : 'SECURITY ISSUE');
    
    // Test POST topics (should fail)
    const topicResponse = await fetch(`${BASE_URL}/api/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testTopic)
    });
    console.log('POST /api/topics (no auth):', topicResponse.status, topicResponse.status === 401 ? 'CORRECTLY BLOCKED' : 'SECURITY ISSUE');
    
  } catch (error) {
    console.error('Error testing unauthenticated writes:', error);
  }
}

async function testAuthenticatedOperations() {
  console.log('\n=== Testing Authenticated Operations ===');
  
  try {
    // First, login to get token
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginCredentials)
    });
    
    if (loginResponse.status !== 200) {
      console.log('Login failed:', loginResponse.status);
      return;
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('Login successful, token received');
    
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    // Test authenticated POST posts (should work)
    const postResponse = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(testPost)
    });
    const postData = await postResponse.json();
    console.log('POST /api/posts (with auth):', postResponse.status, postData.success ? 'SUCCESS' : 'FAILED');
    
    // Test authenticated POST topics (should work)
    const topicResponse = await fetch(`${BASE_URL}/api/topics`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(testTopic)
    });
    const topicData = await topicResponse.json();
    console.log('POST /api/topics (with auth):', topicResponse.status, topicData.success ? 'SUCCESS' : 'FAILED');
    
    // If post was created, test authenticated GET (should include unpublished)
    if (postData.success) {
      const postsResponse = await fetch(`${BASE_URL}/api/posts`, {
        headers: authHeaders
      });
      const postsListData = await postsResponse.json();
      console.log('GET /api/posts (with auth):', postsResponse.status, postsListData.success ? 'SUCCESS' : 'FAILED');
      console.log('  - Admin can see all posts:', postsListData.posts?.length || 0, 'posts');
    }
    
  } catch (error) {
    console.error('Error testing authenticated operations:', error);
  }
}

async function testInvalidToken() {
  console.log('\n=== Testing Invalid Token (should fail) ===');
  
  try {
    const invalidHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer invalid-token-12345'
    };
    
    const postResponse = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: invalidHeaders,
      body: JSON.stringify(testPost)
    });
    console.log('POST /api/posts (invalid token):', postResponse.status, postResponse.status === 401 ? 'CORRECTLY BLOCKED' : 'SECURITY ISSUE');
    
  } catch (error) {
    console.error('Error testing invalid token:', error);
  }
}

async function runSecurityTest() {
  console.log('🔒 API Security Test Suite');
  console.log('========================');
  
  await testPublicEndpoints();
  await testUnauthenticatedWrite();
  await testInvalidToken();
  await testAuthenticatedOperations();
  
  console.log('\n✅ Security test completed!');
  console.log('\nExpected results:');
  console.log('- Public GET endpoints should work (200)');
  console.log('- Unauthenticated write operations should fail (401)');
  console.log('- Invalid token operations should fail (401)');
  console.log('- Authenticated operations should work (200)');
}

// Run if this file is executed directly
if (typeof window === 'undefined') {
  runSecurityTest().catch(console.error);
}

module.exports = { runSecurityTest };
