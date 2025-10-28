# Database Setup Instructions

This admin panel now uses a JSON file-based database to store user credentials and posts persistently.

## Required Packages

The following packages are required and should be installed:

```bash
npm install bcryptjs @types/bcryptjs
# OR
pnpm add bcryptjs @types/bcryptjs
```

**Note**: We're using a JSON file-based database approach to avoid native module compilation issues. This works great for development and small-scale applications.

## Installation Steps

1. **Install dependencies** (if not already installed):
   - Open Command Prompt or PowerShell as Administrator
   - Navigate to your project directory
   - Run: `pnpm install` or `npm install`

2. **Database will be automatically created** when you first run the application:
   - The database file will be created at: `data/database.json`
   - Default admin user will be created with credentials: `admin` / `password`

3. **Start the development server**:
   ```bash
   npm run dev
   # OR
   pnpm dev
   ```

## Features

### Authentication
- ✅ **Persistent login sessions** (24-hour expiration)
- ✅ **Password change functionality** 
- ✅ **Secure password hashing** with bcrypt
- ✅ **Session management** with localStorage

### Posts Management
- ✅ **Create posts** with markdown formatting
- ✅ **Edit and delete posts**
- ✅ **Publish/unpublish toggle**
- ✅ **Persistent storage** in JSON database
- ✅ **Real-time updates** after operations

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `PUT /api/auth/change-password` - Change user password

### Posts
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update existing post
- `DELETE /api/posts/[id]` - Delete post
- `PATCH /api/posts/[id]` - Toggle publish status

## Default Credentials

- **Username**: `admin`
- **Password**: `password`

**Important**: Change the default password after first login using the Settings button in the admin dashboard.

## Database Schema

### JSON Database Structure
The database is stored as a JSON file with the following structure:

```json
{
  "users": [
    {
      "id": 1234567890,
      "username": "admin",
      "password": "$2a$10$...",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "posts": [
    {
      "id": 1234567891,
      "title": "Post Title",
      "content": "Post content with **markdown**",
      "isPublished": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

## Troubleshooting

1. **Database file not created**: Make sure the `data` directory exists and is writable
2. **Login not working**: Verify the database was initialized properly and check `data/database.json`
3. **Posts not saving**: Check that the API routes are accessible and working
4. **Session not persisting**: Clear browser localStorage and try again
5. **JSON parse errors**: Delete `data/database.json` and restart the application to regenerate

## Security Notes

- Passwords are hashed using bcrypt before storage
- Sessions expire after 24 hours
- Database file should be excluded from version control
- In production, consider using a proper database solution
- The JSON approach is perfect for development and small applications
