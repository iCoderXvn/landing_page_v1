const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

console.log('🔧 Resetting admin password...');

try {
  // Check if admin user exists
  const admin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  
  if (admin) {
    // Update password to Ha@9995536123
    const newPassword = 'Ha@9995536123';
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    
    db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE username = ?')
      .run(hashedPassword, 'admin');
    
    console.log('✅ Admin password updated successfully!');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: Ha@9995536123');
  } else {
    // Create new admin user with the password
    const newPassword = 'Ha@9995536123';
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
      .run('admin', hashedPassword, 'admin');
    
    console.log('✅ Admin user created successfully!');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: Ha@9995536123');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  db.close();
}
