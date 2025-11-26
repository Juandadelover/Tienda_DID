-- ===================================================================
-- Migration 004: Update Placeholder Images
-- Created: 2025-11-26
-- Description: Replace via.placeholder.com URLs with picsum.photos
-- Purpose: Fix image loading issues due to external service downtime
-- ===================================================================

-- Update all products using via.placeholder.com to use picsum.photos
UPDATE products
SET image_url = REPLACE(image_url, 'https://via.placeholder.com/300x300?text=', 'https://picsum.photos/300/300?random=')
WHERE image_url LIKE 'https://via.placeholder.com/%';

-- Optional: Log the changes
-- SELECT 'Updated ' || COUNT(*) || ' product images to picsum.photos' as message
-- FROM products
-- WHERE image_url LIKE 'https://picsum.photos/%';