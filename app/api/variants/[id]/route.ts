import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PATCH /api/variants/[id]
 * Update a product variant (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { variant_name, price, is_available } = body;

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (variant_name !== undefined) updateData.variant_name = variant_name;
    if (price !== undefined) updateData.price = price;
    if (is_available !== undefined) updateData.is_available = is_available;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No hay campos para actualizar' },
        { status: 400 }
      );
    }

    // Update variant
    const { data, error } = await supabase
      .from('product_variants')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Variante no encontrada' },
          { status: 404 }
        );
      }
      console.error('Error updating variant:', error);
      return NextResponse.json(
        { error: 'Error al actualizar variante' },
        { status: 500 }
      );
    }

    return NextResponse.json({ variant: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/variants/[id]
 * Delete a product variant (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Get variant to find product_id
    const { data: variant, error: getError } = await supabase
      .from('product_variants')
      .select('product_id')
      .eq('id', id)
      .single();

    if (getError) {
      return NextResponse.json(
        { error: 'Variante no encontrada' },
        { status: 404 }
      );
    }

    // Delete variant
    const { error } = await supabase
      .from('product_variants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting variant:', error);
      return NextResponse.json(
        { error: 'Error al eliminar variante' },
        { status: 500 }
      );
    }

    // Check if product still has variants
    const { count } = await supabase
      .from('product_variants')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', variant.product_id);

    // If no more variants, update product
    if (count === 0) {
      await supabase
        .from('products')
        .update({ has_variants: false })
        .eq('id', variant.product_id);
    }

    return NextResponse.json({ message: 'Variante eliminada correctamente' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
