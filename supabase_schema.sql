-- Create projects table
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  span text DEFAULT 'md:col-span-1 md:row-span-1',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  author text NOT NULL,
  date text NOT NULL,
  excerpt text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create content table
CREATE TABLE content (
  id text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default content
INSERT INTO content (id, value) VALUES 
('hero_headline', 'Built for Integrity'),
('hero_description', 'A legacy construction firm defined by structural precision.'),
('about_page_headline', 'A Legacy Defined by Structural Integrity'),
('about_page_description', 'For over 15 years, Saud Shehatha Construction has been a cornerstone of the region''s architectural landscape...'),
('stats_completed', '150+'),
('stats_engineers', '300+'),
('stats_awards', '25+')
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- Note: Storage buckets and policies should be created via Supabase Dashboard or API, as storage schema is usually protected.
-- If using raw SQL for storage policies, ensure you have enabled RLS:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public Uploads Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
-- CREATE POLICY "Anon Insert Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');
-- CREATE POLICY "Anon Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads');
-- CREATE POLICY "Anon Delete Access" ON storage.objects FOR DELETE USING (bucket_id = 'uploads');
