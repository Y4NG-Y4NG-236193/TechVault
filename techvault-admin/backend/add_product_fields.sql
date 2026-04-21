-- Migration Script: Add Product Images and Specifications tables in TechVault schema
-- Ensure these are run in the Supabase SQL Editor

-- 1. Create Product_Images table
CREATE TABLE IF NOT EXISTS "TechVault"."Product_Images" (
    image_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES "TechVault"."Products"(product_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Product_Specifications table
CREATE TABLE IF NOT EXISTS "TechVault"."Product_Specifications" (
    spec_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES "TechVault"."Products"(product_id) ON DELETE CASCADE,
    spec_key JSONB NOT NULL, -- This will hold the entire specifications object
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Update Indexes (Optional but recommended for performance)
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON "TechVault"."Product_Images"(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specs_product_id ON "TechVault"."Product_Specifications"(product_id);

-- Note: In Supabase Dashboard, make sure to create a storage bucket named 'products' 
-- and set its policy to public read access.
