import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export interface SessionUser {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  expiresAt: number;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie) {
      return NextResponse.json({ session: null });
    }

    const session: SessionUser = JSON.parse(sessionCookie.value);

    // Verificar si la sesión expiró
    if (session.expiresAt < Date.now()) {
      cookieStore.delete('admin_session');
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({ 
      session: {
        userId: session.userId,
        email: session.email,
        fullName: session.fullName,
        role: session.role
      }
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ session: null });
  }
}
