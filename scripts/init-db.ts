import { userOperations } from '../lib/database';

// This script initializes the database with a default admin user
console.log('Initializing database...');

// The database will be created automatically when the module is imported
// The default user is created in the database.ts file

console.log('Database initialized successfully!');
console.log('Default admin user created with credentials: admin/password');
console.log('You can change the password after logging in.');
