// Category Types

export interface Category {
  id: string;
  name: string;
  slug: string;
  product_count?: number;
  created_at: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  id: string;
}
