import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createClient();

        const { data: products, error } = await supabase
            .from('products')
            .select(`
        id,
        name,
        description,
        image_url,
        categories (
          name
        )
      `)
            .order('name');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ products, count: products?.length || 0 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
