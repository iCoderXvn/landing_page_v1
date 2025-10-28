const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'data/admin.db');
const db = new Database(dbPath);

console.log('🔧 Initializing database...');

try {
  // Create tables
  db.exec(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Topics table
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      color TEXT DEFAULT '#3B82F6',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Posts table
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      meta_description TEXT,
      keywords TEXT,
      featured_image TEXT,
      is_published INTEGER DEFAULT 0,
      scheduled_at DATETIME,
      view_count INTEGER DEFAULT 0,
      topic_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE SET NULL
    );

    -- Analytics table
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      event_type TEXT NOT NULL,
      user_agent TEXT,
      ip_address TEXT,
      referrer TEXT,
      country TEXT,
      city TEXT,
      device_type TEXT,
      browser TEXT,
      os TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
    );

    -- Settings table
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Tables created successfully');

  // Check if admin user exists
  const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  
  if (!adminExists) {
    console.log('👤 Creating default admin user...');
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hashedPassword, 'admin');
    console.log('✅ Admin user created (username: admin, password: admin123)');
  } else {
    console.log('✅ Admin user already exists');
  }

  // Check if topics exist
  const topicsCount = db.prepare('SELECT COUNT(*) as count FROM topics').get().count;
  
  if (topicsCount === 0) {
    console.log('📁 Creating default topics...');
    const defaultTopics = [
      { name: 'Công Nghệ', description: 'Tin tức và xu hướng công nghệ', color: '#3B82F6' },
      { name: 'Lập Trình', description: 'Hướng dẫn và kinh nghiệm lập trình', color: '#10B981' },
      { name: 'Phần Mềm', description: 'Giới thiệu và đánh giá phần mềm', color: '#F59E0B' },
      { name: 'Tutorial', description: 'Hướng dẫn chi tiết từng bước', color: '#8B5CF6' },
      { name: 'Tin Tức', description: 'Tin tức và sự kiện mới nhất', color: '#EF4444' }
    ];

    for (const topic of defaultTopics) {
      db.prepare('INSERT INTO topics (name, description, color) VALUES (?, ?, ?)').run(
        topic.name,
        topic.description,
        topic.color
      );
    }
    console.log('✅ Default topics created');
  } else {
    console.log('✅ Topics already exist');
  }

  console.log('\n🎉 Database initialization completed successfully!\n');
  console.log('📝 Next steps:');
  console.log('   1. Start your application: pm2 restart icoderx');
  console.log('   2. Login with username: admin, password: admin123');
  console.log('   3. Change the default password in admin settings\n');

} catch (error) {
  console.error('\n❌ Database initialization failed:', error);
  process.exit(1);
} finally {
  db.close();
}
