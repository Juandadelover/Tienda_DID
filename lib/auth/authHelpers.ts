/**
 * Authentication Helpers
 * Functions for admin authentication using custom users table
 */

export interface SessionUser {
  userId: string;
  email: string;
  fullName: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: SessionUser;
}

/**
 * Sign in with email and password
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Error de autenticación',
      };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Error de conexión. Por favor, intenta nuevamente.',
    };
  }
}

/**
 * Sign out current user
 */
export async function logout(): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Error al cerrar sesión.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'Error al cerrar sesión.',
    };
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get current user (alias for getSession)
 */
export async function getUser(): Promise<SessionUser | null> {
  return getSession();
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
