import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegramId, password } = body;

    if (!telegramId || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // TODO: Validate credentials against your database
    // For now, we'll create a mock user
    const user = {
      id: `user_${telegramId}`,
      telegramId: telegramId,
      username: `user_${telegramId}`,
    };

    // Set auth cookie
    const response = NextResponse.json(user);
    response.cookies.set('auth_token', `token_${telegramId}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
