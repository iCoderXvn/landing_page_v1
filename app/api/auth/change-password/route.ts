import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { userOperations } from '@/lib/database';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    // Check authentication - only authenticated users can change password
    const auth = requireAuth(request);
    if (!auth.isAuthenticated) {
      return auth.response!;
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Get current user from token (with password for verification)
    const user = userOperations.getByUsernameWithPassword(auth.user!.username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const currentPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!currentPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Update password using username
    const updated = userOperations.updatePassword(auth.user!.username, newPassword);

    if (updated) {
      return NextResponse.json({ 
        success: true, 
        message: 'Password updated successfully' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update password' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
