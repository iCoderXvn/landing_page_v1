import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { generateUniqueSlug, titleToSlug } from './slug-utils';

// Type definitions
interface DatabaseUser {
  id: number;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

interface DatabasePost {
  id: number;
  title: string;
  content: string;
  slug: string | null;
  is_published: number;
  topic_id: number | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

interface DatabaseTopic {
  id: number;
  name: string;
  description: string | null;
  color: string;
  created_at: string;
  updated_at: string;
}

// Initialize database
const dbPath = path.join(process.cwd(), 'data', 'admin.db');
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
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT UNIQUE,
    excerpt TEXT,
    meta_description TEXT,
    keywords TEXT,
    featured_image TEXT,
    is_published BOOLEAN DEFAULT 1,
    scheduled_at DATETIME,
    topic_id INTEGER,
    view_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL,
    post_id INTEGER,
    visitor_id TEXT,
    ip_hash TEXT,
    user_agent TEXT,
    referrer TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS visitor_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT UNIQUE NOT NULL,
    ip_hash TEXT,
    first_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
    visit_count INTEGER DEFAULT 1,
    total_time INTEGER DEFAULT 0,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
  CREATE INDEX IF NOT EXISTS idx_page_views_post_id ON page_views(post_id);
  CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
  CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON visitor_sessions(visitor_id);
  CREATE INDEX IF NOT EXISTS idx_visitor_sessions_last_visit ON visitor_sessions(last_visit);

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    category TEXT DEFAULT 'general',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Add slug and view_count columns to existing posts table if they don't exist
try {
  db.exec(`ALTER TABLE posts ADD COLUMN slug TEXT UNIQUE;`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0;`);
} catch (error) {
  // Column already exists, ignore
}

// Add new post fields for SEO and scheduling
try {
  db.exec(`ALTER TABLE posts ADD COLUMN excerpt TEXT;`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE posts ADD COLUMN meta_description TEXT;`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE posts ADD COLUMN keywords TEXT;`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE posts ADD COLUMN featured_image TEXT;`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE posts ADD COLUMN scheduled_at DATETIME;`);
} catch (error) {
  // Column already exists, ignore
}

// Add color column to existing topics table if it doesn't exist
try {
  db.exec(`ALTER TABLE topics ADD COLUMN color TEXT DEFAULT '#3B82F6';`);
} catch (error) {
  // Column already exists, ignore
}

// Add role and last_login columns to users table if they don't exist
try {
  db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'admin';`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE users ADD COLUMN last_login DATETIME;`);
} catch (error) {
  // Column already exists, ignore
}

// Create default admin user if not exists
const createDefaultUser = () => {
  const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  
  if (!existingUser) {
    const hashedPassword = bcrypt.hashSync('password', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('Default admin user created: admin/password');
  }
};

// Initialize default user
createDefaultUser();

// Create default topics if not exist
const createDefaultTopics = () => {
  const existingTopics = db.prepare('SELECT COUNT(*) as count FROM topics').get() as { count: number };
  
  if (existingTopics.count === 0) {
    const defaultTopics = [
      { name: 'Technology', description: 'Posts about technology and programming' },
      { name: 'Web Development', description: 'Posts about web development and frameworks' },
      { name: 'Tutorial', description: 'Step-by-step tutorials and guides' },
      { name: 'News', description: 'Industry news and updates' },
      { name: 'General', description: 'General discussion and miscellaneous posts' }
    ];
    
    const insertTopic = db.prepare('INSERT INTO topics (name, description) VALUES (?, ?)');
    defaultTopics.forEach(topic => {
      insertTopic.run(topic.name, topic.description);
    });
    console.log('Default topics created');
  }
};

// Initialize default topics
createDefaultTopics();

// Generate slugs for existing posts that don't have them
const generateSlugsForExistingPosts = () => {
  try {
    // Check if slug column exists first
    const tableInfo = db.prepare("PRAGMA table_info(posts)").all();
    const hasSlug = tableInfo.some((col: any) => col.name === 'slug');
    
    if (!hasSlug) {
      console.log('Slug column does not exist, skipping slug generation');
      return;
    }
    
    const postsWithoutSlugs = db.prepare("SELECT id, title FROM posts WHERE slug IS NULL OR slug = ''").all();
    
    if (postsWithoutSlugs.length > 0) {
      console.log(`Generating slugs for ${postsWithoutSlugs.length} existing posts...`);
      
      // Get all existing slugs to ensure uniqueness
      const existingSlugs = db.prepare("SELECT slug FROM posts WHERE slug IS NOT NULL AND slug != ''").all()
        .map((row: any) => row.slug);
      
      const updateSlug = db.prepare('UPDATE posts SET slug = ? WHERE id = ?');
      
      postsWithoutSlugs.forEach((post: any) => {
        const slug = generateUniqueSlug(post.title, existingSlugs);
        updateSlug.run(slug, post.id);
        existingSlugs.push(slug); // Add to existing slugs to maintain uniqueness
      });
      
      console.log('Slugs generated for existing posts');
    }
  } catch (error) {
    console.log('Error generating slugs for existing posts:', error);
    // Don't throw error, just log it
  }
};

// Initialize slugs for existing posts will be called at the end of this file

// User operations
export const userOperations = {
  // Authenticate user
  authenticate: (username: string, password: string) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as DatabaseUser | undefined;
    if (user && bcrypt.compareSync(password, user.password)) {
      // Update last login
      db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
      return { id: user.id, username: user.username };
    }
    return null;
  },

  // Get user by username
  getByUsername: (username: string) => {
    return db.prepare('SELECT id, username, role, last_login, created_at FROM users WHERE username = ?').get(username) as Omit<DatabaseUser, 'password'> | undefined;
  },

  // Get user with password (for password change verification)
  getByUsernameWithPassword: (username: string) => {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as DatabaseUser | undefined;
  },

  // Update password
  updatePassword: (username: string, newPassword: string) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const result = db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE username = ?')
      .run(hashedPassword, username);
    return result.changes > 0;
  },

  // Create new user
  create: (username: string, password: string, role: string = 'admin') => {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
        .run(username, hashedPassword, role);
      return { id: result.lastInsertRowid, username, role };
    } catch (error) {
      return null; // Username already exists
    }
  },

  // Get all users
  getAll: () => {
    return db.prepare('SELECT id, username, role, last_login, created_at FROM users ORDER BY created_at DESC').all();
  },

  // Get user by ID
  getById: (id: number) => {
    return db.prepare('SELECT id, username, role, last_login, created_at FROM users WHERE id = ?').get(id);
  },

  // Update user role
  updateRole: (id: number, role: string) => {
    const result = db.prepare('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(role, id);
    return result.changes > 0;
  },

  // Delete user
  delete: (id: number) => {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Reset password
  resetPassword: (id: number, newPassword: string) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const result = db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(hashedPassword, id);
    return result.changes > 0;
  }
};

// Topic operations
export const topicOperations = {
  // Create topic
  create: (name: string, description?: string, color?: string) => {
    try {
      const result = db.prepare('INSERT INTO topics (name, description, color) VALUES (?, ?, ?)')
        .run(name, description || null, color || '#3B82F6');
      return result.lastInsertRowid;
    } catch (error) {
      return null; // Topic name already exists
    }
  },

  // Get all topics
  getAll: (includePostCount: boolean = false) => {
    if (includePostCount) {
      return db.prepare(`
        SELECT t.*, COUNT(p.id) as postCount
        FROM topics t
        LEFT JOIN posts p ON t.id = p.topic_id
        GROUP BY t.id
        ORDER BY t.name ASC
      `).all().map((topic: any) => ({
        ...topic,
        createdAt: new Date(topic.created_at),
        postCount: topic.postCount || 0
      }));
    }
    return db.prepare('SELECT * FROM topics ORDER BY name ASC').all().map((topic: any) => ({
      ...topic,
      createdAt: new Date(topic.created_at)
    }));
  },

  // Get topic by ID
  getById: (id: number) => {
    const topic = db.prepare('SELECT * FROM topics WHERE id = ?').get(id) as DatabaseTopic | undefined;
    if (topic) {
      return {
        ...topic,
        createdAt: new Date(topic.created_at)
      };
    }
    return null;
  },

  // Update topic
  update: (id: number, name: string, description?: string, color?: string) => {
    try {
      const result = db.prepare('UPDATE topics SET name = ?, description = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(name, description || null, color || '#3B82F6', id);
      return result.changes > 0;
    } catch (error) {
      return false; // Topic name already exists
    }
  },

  // Delete topic
  delete: (id: number) => {
    // First, update all posts with this topic to have no topic
    db.prepare('UPDATE posts SET topic_id = NULL WHERE topic_id = ?').run(id);
    // Then delete the topic
    const result = db.prepare('DELETE FROM topics WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Get posts count for topic
  getPostsCount: (id: number) => {
    const result = db.prepare('SELECT COUNT(*) as count FROM posts WHERE topic_id = ?').get(id) as { count: number };
    return result.count;
  }
};

// Helper function to map database post to API post format
const mapPostFromDB = (post: any) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  slug: post.slug,
  excerpt: post.excerpt,
  metaDescription: post.meta_description,
  keywords: post.keywords,
  featuredImage: post.featured_image,
  viewCount: post.view_count || 0,
  createdAt: new Date(post.created_at),
  updatedAt: post.updated_at ? new Date(post.updated_at) : null,
  isPublished: Boolean(post.is_published),
  scheduledAt: post.scheduled_at ? new Date(post.scheduled_at) : null,
  topicId: post.topic_id,
  topic: post.topic_name ? {
    id: post.topic_id,
    name: post.topic_name,
    description: post.topic_description,
    createdAt: new Date()
  } : null
});

// Post operations
export const postOperations = {
  // Create post
  create: (
    title: string, 
    content: string, 
    isPublished: boolean = true, 
    topicId?: number,
    excerpt?: string,
    metaDescription?: string,
    keywords?: string,
    featuredImage?: string,
    slug?: string,
    scheduledAt?: string
  ) => {
    // Get existing slugs to ensure uniqueness
    const existingSlugs = db.prepare('SELECT slug FROM posts WHERE slug IS NOT NULL').all()
      .map((row: any) => row.slug);
    
    const finalSlug = slug || generateUniqueSlug(title, existingSlugs);
    
    const result = db.prepare(`
      INSERT INTO posts (
        title, content, slug, excerpt, meta_description, keywords, 
        featured_image, is_published, scheduled_at, topic_id, view_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `).run(
      title, 
      content, 
      finalSlug, 
      excerpt || null, 
      metaDescription || null, 
      keywords || null,
      featuredImage || null,
      isPublished ? 1 : 0, 
      scheduledAt || null,
      topicId || null
    );
    return result.lastInsertRowid;
  },

  // Get all posts with topic information
  getAll: () => {
    return db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      ORDER BY p.created_at DESC
    `).all().map(mapPostFromDB);
  },

  // Get published posts with topic information
  getPublished: () => {
    return db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.is_published = 1
      ORDER BY p.created_at DESC
    `).all().map(mapPostFromDB);
  },

  // Get published posts sorted by view count (most visited)
  getMostVisited: (limit?: number) => {
    const query = `
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.is_published = 1
      ORDER BY p.view_count DESC, p.created_at DESC
      ${limit ? `LIMIT ${limit}` : ''}
    `;
    
    return db.prepare(query).all().map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      viewCount: post.view_count || 0,
      createdAt: new Date(post.created_at),
      isPublished: Boolean(post.is_published),
      topicId: post.topic_id,
      topic: post.topic_name ? {
        id: post.topic_id,
        name: post.topic_name,
        description: post.topic_description,
        createdAt: new Date()
      } : null
    }));
  },

  // Get newest published posts
  getNewest: (limit?: number) => {
    const query = `
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.is_published = 1
      ORDER BY p.created_at DESC
      ${limit ? `LIMIT ${limit}` : ''}
    `;
    
    return db.prepare(query).all().map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      viewCount: post.view_count || 0,
      createdAt: new Date(post.created_at),
      isPublished: Boolean(post.is_published),
      topicId: post.topic_id,
      topic: post.topic_name ? {
        id: post.topic_id,
        name: post.topic_name,
        description: post.topic_description,
        createdAt: new Date()
      } : null
    }));
  },

  // Get posts by topic
  getByTopic: (topicId: number, publishedOnly: boolean = false) => {
    const query = publishedOnly 
      ? `SELECT p.*, t.name as topic_name, t.description as topic_description
         FROM posts p
         LEFT JOIN topics t ON p.topic_id = t.id
         WHERE p.topic_id = ? AND p.is_published = 1
         ORDER BY p.created_at DESC`
      : `SELECT p.*, t.name as topic_name, t.description as topic_description
         FROM posts p
         LEFT JOIN topics t ON p.topic_id = t.id
         WHERE p.topic_id = ?
         ORDER BY p.created_at DESC`;
    
    return db.prepare(query).all(topicId).map((post: any) => ({
      ...post,
      is_published: Boolean(post.is_published),
      createdAt: new Date(post.created_at),
      isPublished: Boolean(post.is_published),
      viewCount: post.view_count || 0,
      slug: post.slug,
      topic: post.topic_name ? {
        id: post.topic_id,
        name: post.topic_name,
        description: post.topic_description
      } : null
    }));
  },

  // Get post by ID with topic information
  getById: (id: number) => {
    const post = db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.id = ?
    `).get(id) as any;
    
    return post ? mapPostFromDB(post) : null;
  },

  // Get post by slug with topic information
  getBySlug: (slug: string) => {
    const post = db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.slug = ?
    `).get(slug) as any;
    
    return post ? mapPostFromDB(post) : null;
  },

  // Increment view count
  incrementViewCount: (id: number) => {
    const result = db.prepare('UPDATE posts SET view_count = view_count + 1 WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Update post
  update: (
    id: number, 
    title: string, 
    content: string, 
    isPublished: boolean, 
    topicId?: number,
    excerpt?: string,
    metaDescription?: string,
    keywords?: string,
    featuredImage?: string,
    customSlug?: string,
    scheduledAt?: string
  ) => {
    // Get the current post to check if title changed
    const currentPost = db.prepare('SELECT title, slug FROM posts WHERE id = ?').get(id) as any;
    
    let slug = customSlug || currentPost?.slug;
    
    // If title changed and no custom slug provided, generate new slug
    if (currentPost && currentPost.title !== title && !customSlug) {
      const existingSlugs = db.prepare('SELECT slug FROM posts WHERE slug IS NOT NULL AND id != ?').all(id)
        .map((row: any) => row.slug);
      slug = generateUniqueSlug(title, existingSlugs);
    }
    
    const result = db.prepare(`
      UPDATE posts SET 
        title = ?, content = ?, slug = ?, excerpt = ?, meta_description = ?, 
        keywords = ?, featured_image = ?, is_published = ?, scheduled_at = ?, 
        topic_id = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(
      title, 
      content, 
      slug, 
      excerpt || null, 
      metaDescription || null, 
      keywords || null,
      featuredImage || null,
      isPublished ? 1 : 0,
      scheduledAt || null,
      topicId || null, 
      id
    );
    return result.changes > 0;
  },

  // Delete post
  delete: (id: number) => {
    const result = db.prepare('DELETE FROM posts WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Toggle publish status
  togglePublish: (id: number) => {
    const result = db.prepare('UPDATE posts SET is_published = NOT is_published, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(id);
    return result.changes > 0;
  },

  // Bulk reassign posts from one topic to another
  bulkReassignTopic: (fromTopicId: number, toTopicId: number) => {
    const result = db.prepare('UPDATE posts SET topic_id = ?, updated_at = CURRENT_TIMESTAMP WHERE topic_id = ?')
      .run(toTopicId, fromTopicId);
    return result.changes;
  }
};

// Analytics operations
export const analyticsOperations = {
  // Track page view
  trackPageView: (data: {
    pagePath: string;
    postId?: number;
    visitorId: string;
    ipHash: string;
    userAgent?: string;
    referrer?: string;
    deviceType?: string;
    browser?: string;
    os?: string;
    country?: string;
  }) => {
    try {
      const result = db.prepare(`
        INSERT INTO page_views (page_path, post_id, visitor_id, ip_hash, user_agent, referrer, device_type, browser, os, country)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        data.pagePath,
        data.postId || null,
        data.visitorId,
        data.ipHash,
        data.userAgent || null,
        data.referrer || null,
        data.deviceType || null,
        data.browser || null,
        data.os || null,
        data.country || null
      );
      return result.lastInsertRowid;
    } catch (error) {
      console.error('Error tracking page view:', error);
      return null;
    }
  },

  // Update or create visitor session
  upsertVisitorSession: (data: {
    visitorId: string;
    ipHash: string;
    deviceType?: string;
    browser?: string;
    os?: string;
    country?: string;
  }) => {
    try {
      const existing = db.prepare('SELECT * FROM visitor_sessions WHERE visitor_id = ?').get(data.visitorId);
      
      if (existing) {
        db.prepare(`
          UPDATE visitor_sessions 
          SET last_visit = CURRENT_TIMESTAMP, visit_count = visit_count + 1
          WHERE visitor_id = ?
        `).run(data.visitorId);
      } else {
        db.prepare(`
          INSERT INTO visitor_sessions (visitor_id, ip_hash, device_type, browser, os, country)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          data.visitorId,
          data.ipHash,
          data.deviceType || null,
          data.browser || null,
          data.os || null,
          data.country || null
        );
      }
      return true;
    } catch (error) {
      console.error('Error upserting visitor session:', error);
      return false;
    }
  },

  // Get dashboard stats for a period
  getDashboardStats: (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const periodMap = {
      day: '1 day',
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const totalPosts = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };
    
    const totalViews = db.prepare(`
      SELECT COUNT(*) as count FROM page_views 
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
    `).get() as { count: number };

    const uniqueVisitors = db.prepare(`
      SELECT COUNT(DISTINCT visitor_id) as count FROM page_views 
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
    `).get() as { count: number };

    const avgTimeOnPage = db.prepare(`
      SELECT AVG(total_time) as avg FROM visitor_sessions
      WHERE last_visit >= datetime('now', '-${periodMap[period]}')
    `).get() as { avg: number | null };

    // Get previous period stats for comparison
    const prevViews = db.prepare(`
      SELECT COUNT(*) as count FROM page_views 
      WHERE created_at >= datetime('now', '-${periodMap[period]}', '-${periodMap[period]}')
      AND created_at < datetime('now', '-${periodMap[period]}')
    `).get() as { count: number };

    const prevVisitors = db.prepare(`
      SELECT COUNT(DISTINCT visitor_id) as count FROM page_views 
      WHERE created_at >= datetime('now', '-${periodMap[period]}', '-${periodMap[period]}')
      AND created_at < datetime('now', '-${periodMap[period]}')
    `).get() as { count: number };

    return {
      totalPosts: totalPosts.count,
      totalViews: totalViews.count,
      uniqueVisitors: uniqueVisitors.count,
      avgTimeOnPage: Math.round(avgTimeOnPage.avg || 0),
      viewsChange: prevViews.count > 0 ? ((totalViews.count - prevViews.count) / prevViews.count * 100) : 0,
      visitorsChange: prevVisitors.count > 0 ? ((uniqueVisitors.count - prevVisitors.count) / prevVisitors.count * 100) : 0
    };
  },

  // Get views over time
  getViewsOverTime: (period: 'day' | 'week' | 'month' | 'year' = 'week', groupBy: 'hour' | 'day' | 'week' | 'month' = 'day') => {
    const periodMap = {
      day: '1 day',
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const formatMap = {
      hour: '%Y-%m-%d %H:00',
      day: '%Y-%m-%d',
      week: '%Y-W%W',
      month: '%Y-%m'
    };

    const data = db.prepare(`
      SELECT 
        strftime('${formatMap[groupBy]}', created_at) as period,
        COUNT(*) as views,
        COUNT(DISTINCT visitor_id) as visitors
      FROM page_views
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
      GROUP BY period
      ORDER BY period ASC
    `).all();

    return data;
  },

  // Get top posts
  getTopPosts: (limit: number = 10, period?: 'day' | 'week' | 'month' | 'year') => {
    // Use the view_count column from posts table for accurate counts
    // If period is specified, count page_views from that period
    if (period) {
      const periodMap = { day: '1 day', week: '7 days', month: '30 days', year: '365 days' };
      
      const data = db.prepare(`
        SELECT 
          p.id,
          p.title,
          p.slug,
          COUNT(DISTINCT pv.id) as views,
          COUNT(DISTINCT pv.visitor_id) as unique_visitors
        FROM posts p
        LEFT JOIN page_views pv ON p.id = pv.post_id 
          AND pv.created_at >= datetime('now', '-${periodMap[period]}')
        WHERE p.is_published = 1
        GROUP BY p.id, p.title, p.slug
        HAVING views > 0
        ORDER BY views DESC
        LIMIT ?
      `).all(limit);

      return data;
    } else {
      // For all-time stats, use the view_count column which is more accurate
      const data = db.prepare(`
        SELECT 
          p.id,
          p.title,
          p.slug,
          p.view_count as views,
          COUNT(DISTINCT pv.visitor_id) as unique_visitors
        FROM posts p
        LEFT JOIN page_views pv ON p.id = pv.post_id
        WHERE p.is_published = 1
        GROUP BY p.id, p.title, p.slug, p.view_count
        ORDER BY views DESC
        LIMIT ?
      `).all(limit);

      return data;
    }
  },

  // Get traffic sources
  getTrafficSources: (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const periodMap = {
      day: '1 day',
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const data = db.prepare(`
      SELECT 
        CASE 
          WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
          WHEN referrer LIKE '%localhost%' OR referrer LIKE '%127.0.0.1%' THEN 'Internal'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%facebook%' OR referrer LIKE '%fb.%' THEN 'Facebook'
          WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
          WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referrer LIKE '%youtube%' THEN 'YouTube'
          WHEN referrer LIKE '%instagram%' THEN 'Instagram'
          WHEN referrer LIKE '%reddit%' THEN 'Reddit'
          WHEN referrer LIKE '%telegram%' OR referrer LIKE '%t.me%' THEN 'Telegram'
          WHEN referrer LIKE '%bing%' THEN 'Bing'
          WHEN referrer LIKE '%yahoo%' THEN 'Yahoo'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
      GROUP BY source
      ORDER BY count DESC
    `).all();

    return data;
  },

  // Get device statistics
  getDeviceStats: (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const periodMap = {
      day: '1 day',
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const data = db.prepare(`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
      AND device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY count DESC
    `).all();

    return data;
  },

  // Get browser statistics
  getBrowserStats: (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const periodMap = {
      day: '1 day',
      week: '7 days',
      month: '30 days',
      year: '365 days'
    };

    const data = db.prepare(`
      SELECT 
        browser,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-${periodMap[period]}')
      AND browser IS NOT NULL
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 10
    `).all();

    return data;
  },

  // Get recent activity
  getRecentActivity: (limit: number = 20) => {
    const data = db.prepare(`
      SELECT 
        pv.id,
        pv.page_path as pagePath,
        pv.created_at as createdAt,
        pv.device_type as deviceType,
        pv.browser,
        pv.os,
        pv.country,
        p.title as postTitle,
        p.slug as postSlug
      FROM page_views pv
      LEFT JOIN posts p ON pv.post_id = p.id
      ORDER BY pv.created_at DESC
      LIMIT ?
    `).all(limit);

    return data;
  },

  // Get active visitors (visited in last 5 minutes)
  getActiveVisitors: () => {
    const data = db.prepare(`
      SELECT COUNT(DISTINCT visitor_id) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-5 minutes')
    `).get() as { count: number };

    return data.count;
  },

  // Get live statistics
  getLiveStats: () => {
    // Active visitors in last 5 minutes
    const activeVisitors = db.prepare(`
      SELECT COUNT(DISTINCT visitor_id) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-5 minutes')
    `).get() as { count: number };

    // Page views in last 5 minutes
    const recentViews = db.prepare(`
      SELECT COUNT(*) as count
      FROM page_views
      WHERE created_at >= datetime('now', '-5 minutes')
    `).get() as { count: number };

    // Average time on page (from visitor sessions)
    const avgTime = db.prepare(`
      SELECT AVG(total_time) as avg
      FROM visitor_sessions
      WHERE last_visit >= datetime('now', '-1 hour')
    `).get() as { avg: number | null };

    // Active pages with viewer counts
    const activePages = db.prepare(`
      SELECT 
        pv.page_path as path,
        p.title,
        COUNT(DISTINCT pv.visitor_id) as viewers
      FROM page_views pv
      LEFT JOIN posts p ON pv.post_id = p.id
      WHERE pv.created_at >= datetime('now', '-5 minutes')
      GROUP BY pv.page_path, p.title
      HAVING viewers > 0
      ORDER BY viewers DESC
      LIMIT 10
    `).all();

    return {
      activeVisitors: activeVisitors.count,
      pageViewsLast5Min: recentViews.count,
      avgTimeOnPage: Math.round(avgTime?.avg || 0),
      activePages
    };
  },

  getTopReferrers: (limit: number = 10, period: 'day' | 'week' | 'month' | 'year' = 'week') => {
    const periodMap = {
      day: '-1 day',
      week: '-7 days',
      month: '-30 days',
      year: '-1 year'
    };

    const referrers = db.prepare(`
      SELECT 
        CASE 
          WHEN referrer = '' OR referrer IS NULL THEN 'Direct Traffic'
          ELSE referrer
        END as referrer,
        COUNT(*) as visits
      FROM page_views
      WHERE created_at >= datetime('now', ?)
      GROUP BY referrer
      ORDER BY visits DESC
      LIMIT ?
    `).all(periodMap[period], limit);

    return referrers;
  }
};

// Settings operations
export const settingsOperations = {
  // Get setting by key
  get: (key: string) => {
    const setting = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
    return setting?.value || null;
  },

  // Get all settings
  getAll: () => {
    const settings = db.prepare('SELECT key, value, category FROM settings ORDER BY category, key').all();
    return settings;
  },

  // Get settings by category
  getByCategory: (category: string) => {
    const settings = db.prepare('SELECT key, value FROM settings WHERE category = ? ORDER BY key').all(category);
    return settings;
  },

  // Set setting (upsert)
  set: (key: string, value: string, category: string = 'general') => {
    db.prepare(`
      INSERT INTO settings (key, value, category, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        category = excluded.category,
        updated_at = CURRENT_TIMESTAMP
    `).run(key, value, category);
  },

  // Set multiple settings
  setMultiple: (settings: Array<{ key: string; value: string; category?: string }>) => {
    const stmt = db.prepare(`
      INSERT INTO settings (key, value, category, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        category = excluded.category,
        updated_at = CURRENT_TIMESTAMP
    `);

    const transaction = db.transaction((settings: Array<{ key: string; value: string; category?: string }>) => {
      for (const setting of settings) {
        stmt.run(setting.key, setting.value, setting.category || 'general');
      }
    });

    transaction(settings);
  },

  // Delete setting
  delete: (key: string) => {
    const result = db.prepare('DELETE FROM settings WHERE key = ?').run(key);
    return result.changes > 0;
  }
};

// Initialize default settings
const initializeDefaultSettings = () => {
  const existingSettings = db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number };
  
  if (existingSettings.count === 0) {
    const defaultSettings = [
      // Site Settings
      { key: 'site_name', value: 'iCoderX', category: 'site' },
      { key: 'site_description', value: 'Xây dựng tương lai với tự động hóa. Từng bot một.', category: 'site' },
      { key: 'site_url', value: 'https://icoderx.vn', category: 'site' },
      { key: 'contact_email', value: 'admin@icoderx.vn', category: 'site' },
      
      // SEO Settings
      { key: 'default_meta_description', value: 'Chuyên lập trình bot, code bot theo yêu cầu, viết bot web tự động, tool MMO auto, bot Facebook/Telegram/AI. Dịch vụ viết bot crypto, tool automation, phần mềm tự động hóa, RPA. Thuê code tool auto, bot web scraping, tool auto click. 100+ dự án thành công.', category: 'seo' },
      { key: 'default_keywords', value: 'lập trình bot, code bot theo yêu cầu, viết bot web tự động, bot web auto, bot thao tác web, viết bot Facebook, viết bot Telegram, viết bot AI, dịch vụ viết bot, thuê viết bot, thuê người code bot, thuê code tool auto, code tool MMO, tool spam, tool tự động hóa, tool auto click, tool auto scroll, tool auto web, tool fill form tự động, phần mềm auto, phần mềm tự động hóa, phần mềm thao tác web, tool MMO auto, tool kiếm tiền online, dịch vụ viết tool MMO, viết tool auto game, bot auto đăng ký tài khoản, bot đăng nhập website, bot tự động crawl dữ liệu, bot web scraping, tool automation trình duyệt, automation web bằng Puppeteer, automation web bằng Selenium, tool auto captcha, code auto đăng bài Facebook, tool auto comment YouTube, tool tương tác TikTok, tool tăng lượt like Facebook, bot seeding TikTok, code bot Instagram, dịch vụ lập trình theo yêu cầu, code phần mềm theo yêu cầu, phần mềm tùy chỉnh, phần mềm automation theo ngành, RPA robotic process automation, lập trình bot thao tác chuột, lập trình auto click chuột, tool auto thao tác chuột và bàn phím, auto thao tác nhiều tab trình duyệt, tool đa luồng, tool chạy nền, tool giả lập Android, viết bot tự động hóa quy trình doanh nghiệp, bot AI tùy chỉnh GPT, tích hợp API automation, tool lấy dữ liệu sản phẩm Shopee, tool kiểm tra đơn hàng tự động, tool auto báo cáo, lập trình bot AI học sinh, tool chấm điểm tự động, công cụ tự động hóa giáo dục, bot Telegram xử lý yêu cầu khách hàng, bot chăm sóc khách hàng tự động, tool hỗ trợ làm việc nhóm, tool đồng bộ dữ liệu, tool crawl dữ liệu đối thủ, tool báo cáo giá thị trường, bot giao dịch crypto tự động, crypto trading bot, dịch vụ viết bot crypto, dịch vụ lập trình bot MMO, bot auto đăng ký tài khoản email, tool tạo tài khoản hàng loạt, bot tự động hoàn thành captcha, tool auto submit form, dịch vụ tạo tool automation theo yêu cầu, giải pháp tự động hóa phần mềm, thiết kế hệ thống bot chuyên dụng, tool giám sát hệ thống, viết bot AI với ChatGPT hoặc GPT-4, lập trình phần mềm hỗ trợ MMO, tool auto SEO, phần mềm auto marketing Facebook TikTok', category: 'seo' },
      { key: 'google_analytics_id', value: '', category: 'seo' },
      { key: 'google_search_console', value: '', category: 'seo' },
      
      // Social Media
      { key: 'twitter_url', value: 'https://x.com/iCoderXvn', category: 'social' },
      { key: 'facebook_url', value: 'https://www.facebook.com/iCoderXvn', category: 'social' },
      { key: 'linkedin_url', value: '', category: 'social' },
      { key: 'github_url', value: 'https://github.com/iCoderXvn', category: 'social' },
      { key: 'youtube_url', value: 'https://www.youtube.com/@iCoderX_vn', category: 'social' },
      { key: 'telegram_url', value: 'https://t.me/iCoderXvn', category: 'social' },
      
      // Content Settings
      { key: 'posts_per_page', value: '10', category: 'content' },
      { key: 'enable_comments', value: 'true', category: 'content' },
      { key: 'allow_guest_posts', value: 'false', category: 'content' },
      
      // System Settings
      { key: 'maintenance_mode', value: 'false', category: 'system' },
      { key: 'date_format', value: 'MMM dd, yyyy', category: 'system' },
      { key: 'timezone', value: 'UTC', category: 'system' }
    ];

    settingsOperations.setMultiple(defaultSettings);
    console.log('Default settings initialized');
  }
};

// Initialize default settings
initializeDefaultSettings();

// Initialize slugs for existing posts (after all migrations and setup)
generateSlugsForExistingPosts();

export default db;

