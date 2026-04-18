CREATE TABLE IF NOT EXISTS public."Products" (
  product_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  brand TEXT,
  category_id UUID,
  stock INTEGER DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Enable Row Level Security (RLS) if you want to restrict frontend access directly.
-- But since backend uses service key, it works regardless.
ALTER TABLE public."Products" ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read and insert (since this is an admin panel)
CREATE POLICY "Enable read access for all users" ON public."Products" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public."Products" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public."Products" FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public."Products" FOR DELETE USING (true);
