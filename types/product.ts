// Product & Variant Types

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  image_url: string | null;
  unit_type: 'unit' | 'weight';
  is_available: boolean;
  has_variants: boolean;
  base_price: number | null;
  variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  price: number;
  is_available: boolean;
  created_at: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  category_id: string;
  image_url?: string;
  unit_type: 'unit' | 'weight';
  has_variants: boolean;
  base_price?: number | null;
  is_available?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export interface CreateVariantInput {
  product_id: string;
  variant_name: string;
  price: number;
  is_available?: boolean;
}

export interface UpdateVariantInput extends Partial<Omit<CreateVariantInput, 'product_id'>> {
  id: string;
}
