-- ===================================================================
-- Seed Data for Tienda DID E-Commerce
-- Created: 2025-11-25
-- Description: Inserts default categories and system settings
-- Run after: 001_initial_schema.sql, 002_rls_policies.sql
-- ===================================================================

-- ===================================================================
-- CATEGORIES - 6 default categories (RF-02)
-- ===================================================================
INSERT INTO categories (name, slug) VALUES
  ('Abarrotes', 'abarrotes'),
  ('Bebidas', 'bebidas'),
  ('Productos de aseo', 'productos-de-aseo'),
  ('Snacks y dulces', 'snacks-y-dulces'),
  ('Lácteos y refrigerados', 'lacteos-y-refrigerados'),
  ('Otros', 'otros')
ON CONFLICT (slug) DO NOTHING;

-- ===================================================================
-- SETTINGS - System configuration
-- ===================================================================
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '573235725922'),
  ('store_name', 'Tienda DID'),
  ('store_address', 'Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar'),
  ('closing_hour', '22'), -- 10 PM (22:00)
  ('delivery_enabled', 'true'),
  ('pickup_enabled', 'true')
ON CONFLICT (key) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = NOW();

-- ===================================================================
-- Optional: Sample Products (for testing/demo)
-- Uncomment to seed sample data
-- ===================================================================
/*
-- Get category IDs for reference
DO $$
DECLARE
  cat_bebidas UUID;
  cat_abarrotes UUID;
  prod_coca UUID;
BEGIN
  -- Get category UUIDs
  SELECT id INTO cat_bebidas FROM categories WHERE slug = 'bebidas';
  SELECT id INTO cat_abarrotes FROM categories WHERE slug = 'abarrotes';

  -- Sample Product 1: Coca-Cola (with variants)
  INSERT INTO products (name, description, category_id, unit_type, has_variants, is_available)
  VALUES ('Coca-Cola', 'Bebida gaseosa', cat_bebidas, 'unit', true, true)
  RETURNING id INTO prod_coca;

  -- Coca-Cola variants
  INSERT INTO product_variants (product_id, variant_name, price, is_available) VALUES
    (prod_coca, '250ml', 2000, true),
    (prod_coca, '400ml', 3000, true),
    (prod_coca, '1.5L', 5500, true),
    (prod_coca, '3L', 9000, true);

  -- Sample Product 2: Arroz Diana (no variants)
  INSERT INTO products (name, description, category_id, unit_type, has_variants, base_price, is_available)
  VALUES ('Arroz Diana x 500g', 'Arroz de calidad', cat_abarrotes, 'weight', false, 3500, true);

END $$;
*/

-- ===================================================================
-- Verification Queries
-- ===================================================================
-- To verify seed data was inserted correctly:

-- Check categories
-- SELECT * FROM categories ORDER BY name;

-- Check settings
-- SELECT * FROM settings ORDER BY key;

-- Check sample products (if uncommented)
-- SELECT p.*, c.name as category_name FROM products p
-- JOIN categories c ON p.category_id = c.id;

-- Check product variants (if uncommented)
-- SELECT pv.*, p.name as product_name FROM product_variants pv
-- JOIN products p ON pv.product_id = p.id;
