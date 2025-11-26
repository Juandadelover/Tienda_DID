import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifySession } from '@/lib/auth/sessionHelper';

// Configurar cache y revalidación
export const revalidate = 30; // Revalidar cada 30 segundos

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

    // Build query - optimizada para rendimiento
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
      .order('name', { ascending: true })
      .limit(100); // Limitar resultados para mejor rendimiento

    // Apply filters
    if (available !== null) {
      query = query.eq('is_available', available);
    }

    if (category) {
      // Filtrar por slug de categoría usando subquery
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
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

    // Respuesta con headers de caché
    return NextResponse.json(
      { products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Create a new product (admin only)
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
    const body = await request.json();
    const { name, description, category_id, image_url, unit_type, has_variants, base_price } = body;

    // Validate required fields
    if (!name || !category_id || !unit_type) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, category_id, unit_type' },
        { status: 400 }
      );
    }

    // Validate base_price for products without variants
    if (!has_variants && (base_price === undefined || base_price === null)) {
      return NextResponse.json(
        { error: 'El precio base es requerido para productos sin variantes' },
        { status: 400 }
      );
    }

    // Create product
    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        description: description || null,
        category_id,
        image_url: image_url || null,
        unit_type,
        is_available: true,
        has_variants: has_variants || false,
        base_price: has_variants ? null : base_price,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: 'Error al crear producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
