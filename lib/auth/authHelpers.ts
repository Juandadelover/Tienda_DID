/**
 * Authentication Helpers
 * Functions for admin authentication using Supabase Auth
 */

import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
  session?: Session;
}

/**
 * Sign in with email and password
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error.message),
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
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
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
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
export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get current user
 */
export async function getUser(): Promise<User | null> {
  const supabase = createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
  const supabase = createClient();
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session);
    }
  );

  return subscription;
}

/**
 * Translate Supabase auth errors to Spanish
 */
function getErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Credenciales inválidas. Verifica tu email y contraseña.',
    'Email not confirmed': 'Email no confirmado. Revisa tu bandeja de entrada.',
    'User not found': 'Usuario no encontrado.',
    'Invalid email or password': 'Email o contraseña incorrectos.',
    'Too many requests': 'Demasiados intentos. Espera unos minutos.',
    'Network request failed': 'Error de conexión. Verifica tu internet.',
  };

  return errorMessages[error] || 'Error de autenticación. Intenta nuevamente.';
}
