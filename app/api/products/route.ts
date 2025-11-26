import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const category = searchParams.get('category');
    const availableParam = searchParams.get('available');
    const search = searchParams.get('search');

    // Default to showing only available products
    const available = availableParam === 'false' ? false : true;

    // Build query
    let query = supabase
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
      .order('name', { ascending: true });

    // Apply filters
    if (available !== null) {
      query = query.eq('is_available', available);
    }

    if (category) {
      query = query.eq('categories.slug', category);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    // Transform data to match API contract
    const products = data?.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      category_name: product.categories?.name || '',
      category_slug: product.categories?.slug || '',
      image_url: product.image_url,
      unit_type: product.unit_type,
      is_available: product.is_available,
      has_variants: product.has_variants,
      base_price: product.base_price,
      variants: product.product_variants?.map((v: any) => ({
        id: v.id,
        variant_name: v.variant_name,
        price: v.price,
        is_available: v.is_available,
      })) || [],
      created_at: product.created_at,
      updated_at: product.updated_at,
    })) || [];

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
