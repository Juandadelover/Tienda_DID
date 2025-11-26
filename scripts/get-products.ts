/**
 * Script para obtener todos los productos de la base de datos
 * y mostrar sus nombres para buscar imágenes apropiadas
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getProducts() {
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
        console.error('Error fetching products:', error);
        return;
    }

    console.log('\n=== PRODUCTOS EN LA BASE DE DATOS ===\n');

    if (!products || products.length === 0) {
        console.log('No hay productos en la base de datos.');
        return;
    }

    products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   Categoría: ${product.categories?.[0]?.name || 'Sin categoría'}`);
        console.log(`   Descripción: ${product.description || 'Sin descripción'}`);
        console.log(`   Imagen actual: ${product.image_url || 'Sin imagen'}`);
        console.log('');
    });

    console.log(`\nTotal de productos: ${products.length}\n`);
}

getProducts();
