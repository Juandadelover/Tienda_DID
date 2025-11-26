# API Contract: Products Management

**Base Path**: `/api/products`  
**Authentication**: Required for mutations (POST, PATCH, DELETE), Public for GET  
**Content-Type**: `application/json`

---

## Endpoints

### 1. List Products

**GET** `/api/products`

List all products with optional filtering.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category slug |
| `available` | boolean | No | Filter by availability (default: true) |
| `search` | string | No | Search by product name |

**Response** `200 OK`:

```typescript
{
  products: Array<{
    id: string;
    name: string;
    description: string | null;
    category_id: string;
    category_name: string;
    category_slug: string;
    image_url: string | null;
    unit_type: 'unit' | 'weight';
    is_available: boolean;
    has_variants: boolean;
    base_price: number | null;
    variants?: Array<{
      id: string;
      variant_name: string;
      price: number;
      is_available: boolean;
    }>;
    created_at: string;
    updated_at: string;
  }>;
}
```

**Example Request**:

```bash
GET /api/products?category=bebidas&available=true
```

**Example Response**:

```json
{
  "products": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Coca-Cola",
      "description": "Bebida gaseosa",
      "category_id": "123e4567-e89b-12d3-a456-426614174000",
      "category_name": "Bebidas",
      "category_slug": "bebidas",
      "image_url": "https://xyz.supabase.co/storage/v1/object/public/product-images/coca-cola.webp",
      "unit_type": "unit",
      "is_available": true,
      "has_variants": true,
      "base_price": null,
      "variants": [
        {
          "id": "660e8400-e29b-41d4-a716-446655440001",
          "variant_name": "250ml",
          "price": 2000,
          "is_available": true
        },
        {
          "id": "660e8400-e29b-41d4-a716-446655440002",
          "variant_name": "1.5L",
          "price": 5500,
          "is_available": true
        }
      ],
      "created_at": "2025-11-25T10:00:00Z",
      "updated_at": "2025-11-25T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Single Product

**GET** `/api/products/[id]`

Get detailed information about a specific product including variants.

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | Yes | Product ID |

**Response** `200 OK`:

```typescript
{
  product: {
    id: string;
    name: string;
    description: string | null;
    category_id: string;
    category_name: string;
    image_url: string | null;
    unit_type: 'unit' | 'weight';
    is_available: boolean;
    has_variants: boolean;
    base_price: number | null;
    variants: Array<{
      id: string;
      variant_name: string;
      price: number;
      is_available: boolean;
    }>;
    created_at: string;
    updated_at: string;
  };
}
```

**Error Responses**:

- `404 Not Found`: Product not found
```json
{ "error": "Product not found" }
```

---

### 3. Create Product

**POST** `/api/products`

Create a new product (Admin only).

**Authentication**: Required (Supabase Auth session)

**Request Body**:

```typescript
{
  name: string;              // Required, 3-200 chars
  description?: string;      // Optional
  category_id: string;       // Required, UUID
  image_url?: string;        // Optional
  unit_type: 'unit' | 'weight';  // Required
  has_variants: boolean;     // Required
  base_price?: number;       // Required if has_variants = false
  variants?: Array<{         // Required if has_variants = true
    variant_name: string;
    price: number;
    is_available?: boolean;
  }>;
}
```

**Validation Rules**:

- `name`: Min 3 chars, max 200 chars
- `base_price`: Must be >= 0 if provided
- If `has_variants` = false, `base_price` is required
- If `has_variants` = true, `variants` array is required
- `category_id` must exist in categories table

**Response** `201 Created`:

```json
{
  "product": {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "name": "Arroz Diana x 500g",
    "category_id": "...",
    "has_variants": false,
    "base_price": 3500,
    ...
  }
}
```

**Error Responses**:

- `400 Bad Request`: Validation error
```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name must be at least 3 characters",
    "base_price": "Price is required for products without variants"
  }
}
```

- `401 Unauthorized`: Not authenticated
```json
{ "error": "Authentication required" }
```

- `404 Not Found`: Category not found
```json
{ "error": "Category not found" }
```

---

### 4. Update Product

**PATCH** `/api/products/[id]`

Update an existing product (Admin only).

**Authentication**: Required

**Request Body** (all fields optional):

```typescript
{
  name?: string;
  description?: string;
  category_id?: string;
  image_url?: string;
  unit_type?: 'unit' | 'weight';
  is_available?: boolean;
  has_variants?: boolean;
  base_price?: number;
}
```

**Response** `200 OK`:

```json
{
  "product": {
    "id": "...",
    "name": "Updated Name",
    "updated_at": "2025-11-25T12:00:00Z",
    ...
  }
}
```

**Error Responses**: Same as Create Product

---

### 5. Delete Product

**DELETE** `/api/products/[id]`

Permanently delete a product and its variants (Admin only).

**Authentication**: Required

**Response** `200 OK`:

```json
{
  "message": "Product deleted successfully",
  "deletedId": "770e8400-e29b-41d4-a716-446655440003"
}
```

**Error Responses**:

- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Product doesn't exist
- `500 Internal Server Error`: Database error

---

## Variant Management

Variants are managed through a separate set of endpoints under `/api/variants`.

**Related**: See [variants-api.md](./variants-api.md)

---

## Example Client Usage

```typescript
// Fetch all products in "Bebidas" category
async function fetchBebidas() {
  const res = await fetch('/api/products?category=bebidas');
  const data = await res.json();
  return data.products;
}

// Create a new product (admin)
async function createProduct(productData) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  
  return await res.json();
}

// Update product availability
async function toggleAvailability(productId: string, available: boolean) {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_available: available }),
  });
  
  return await res.json();
}
```

---

## Security Considerations

1. **Authentication**: Mutations require Supabase Auth session cookie
2. **RLS**: Row Level Security enforces admin-only writes
3. **Validation**: Zod schemas validate all inputs server-side
4. **Sanitization**: HTML stripped from text fields
5. **Rate Limiting**: (Recommended) Implement rate limiting for public endpoints

---

**Status**: ✅ Contract defined and aligned with data model
