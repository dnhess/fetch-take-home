import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_BASE_URL, AUTH_COOKIE_NAME } from '@/constants';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
      headers: {
        Cookie: `${authCookie.name}=${authCookie.value}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}