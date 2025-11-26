/**
 * Session Helper
 * Utilidades para verificar sesión en rutas API
 */

import { cookies } from 'next/headers';

export interface SessionUser {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  expiresAt: number;
}

/**
 * Verificar si la sesión es válida en rutas API
 */
export async function verifySession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie) {
      return null;
    }

    const session: SessionUser = JSON.parse(sessionCookie.value);

    // Verificar si la sesión expiró
    if (session.expiresAt < Date.now()) {
      return null;
    }

    return {
      userId: session.userId,
      email: session.email,
      fullName: session.fullName,
      role: session.role,
      expiresAt: session.expiresAt,
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

/**
 * Verificar si el usuario es admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await verifySession();
  return session?.role === 'admin' || false;
}
