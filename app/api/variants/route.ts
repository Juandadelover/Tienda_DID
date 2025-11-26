import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/variants
 * Create a new product variant (admin only)
 */
export async function POST(request: NextRequest) {
  try {
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
    const { product_id, variant_name, price, is_available = true } = body;

    // Validate required fields
    if (!product_id || !variant_name || price === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: product_id, variant_name, price' },
        { status: 400 }
      );
    }

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'El precio debe ser un número mayor o igual a 0' },
        { status: 400 }
      );
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, has_variants')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Create variant
    const { data, error } = await supabase
      .from('product_variants')
      .insert({
        product_id,
        variant_name,
        price,
        is_available,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating variant:', error);
      return NextResponse.json(
        { error: 'Error al crear variante' },
        { status: 500 }
      );
    }

    // Update product to has_variants = true if not already
    if (!product.has_variants) {
      await supabase
        .from('products')
        .update({ has_variants: true, base_price: null })
        .eq('id', product_id);
    }

    return NextResponse.json({ variant: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
