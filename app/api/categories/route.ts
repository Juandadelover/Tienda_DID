import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
