-- ===================================================================
-- Migration 002: Row Level Security (RLS) Policies
-- Created: 2025-11-25
-- Description: Enables RLS and creates policies for all tables
-- Security: Public READ, Authenticated WRITE for all tables
-- ===================================================================

-- ===================================================================
-- Enable RLS on all tables
-- ===================================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- CATEGORIES POLICIES
-- Public: SELECT (everyone can view)
-- Admin: INSERT, UPDATE, DELETE (authenticated users only)
-- ===================================================================

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

-- ===================================================================
-- PRODUCTS POLICIES
-- Public: SELECT (everyone can view catalog)
-- Admin: INSERT, UPDATE, DELETE (authenticated users only)
-- ===================================================================

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

-- ===================================================================
-- PRODUCT_VARIANTS POLICIES
-- Public: SELECT (everyone can view variants)
-- Admin: INSERT, UPDATE, DELETE (authenticated users only)
-- ===================================================================

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

-- ===================================================================
-- SETTINGS POLICIES
-- Public: SELECT (only safe keys: store_name, address, hours, etc.)
-- Admin: UPDATE (authenticated users can modify settings)
-- Note: No INSERT or DELETE - settings are seeded and managed by admin
-- ===================================================================

CREATE POLICY "Public settings are viewable"
  ON settings FOR SELECT
  USING (
    key IN (
      'store_name', 
      'store_address', 
      'closing_hour', 
      'delivery_enabled', 
      'pickup_enabled',
      'whatsapp_number'
    )
  );

CREATE POLICY "Settings are updatable by authenticated users"
  ON settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ===================================================================
-- Verification Query
-- ===================================================================
-- To verify policies are active, run:
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';
