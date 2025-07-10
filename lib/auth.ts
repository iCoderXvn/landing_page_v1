import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export interface AuthUser {
  id: number;
  username: string;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser;
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    JWT_SECRET
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      username: decoded.username
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check for token in cookies as fallback
  const tokenCookie = request.cookies.get('auth-token');
  if (tokenCookie) {
    return tokenCookie.value;
  }

  return null;
}

export function requireAuth(request: NextRequest): { isAuthenticated: boolean; user?: AuthUser; response?: NextResponse } {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return {
      isAuthenticated: false,
      response: NextResponse.json(
        { success: false, error: 'Authentication required. Please provide a valid token.' },
        { status: 401 }
      )
    };
  }

  const user = verifyToken(token);
  
  if (!user) {
    return {
      isAuthenticated: false,
      response: NextResponse.json(
        { success: false, error: 'Invalid or expired token. Please log in again.' },
        { status: 401 }
      )
    };
  }

  return {
    isAuthenticated: true,
    user
  };
}

export function authenticateRequest(request: NextRequest): AuthUser | null {
  const token = extractTokenFromRequest(request);
  if (!token) {
    return null;
  }

  return verifyToken(token);
}
