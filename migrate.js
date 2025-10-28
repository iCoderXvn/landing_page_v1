const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data/blog.db');
const db = new Database(dbPath);

console.log('🔧 Starting database migration...');

try {
  // Check existing columns
  const tableInfo = db.prepare("PRAGMA table_info(posts)").all();
  const existingColumns = tableInfo.map(col => col.name);
  console.log('Existing columns:', existingColumns);

  const requiredColumns = [
    { name: 'slug', type: 'TEXT' },
    { name: 'excerpt', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' },
    { name: 'keywords', type: 'TEXT' },
    { name: 'featured_image', type: 'TEXT' },
    { name: 'scheduled_at', type: 'DATETIME' },
    { name: 'updated_at', type: 'DATETIME DEFAULT CURRENT_TIMESTAMP' }
  ];

  // Add missing columns
  for (const column of requiredColumns) {
    if (!existingColumns.includes(column.name)) {
      console.log(`✅ Adding column: ${column.name}`);
      db.exec(`ALTER TABLE posts ADD COLUMN ${column.name} ${column.type}`);
    } else {
      console.log(`⏭️  Column ${column.name} already exists`);
    }
  }

  // Generate slugs for existing posts
  const postsWithoutSlugs = db.prepare("SELECT id, title FROM posts WHERE slug IS NULL OR slug = ''").all();
  
  if (postsWithoutSlugs.length > 0) {
    console.log(`\n📝 Generating slugs for ${postsWithoutSlugs.length} posts...`);
    
    // Vietnamese character mapping
    const vietnameseMap = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd',
      'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
      'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
      'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
      'Đ': 'D'
    };

    function generateSlug(title) {
      // Replace Vietnamese characters
      let slug = title.normalize('NFD');
      for (const [vietnamese, latin] of Object.entries(vietnameseMap)) {
        slug = slug.replace(new RegExp(vietnamese, 'g'), latin);
      }
      
      // Convert to lowercase and clean up
      slug = slug
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '') // Remove remaining diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove multiple hyphens
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      
      return slug;
    }
    
    for (const post of postsWithoutSlugs) {
      let slug = generateSlug(post.title);
      
      // Ensure unique slug
      let finalSlug = slug;
      let counter = 1;
      while (db.prepare("SELECT id FROM posts WHERE slug = ? AND id != ?").get(finalSlug, post.id)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      
      db.prepare("UPDATE posts SET slug = ? WHERE id = ?").run(finalSlug, post.id);
      console.log(`   ✓ "${post.title}" → "${finalSlug}"`);
    }
  } else {
    console.log('\n✅ All posts already have slugs');
  }

  console.log('\n🎉 Migration completed successfully!\n');
  
} catch (error) {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
} finally {
  db.close();
}
