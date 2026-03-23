import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // TODO: Validate token and fetch user from database
    // For now, extract telegramId from token
    const telegramId = token.replace('token_', '');
    const user = {
      id: `user_${telegramId}`,
      telegramId: telegramId,
      username: `user_${telegramId}`,
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Auth check failed' },
      { status: 500 }
    );
  }
}
