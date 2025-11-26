import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        category_id,
        categories (
          name,
          slug
        ),
        image_url,
        unit_type,
        is_available,
        has_variants,
        base_price,
        product_variants (
          id,
          variant_name,
          price,
          is_available
        ),
        created_at,
        updated_at
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      );
    }

    // Transform data to match API contract
    const product = {
      id: data.id,
      name: data.name,
      description: data.description,
      category_id: data.category_id,
      category_name: (data.categories as any)?.name || '',
      image_url: data.image_url,
      unit_type: data.unit_type,
      is_available: data.is_available,
      has_variants: data.has_variants,
      base_price: data.base_price,
      variants: (data.product_variants as any[])?.map((v: any) => ({
        id: v.id,
        variant_name: v.variant_name,
        price: v.price,
        is_available: v.is_available,
      })) || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
