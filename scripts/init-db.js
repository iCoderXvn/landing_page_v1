// Test database initialization
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(process.cwd(), 'data', 'admin.db');
console.log('Database path:', dbPath);

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    topic_id INTEGER,
    is_published BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id)
  );
`);

console.log('Database tables created successfully');

// Create default admin user if not exists
const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!existingUser) {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('password', 10);
  
  db.prepare(`
    INSERT INTO users (username, password) VALUES (?, ?)
  `).run('admin', hashedPassword);
  
  console.log('Default admin user created');
}

// Create default topics if not exist
const existingTopics = db.prepare('SELECT COUNT(*) as count FROM topics').get();
if (existingTopics.count === 0) {
  const insertTopic = db.prepare(`
    INSERT INTO topics (name, description) VALUES (?, ?)
  `);
  
  insertTopic.run('Technology', 'Posts about technology and programming');
  insertTopic.run('Business', 'Posts about business and entrepreneurship');
  insertTopic.run('Lifestyle', 'Posts about lifestyle and personal development');
  
  console.log('Default topics created');
}

console.log('Database initialized successfully');
db.close();
