import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

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
  is_published: number;
  topic_id: number | null;
  created_at: string;
  updated_at: string;
}

interface DatabaseTopic {
  id: number;
  name: string;
  description: string | null;
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT 1,
    topic_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE SET NULL
  );
`);

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

// User operations
export const userOperations = {
  // Authenticate user
  authenticate: (username: string, password: string) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as DatabaseUser | undefined;
    if (user && bcrypt.compareSync(password, user.password)) {
      return { id: user.id, username: user.username };
    }
    return null;
  },

  // Get user by username
  getByUsername: (username: string) => {
    return db.prepare('SELECT id, username, created_at FROM users WHERE username = ?').get(username) as Omit<DatabaseUser, 'password'> | undefined;
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
  create: (username: string, password: string) => {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        .run(username, hashedPassword);
      return { id: result.lastInsertRowid, username };
    } catch (error) {
      return null; // Username already exists
    }
  },

  // Get all users
  getAll: () => {
    return db.prepare('SELECT id, username, created_at FROM users ORDER BY created_at DESC').all();
  }
};

// Topic operations
export const topicOperations = {
  // Create topic
  create: (name: string, description?: string) => {
    try {
      const result = db.prepare('INSERT INTO topics (name, description) VALUES (?, ?)')
        .run(name, description || null);
      return result.lastInsertRowid;
    } catch (error) {
      return null; // Topic name already exists
    }
  },

  // Get all topics
  getAll: () => {
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
  update: (id: number, name: string, description?: string) => {
    try {
      const result = db.prepare('UPDATE topics SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(name, description || null, id);
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

// Post operations
export const postOperations = {
  // Create post
  create: (title: string, content: string, isPublished: boolean = true, topicId?: number) => {
    const result = db.prepare('INSERT INTO posts (title, content, is_published, topic_id) VALUES (?, ?, ?, ?)')
      .run(title, content, isPublished ? 1 : 0, topicId || null);
    return result.lastInsertRowid;
  },

  // Get all posts with topic information
  getAll: () => {
    return db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      ORDER BY p.created_at DESC
    `).all().map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
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

  // Get published posts with topic information
  getPublished: () => {
    return db.prepare(`
      SELECT p.*, t.name as topic_name, t.description as topic_description
      FROM posts p
      LEFT JOIN topics t ON p.topic_id = t.id
      WHERE p.is_published = 1
      ORDER BY p.created_at DESC
    `).all().map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
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
    
    if (post) {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: new Date(post.created_at),
        isPublished: Boolean(post.is_published),
        topicId: post.topic_id,
        topic: post.topic_name ? {
          id: post.topic_id,
          name: post.topic_name,
          description: post.topic_description,
          createdAt: new Date()
        } : null
      };
    }
    return null;
  },

  // Update post
  update: (id: number, title: string, content: string, isPublished: boolean, topicId?: number) => {
    const result = db.prepare('UPDATE posts SET title = ?, content = ?, is_published = ?, topic_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(title, content, isPublished ? 1 : 0, topicId || null, id);
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
  }
};

export default db;
