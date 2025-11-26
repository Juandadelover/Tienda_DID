import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifySession } from '@/lib/auth/sessionHelper';

/**
 * Generate URL-safe slug from category name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 50); // Limit length
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Fetch categories with product count
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        created_at,
        products (count)
      `)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    // Transform data to match API contract
    const categories = data?.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      product_count: category.products?.[0]?.count || 0,
      created_at: category.created_at,
    })) || [];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories - Create new category (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar sesión custom
    const session = await verifySession();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Parse request body
    const body = await request.json();
    const { name } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    // Check name length
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'El nombre no puede exceder 100 caracteres' },
        { status: 400 }
      );
    }

    // Generate slug
    let slug = generateSlug(trimmedName);
    
    // Check for slug uniqueness and append number if needed
    let slugAttempt = slug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', slugAttempt)
        .single();

      if (!existing) {
        isUnique = true;
        slug = slugAttempt;
      } else {
        counter++;
        slugAttempt = `${slug}-${counter}`;
      }

      // Safety limit
      if (counter > 100) {
        return NextResponse.json(
          { error: 'No se pudo generar un slug único' },
          { status: 500 }
        );
      }
    }

    // Create category
    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        name: trimmedName,
        slug,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      
      // Check for unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Ya existe una categoría con ese nombre' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Error al crear la categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        category: {
          ...category,
          product_count: 0,
        },
        message: 'Categoría creada exitosamente' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
