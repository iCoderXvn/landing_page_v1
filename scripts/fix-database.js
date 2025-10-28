const Database = require('better-sqlite3');
const path = require('path');

// Connect to database
const dbPath = path.join(process.cwd(), 'data', 'admin.db');
const db = new Database(dbPath);

console.log('🔄 Fixing database schema...');

try {
  // Check current schema
  const tableInfo = db.prepare("PRAGMA table_info(posts)").all();
  console.log('Current posts table columns:', tableInfo.map(col => col.name));
  
  // Check if slug column exists
  const hasSlug = tableInfo.some(col => col.name === 'slug');
  const hasViewCount = tableInfo.some(col => col.name === 'view_count');
  
  if (!hasSlug) {
    console.log('➕ Adding slug column...');
    db.exec('ALTER TABLE posts ADD COLUMN slug TEXT');
  } else {
    console.log('✅ Slug column already exists');
  }
  
  if (!hasViewCount) {
    console.log('➕ Adding view_count column...');
    db.exec('ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0');
  } else {
    console.log('✅ View_count column already exists');
  }
  
  // Update all existing posts to have default view_count if null
  console.log('🔄 Updating existing posts...');
  const updateViewCount = db.prepare('UPDATE posts SET view_count = 0 WHERE view_count IS NULL');
  const viewCountUpdated = updateViewCount.run();
  console.log(`✅ Updated ${viewCountUpdated.changes} posts with default view count`);
  
  // Generate slugs for posts that don't have them
  const postsWithoutSlugs = db.prepare("SELECT id, title FROM posts WHERE slug IS NULL OR slug = ''").all();
  
  if (postsWithoutSlugs.length > 0) {
    console.log(`🔄 Generating slugs for ${postsWithoutSlugs.length} posts...`);
    
    // Simple slug generation function
    function generateSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
        .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
        .replace(/[ÌÍỊỈĨ]/g, 'I')
        .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
        .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
        .replace(/[ỲÝỴỶỸ]/g, 'Y')
        .replace(/Đ/g, 'D')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/gi, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    const existingSlugs = db.prepare("SELECT slug FROM posts WHERE slug IS NOT NULL AND slug != ''").all()
      .map(row => row.slug);
    
    const updateSlug = db.prepare('UPDATE posts SET slug = ? WHERE id = ?');
    
    postsWithoutSlugs.forEach((post, index) => {
      let baseSlug = generateSlug(post.title) || `post-${post.id}`;
      let slug = baseSlug;
      let counter = 1;
      
      // Ensure unique slug
      while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      updateSlug.run(slug, post.id);
      existingSlugs.push(slug);
      console.log(`   ${index + 1}. "${post.title}" → "${slug}"`);
    });
    
    console.log('✅ Slugs generated successfully');
  } else {
    console.log('✅ All posts already have slugs');
  }
  
  // Verify the final schema
  const finalTableInfo = db.prepare("PRAGMA table_info(posts)").all();
  console.log('\n✅ Final posts table schema:');
  finalTableInfo.forEach(col => {
    console.log(`   ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.dflt_value ? `DEFAULT ${col.dflt_value}` : ''}`);
  });
  
  console.log('\n🎉 Database schema fixed successfully!');
  
} catch (error) {
  console.error('❌ Error fixing database:', error);
} finally {
  db.close();
}