import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Type definitions
interface User {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Database {
  users: User[];
  posts: Post[];
}

// Database file paths
const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const initDatabase = (): Database => {
  if (!fs.existsSync(dbPath)) {
    const initialData: Database = {
      users: [],
      posts: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    const initialData: Database = {
      users: [],
      posts: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
};

// Save database
const saveDatabase = (data: Database): void => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Get database
const getDatabase = (): Database => {
  return initDatabase();
};

// Create default admin user if not exists
const createDefaultUser = () => {
  const db = getDatabase();
  const existingUser = db.users.find(user => user.username === 'admin');
  
  if (!existingUser) {
    const hashedPassword = bcrypt.hashSync('password', 10);
    const newUser: User = {
      id: Date.now(),
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    saveDatabase(db);
    console.log('Default admin user created: admin/password');
  }
};

// Initialize default user
createDefaultUser();

// User operations
export const userOperations = {
  // Authenticate user
  authenticate: (username: string, password: string) => {
    const db = getDatabase();
    const user = db.users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return { id: user.id, username: user.username };
    }
    return null;
  },

  // Get user by username
  getByUsername: (username: string) => {
    const db = getDatabase();
    const user = db.users.find(u => u.username === username);
    if (user) {
      return { id: user.id, username: user.username, createdAt: user.createdAt };
    }
    return null;
  },

  // Update password
  updatePassword: (username: string, newPassword: string) => {
    const db = getDatabase();
    const userIndex = db.users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      db.users[userIndex].password = hashedPassword;
      db.users[userIndex].updatedAt = new Date().toISOString();
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Create new user
  create: (username: string, password: string) => {
    const db = getDatabase();
    const existingUser = db.users.find(u => u.username === username);
    if (existingUser) {
      return null; // Username already exists
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: User = {
      id: Date.now(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    saveDatabase(db);
    return { id: newUser.id, username: newUser.username };
  },

  // Get all users
  getAll: () => {
    const db = getDatabase();
    return db.users.map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    }));
  }
};

// Post operations
export const postOperations = {
  // Create post
  create: (title: string, content: string, isPublished: boolean = true) => {
    const db = getDatabase();
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      isPublished,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.posts.unshift(newPost); // Add to beginning for newest first
    saveDatabase(db);
    return newPost.id;
  },

  // Get all posts
  getAll: () => {
    const db = getDatabase();
    return db.posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt)
    }));
  },

  // Get post by ID
  getById: (id: number) => {
    const db = getDatabase();
    const post = db.posts.find(p => p.id === id);
    if (post) {
      return {
        ...post,
        createdAt: new Date(post.createdAt)
      };
    }
    return null;
  },

  // Update post
  update: (id: number, title: string, content: string, isPublished: boolean) => {
    const db = getDatabase();
    const postIndex = db.posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      db.posts[postIndex] = {
        ...db.posts[postIndex],
        title,
        content,
        isPublished,
        updatedAt: new Date().toISOString()
      };
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Delete post
  delete: (id: number) => {
    const db = getDatabase();
    const postIndex = db.posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      db.posts.splice(postIndex, 1);
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Toggle publish status
  togglePublish: (id: number) => {
    const db = getDatabase();
    const postIndex = db.posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      db.posts[postIndex].isPublished = !db.posts[postIndex].isPublished;
      db.posts[postIndex].updatedAt = new Date().toISOString();
      saveDatabase(db);
      return true;
    }
    return false;
  }
};
