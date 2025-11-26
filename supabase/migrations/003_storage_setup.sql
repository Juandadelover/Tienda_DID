-- ===================================================================
-- Migration 003: Storage Bucket Configuration
-- Created: 2025-11-25
-- Description: Creates product-images bucket with RLS policies
-- Purpose: Store product images uploaded by admin
-- Constraints: 5MB max, JPG/PNG/WebP only
-- ===================================================================

-- ===================================================================
-- Create Storage Bucket: product-images
-- ===================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true, -- Public bucket (anyone can view)
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp'] -- Allowed formats
)
ON CONFLICT (id) DO NOTHING;

-- ===================================================================
-- STORAGE POLICIES: product-images bucket
-- ===================================================================

-- Public: Anyone can SELECT (view) images
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Admin: Only authenticated users can INSERT (upload) images
CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

-- Admin: Only authenticated users can UPDATE images
CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

-- Admin: Only authenticated users can DELETE images
CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

-- ===================================================================
-- File Naming Convention (Documentation)
-- ===================================================================
-- product-images/
--   ├── {product_id}.webp        # Main product image
--   ├── {product_id}_thumb.webp  # Thumbnail (optional)
--   └── ...
-- 
-- Example: product-images/550e8400-e29b-41d4-a716-446655440000.webp
-- ===================================================================
