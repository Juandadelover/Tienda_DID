import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifySession } from '@/lib/auth/sessionHelper';
import { verifySession } from '@/lib/auth/sessionHelper';

interface RouteParams {
  params: Promise<{ id: string }>;
}

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

/**
 * GET /api/categories/[id] - Get single category by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: category, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        created_at,
        products (count)
      `)
      .eq('id', id)
      .single();

    if (error || !category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        product_count: (category.products as any)?.[0]?.count || 0,
        created_at: category.created_at,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/categories/[id] - Update category (admin only)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Verificar sesión custom
    const session = await verifySession();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    // Check if category exists
    const { data: existingCategory, error: fetchError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('id', id)
      .single();

    if (fetchError || !existingCategory) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

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

    // Generate new slug if name changed
    let slug = existingCategory.slug;
    if (trimmedName !== existingCategory.name) {
      slug = generateSlug(trimmedName);

      // Check for slug uniqueness (excluding current category)
      let slugAttempt = slug;
      let counter = 1;
      let isUnique = false;

      while (!isUnique) {
        const { data: existing } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', slugAttempt)
          .neq('id', id)
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
    }

    // Update category
    const { data: category, error } = await supabase
      .from('categories')
      .update({
        name: trimmedName,
        slug,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      
      // Check for unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Ya existe una categoría con ese nombre' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Error al actualizar la categoría' },
        { status: 500 }
      );
    }

    // Get product count for response
    const { data: productData } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id);

    return NextResponse.json({
      category: {
        ...category,
        product_count: (productData as any)?.length || 0,
      },
      message: 'Categoría actualizada exitosamente',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categories/[id] - Delete category (admin only)
 * Cannot delete if category has associated products
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Verificar sesión custom
    const session = await verifySession();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    // Check if category exists
    const { data: existingCategory, error: fetchError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('id', id)
      .single();

    if (fetchError || !existingCategory) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Check if category has associated products
    const { count: productCount, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);

    if (countError) {
      console.error('Error counting products:', countError);
      return NextResponse.json(
        { error: 'Error al verificar productos asociados' },
        { status: 500 }
      );
    }

    if (productCount && productCount > 0) {
      return NextResponse.json(
        { 
          error: 'No se puede eliminar categoría con productos',
          details: `Esta categoría tiene ${productCount} producto(s) asociado(s). Mueve o elimina los productos primero.`,
        },
        { status: 409 }
      );
    }

    // Delete category
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting category:', deleteError);
      return NextResponse.json(
        { error: 'Error al eliminar la categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Categoría eliminada exitosamente',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
