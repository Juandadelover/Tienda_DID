# API Contract: Categories Management

**Base Path**: `/api/categories`  
**Authentication**: Required for mutations (POST, PATCH, DELETE), Public for GET  
**Content-Type**: `application/json`

---

## Endpoints

### 1. List Categories

**GET** `/api/categories`

List all product categories.

**Response** `200 OK`:

```typescript
{
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    product_count: number;  // Number of products in category
    created_at: string;
  }>;
}
```

**Example Response**:

```json
{
  "categories": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Bebidas",
      "slug": "bebidas",
      "product_count": 24,
      "created_at": "2025-11-25T10:00:00Z"
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "name": "Abarrotes",
      "slug": "abarrotes",
      "product_count": 45,
      "created_at": "2025-11-25T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Single Category

**GET** `/api/categories/[id]`

Get details of a specific category.

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | Yes | Category ID |

**Response** `200 OK`:

```typescript
{
  category: {
    id: string;
    name: string;
    slug: string;
    product_count: number;
    created_at: string;
  };
}
```

**Error Responses**:

- `404 Not Found`:
```json
{ "error": "Category not found" }
```

---

### 3. Create Category

**POST** `/api/categories`

Create a new category (Admin only).

**Authentication**: Required

**Request Body**:

```typescript
{
  name: string;     // Required, 1-100 chars, must be unique
  slug: string;     // Required, lowercase, URL-safe, unique
}
```

**Validation Rules**:

- `name`: Required, 1-100 characters, unique
- `slug`: Required, lowercase, alphanumeric + hyphens, unique

**Response** `201 Created`:

```json
{
  "category": {
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "name": "Productos de limpieza",
    "slug": "productos-de-limpieza",
    "created_at": "2025-11-25T14:30:00Z"
  }
}
```

**Error Responses**:

- `400 Bad Request`:
```json
{
  "error": "Validation failed",
  "details": {
    "slug": "Slug must be lowercase and URL-safe"
  }
}
```

- `409 Conflict`: Duplicate name or slug
```json
{ "error": "Category with this slug already exists" }
```

- `401 Unauthorized`: Not authenticated

---

### 4. Update Category

**PATCH** `/api/categories/[id]`

Update an existing category (Admin only).

**Authentication**: Required

**Request Body** (all fields optional):

```typescript
{
  name?: string;
  slug?: string;
}
```

**Response** `200 OK`:

```json
{
  "category": {
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "name": "Artículos de limpieza",
    "slug": "articulos-de-limpieza",
    "created_at": "2025-11-25T14:30:00Z"
  }
}
```

**Error Responses**: Same as Create

---

### 5. Delete Category

**DELETE** `/api/categories/[id]`

Delete a category (Admin only). **Only allowed if category has no products.**

**Authentication**: Required

**Response** `200 OK`:

```json
{
  "message": "Category deleted successfully",
  "deletedId": "323e4567-e89b-12d3-a456-426614174002"
}
```

**Error Responses**:

- `400 Bad Request`: Category has associated products
```json
{
  "error": "Cannot delete category with products",
  "productCount": 15
}
```

- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Category doesn't exist

---

## Example Client Usage

```typescript
// Fetch all categories
async function fetchCategories() {
  const res = await fetch('/api/categories');
  const data = await res.json();
  return data.categories;
}

// Create a new category (admin)
async function createCategory(name: string, slug: string) {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, slug }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  
  return await res.json();
}

// Delete category with validation
async function deleteCategory(categoryId: string) {
  const res = await fetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const error = await res.json();
    if (error.productCount) {
      throw new Error(`Cannot delete category with ${error.productCount} products`);
    }
    throw new Error(error.error);
  }
  
  return await res.json();
}
```

---

## Slug Generation Helper

```typescript
// Utility to generate URL-safe slug
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD') // Normalize accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens
}

// Example:
generateSlug('Productos de Aseo') // => 'productos-de-aseo'
```

---

## Business Rules

1. **Uniqueness**: Both `name` and `slug` must be unique across categories
2. **Deletion Protection**: Categories with products cannot be deleted (RF-15)
3. **Slug Format**: Lowercase, alphanumeric + hyphens only
4. **Default Categories**: 6 predefined categories (see seed data)

---

**Status**: ✅ Contract defined and validated
