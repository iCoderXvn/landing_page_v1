import { NextRequest, NextResponse } from 'next/server';
import { userOperations } from '@/lib/database';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await userOperations.authenticate(username, password);

    if (user) {
      // Generate JWT token
      const token = generateToken({ id: user.id, username: user.username });
      
      const response = NextResponse.json({
        success: true,
        user: { id: user.id, username: user.username },
        token: token
      });

      // Set token in HTTP-only cookie as well for additional security
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
