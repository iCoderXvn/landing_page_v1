// Simple test to verify the JSON database works
import { userOperations, postOperations } from '../lib/database-json';

console.log('Testing JSON Database...');

// Test user operations
console.log('Testing user authentication...');
const user = userOperations.authenticate('admin', 'password');
console.log('Authentication result:', user);

// Test post operations
console.log('Testing post creation...');
const postId = postOperations.create('Test Post', 'This is a **test** post with markdown!', true);
console.log('Created post ID:', postId);

const posts = postOperations.getAll();
console.log('All posts:', posts);

console.log('JSON Database test completed successfully!');
