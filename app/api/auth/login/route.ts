import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verificar credenciales contra la tabla users
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, full_name, role, is_active')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Usuario desactivado' },
        { status: 403 }
      );
    }

    // Verificar contraseña usando pgcrypto
    const { data: passwordMatch, error: pwError } = await supabase
      .rpc('verify_password', { 
        input_password: password, 
        stored_hash: user.password_hash 
      });

    // Si no existe la función RPC, crear una alternativa
    if (pwError) {
      // Verificar directamente con SQL
      const { data: verifyResult } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .eq('password_hash', supabase.rpc('crypt', { password, salt: user.password_hash }))
        .single();
      
      if (!verifyResult) {
        return NextResponse.json(
          { error: 'Credenciales inválidas' },
          { status: 401 }
        );
      }
    } else if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Actualizar último login
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    // Crear sesión en cookies
    const sessionData = {
      userId: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    };

    const cookieStore = await cookies();
    cookieStore.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
