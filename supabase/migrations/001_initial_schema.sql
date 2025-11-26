-- ===================================================================
-- Migration 001: Initial Schema for Tienda DID E-Commerce
-- Created: 2025-11-25
-- Description: Creates categories, products, product_variants, and settings tables
-- ===================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For fuzzy search

-- ===================================================================
-- Helper Function: update_updated_at_column
-- ===================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- Table: categories
-- Purpose: Organización de productos en categorías predefinidas
-- ===================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT categories_name_not_empty CHECK (char_length(name) > 0),
  CONSTRAINT categories_slug_lowercase CHECK (slug = LOWER(slug))
);

-- Índices para categories
CREATE INDEX idx_categories_slug ON categories(slug);

COMMENT ON TABLE categories IS 'Categorías de productos de Tienda DID';
COMMENT ON COLUMN categories.slug IS 'URL-friendly identifier';

-- ===================================================================
-- Table: products
-- Purpose: Información principal de productos de la tienda
-- ===================================================================
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

-- Índices para products
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = true;
CREATE INDEX idx_products_name_trgm ON products USING gin (name gin_trgm_ops);
CREATE INDEX idx_products_updated_at ON products(updated_at DESC);

-- Trigger para updated_at en products
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE products IS 'Productos del catálogo de Tienda DID';
COMMENT ON COLUMN products.unit_type IS 'unit (por unidad) o weight (por peso)';
COMMENT ON COLUMN products.has_variants IS 'Si tiene variantes, base_price debe ser null';

-- ===================================================================
-- Table: product_variants
-- Purpose: Variantes de productos (tamaños, presentaciones)
-- ===================================================================
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

-- Índices para product_variants
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_available ON product_variants(is_available) WHERE is_available = true;

COMMENT ON TABLE product_variants IS 'Variantes de productos (ej: tamaños, presentaciones)';
COMMENT ON COLUMN product_variants.variant_name IS 'Nombre único por producto (ej: "250ml", "1L")';

-- ===================================================================
-- Table: settings
-- Purpose: Configuraciones del sistema
-- ===================================================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT settings_key_not_empty CHECK (char_length(key) > 0)
);

-- Trigger para updated_at en settings
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Índice para settings
CREATE INDEX idx_settings_key ON settings(key);

COMMENT ON TABLE settings IS 'Configuraciones del sistema (horario, WhatsApp, etc.)';
COMMENT ON COLUMN settings.value IS 'Valores almacenados como texto (parsear en aplicación)';
