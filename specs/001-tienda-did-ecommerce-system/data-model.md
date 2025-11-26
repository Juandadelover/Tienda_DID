# Data Model: Tienda DID E-Commerce System

**Feature**: Sistema de ventas en línea Tienda DID  
**Date**: 2025-11-25  
**Phase**: 1 - Database Schema Design  
**Database**: Supabase PostgreSQL

---

## Overview

Este documento define el modelo de datos completo para Tienda DID, incluyendo tablas, relaciones, constraints, índices y políticas RLS (Row Level Security). El diseño está basado en el modelo especificado en el documento de requisitos (Sección 4).

---

## Entity Relationship Diagram

```
┌─────────────────┐         ┌──────────────────┐
│   categories    │         │    settings      │
├─────────────────┤         ├──────────────────┤
│ id (PK)         │         │ id (PK)          │
│ name            │         │ key (UNIQUE)     │
│ slug (UNIQUE)   │◄────┐   │ value            │
│ created_at      │     │   │ updated_at       │
└─────────────────┘     │   └──────────────────┘
                        │
                        │
┌─────────────────────────┐
│      products           │
├─────────────────────────┤
│ id (PK)                 │
│ name                    │
│ description             │
│ category_id (FK) ───────┘
│ image_url               │
│ unit_type               │
│ is_available            │
│ has_variants            │
│ base_price              │
│ created_at              │
│ updated_at              │
└─────────────────────────┘
         │
         │
         ▼
┌─────────────────────────┐
│   product_variants      │
├─────────────────────────┤
│ id (PK)                 │
│ product_id (FK)         │
│ variant_name            │
│ price                   │
│ is_available            │
│ created_at              │
└─────────────────────────┘
```

---

## Table Definitions

### 1. categories

**Purpose**: Organización de productos en categorías predefinidas.

**Schema**:

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT categories_name_not_empty CHECK (char_length(name) > 0),
  CONSTRAINT categories_slug_lowercase CHECK (slug = LOWER(slug))
);

-- Índices
CREATE INDEX idx_categories_slug ON categories(slug);
```

**Fields**:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, Default | Identificador único |
| `name` | VARCHAR(100) | NOT NULL | Nombre de categoría en español |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly identifier |
| `created_at` | TIMESTAMPTZ | Default NOW() | Fecha de creación |

**Seed Data** (RF-02):
- Abarrotes
- Bebidas
- Productos de aseo
- Snacks y dulces
- Lácteos y refrigerados
- Otros

**Business Rules**:
- No se puede eliminar una categoría con productos asociados
- Slug debe ser lowercase y URL-safe
- Name debe ser único (validado en aplicación)

---

### 2. products

**Purpose**: Información principal de productos de la tienda.

**Schema**:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  image_url TEXT,
  unit_type VARCHAR(10) NOT NULL CHECK (unit_type IN ('unit', 'weight')),
  is_available BOOLEAN NOT NULL DEFAULT true,
  has_variants BOOLEAN NOT NULL DEFAULT false,
  base_price DECIMAL(10,2) CHECK (base_price IS NULL OR base_price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT products_name_not_empty CHECK (char_length(name) > 0),
  CONSTRAINT products_base_price_required_if_no_variants 
    CHECK (has_variants = true OR base_price IS NOT NULL)
);

-- Índices
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = true;
CREATE INDEX idx_products_name_trgm ON products USING gin (name gin_trgm_ops); -- Para búsqueda fuzzy
CREATE INDEX idx_products_updated_at ON products(updated_at DESC);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

**Fields**:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Identificador único |
| `name` | VARCHAR(200) | NOT NULL | Nombre del producto |
| `description` | TEXT | NULL | Descripción opcional |
| `category_id` | UUID | FK, NOT NULL | Categoría del producto |
| `image_url` | TEXT | NULL | URL de imagen (Supabase Storage o externa) |
| `unit_type` | VARCHAR(10) | ENUM | 'unit' (por unidad) o 'weight' (por peso) |
| `is_available` | BOOLEAN | DEFAULT true | Estado de disponibilidad |
| `has_variants` | BOOLEAN | DEFAULT false | Si tiene variantes (ej: tamaños) |
| `base_price` | DECIMAL(10,2) | Conditional | Precio si no tiene variantes |
| `created_at` | TIMESTAMPTZ | Default NOW() | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Auto-update | Última modificación |

**Business Rules**:
- Si `has_variants` = false, `base_price` es obligatorio
- Si `has_variants` = true, precio viene de `product_variants`
- `image_url` puede ser NULL (usa placeholder)
- No se puede cambiar `category_id` a categoría inexistente (ON DELETE RESTRICT)
- Productos agotados (`is_available` = false) no se pueden agregar al carrito

**Validation Examples**:

```typescript
// Product without variants
{
  name: "Arroz Diana x 500g",
  category_id: "uuid-abarrotes",
  unit_type: "weight",
  has_variants: false,
  base_price: 3500,
  is_available: true
}

// Product with variants
{
  name: "Coca-Cola",
  category_id: "uuid-bebidas",
  unit_type: "unit",
  has_variants: true,
  base_price: null, // Precio viene de variants
  is_available: true
}
```

---

### 3. product_variants

**Purpose**: Variantes de productos (tamaños, presentaciones diferentes).

**Schema**:

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT variants_name_not_empty CHECK (char_length(variant_name) > 0),
  CONSTRAINT variants_unique_per_product UNIQUE (product_id, variant_name)
);

-- Índices
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_available ON product_variants(is_available) WHERE is_available = true;
```

**Fields**:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Identificador único |
| `product_id` | UUID | FK, NOT NULL | Producto padre |
| `variant_name` | VARCHAR(100) | NOT NULL | Nombre de variante (ej: "250ml", "1L") |
| `price` | DECIMAL(10,2) | NOT NULL, >= 0 | Precio de esta variante |
| `is_available` | BOOLEAN | DEFAULT true | Disponibilidad individual |
| `created_at` | TIMESTAMPTZ | Default NOW() | Fecha de creación |

**Business Rules**:
- `variant_name` debe ser único por producto (no duplicados)
- Si producto padre está `is_available` = false, todas las variantes están inaccesibles
- Al eliminar un producto (ON DELETE CASCADE), se eliminan sus variantes
- Precio siempre debe ser mayor o igual a 0

**Examples**:

```typescript
// Coca-Cola variants
{ product_id: "coca-cola-uuid", variant_name: "250ml", price: 2000 }
{ product_id: "coca-cola-uuid", variant_name: "400ml", price: 3000 }
{ product_id: "coca-cola-uuid", variant_name: "1.5L", price: 5500 }
{ product_id: "coca-cola-uuid", variant_name: "3L", price: 9000 }
```

---

### 4. settings

**Purpose**: Configuraciones del sistema (horario, WhatsApp, etc.).

**Schema**:

```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT settings_key_not_empty CHECK (char_length(key) > 0)
);

-- Trigger para updated_at
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Índice
CREATE INDEX idx_settings_key ON settings(key);
```

**Fields**:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Identificador único |
| `key` | VARCHAR(100) | UNIQUE, NOT NULL | Clave de configuración |
| `value` | TEXT | NOT NULL | Valor (puede ser JSON string) |
| `updated_at` | TIMESTAMPTZ | Auto-update | Última modificación |

**Seed Data**:

```sql
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '573235725922'),
  ('store_address', 'Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar'),
  ('closing_hour', '22'), -- 10 PM
  ('store_name', 'Tienda DID'),
  ('delivery_enabled', 'true'),
  ('pickup_enabled', 'true');
```

**Business Rules**:
- `key` es inmutable (no se cambia, solo `value`)
- Valores booleanos se almacenan como strings ('true'/'false')
- Números se almacenan como strings y se parsean en aplicación

---

## Row Level Security (RLS) Policies

### Purpose

Proteger datos sensibles y restringir acceso según roles (RNF-07).

### Implementation

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CATEGORIES - Solo lectura pública
-- ============================================
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Categories are insertable by authenticated users"
  ON categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users"
  ON categories FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users"
  ON categories FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- PRODUCTS - Lectura pública, escritura admin
-- ============================================
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products are insertable by authenticated users"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by authenticated users"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by authenticated users"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- PRODUCT_VARIANTS - Igual que products
-- ============================================
CREATE POLICY "Variants are viewable by everyone"
  ON product_variants FOR SELECT
  USING (true);

CREATE POLICY "Variants are insertable by authenticated users"
  ON product_variants FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Variants are updatable by authenticated users"
  ON product_variants FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Variants are deletable by authenticated users"
  ON product_variants FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- SETTINGS - Solo lectura pública limitada
-- ============================================
CREATE POLICY "Public settings are viewable"
  ON settings FOR SELECT
  USING (
    key IN ('store_name', 'store_address', 'closing_hour', 'delivery_enabled', 'pickup_enabled')
  );

CREATE POLICY "Settings are updatable by authenticated users"
  ON settings FOR UPDATE
  USING (auth.role() = 'authenticated');
```

---

## Storage Bucket Configuration

### Bucket: `product-images`

**Purpose**: Almacenar imágenes de productos subidas por admin (RF-16).

```sql
-- Crear bucket (via Supabase Dashboard o SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Policy: Cualquiera puede ver
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Policy: Solo autenticados pueden subir
CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

-- Policy: Solo autenticados pueden actualizar
CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

-- Policy: Solo autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );
```

**File Naming Convention**:
```
product-images/
  ├── {product_id}.webp        # Imagen principal
  ├── {product_id}_thumb.webp  # Thumbnail (opcional)
  └── ...
```

**Constraints**:
- Tamaño máximo: 5MB
- Formatos permitidos: JPEG, PNG, WebP
- Transformaciones on-the-fly con Supabase Image Transformation

---

## TypeScript Types (Generated)

```typescript
// Generated by Supabase CLI: npx supabase gen types typescript

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category_id: string;
          image_url: string | null;
          unit_type: 'unit' | 'weight';
          is_available: boolean;
          has_variants: boolean;
          base_price: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category_id: string;
          image_url?: string | null;
          unit_type: 'unit' | 'weight';
          is_available?: boolean;
          has_variants?: boolean;
          base_price?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          // Similar structure for partial updates
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          variant_name: string;
          price: number;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          // Similar structure
        };
        Update: {
          // Similar structure
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          // Similar structure
        };
        Update: {
          // Similar structure
        };
      };
    };
  };
}
```

---

## Migration Strategy

### Initial Migration

```bash
# Archivo: supabase/migrations/001_initial_schema.sql
# Ejecuta todas las tablas, constraints, índices
```

### RLS Policies

```bash
# Archivo: supabase/migrations/002_rls_policies.sql
# Ejecuta todas las políticas RLS
```

### Storage Configuration

```bash
# Archivo: supabase/migrations/003_storage_setup.sql
# Configura buckets y políticas de storage
```

### Seed Data

```bash
# Archivo: supabase/seed.sql
# Inserta categorías predefinidas y settings iniciales
```

---

## Query Performance Considerations

### Índices Optimizados

1. **Categories**: `slug` (búsqueda por URL)
2. **Products**: 
   - `category_id` (filtrado por categoría)
   - `is_available` (filtrar disponibles)
   - `name` con GIN trigram (búsqueda fuzzy)
   - `updated_at` DESC (admin dashboard ordenado)
3. **Variants**: 
   - `product_id` (JOIN con products)
   - `is_available` (filtrar disponibles)

### Query Examples

```sql
-- Listar productos disponibles de una categoría
SELECT p.*, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_available = true
  AND c.slug = 'bebidas'
ORDER BY p.name;

-- Buscar productos por nombre (fuzzy search)
SELECT * FROM products
WHERE name ILIKE '%coca%'
  AND is_available = true
LIMIT 20;

-- Obtener producto con variantes
SELECT 
  p.*,
  json_agg(
    json_build_object(
      'id', v.id,
      'name', v.variant_name,
      'price', v.price,
      'available', v.is_available
    )
  ) FILTER (WHERE v.id IS NOT NULL) as variants
FROM products p
LEFT JOIN product_variants v ON p.id = v.product_id
WHERE p.id = $1
GROUP BY p.id;
```

---

## Data Integrity Rules

1. **Referential Integrity**: ON DELETE RESTRICT para products→categories (no borrar categoría con productos)
2. **Cascade Deletes**: ON DELETE CASCADE para variants→products (borrar variantes al borrar producto)
3. **Check Constraints**: Precios >= 0, nombres no vacíos
4. **Unique Constraints**: category.slug, settings.key, variant_name por producto
5. **Default Values**: Timestamps automáticos, booleanos con defaults sensatos
6. **Triggers**: Auto-update de `updated_at` en products y settings

---

**Status**: ✅ Data model completo y validado contra requisitos
