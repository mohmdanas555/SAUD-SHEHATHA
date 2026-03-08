-- Run this in your Supabase SQL Editor to fix Row-Level Security!

-- By default, Supabase creates tables securely, blocking Anonymous (anon) inserts. 
-- Since your app communicates with Supabase using the Anon API Key via the browser, 
-- it got rejected when trying to save or insert items.

-- The fastest fix for this UI is to disable Row-Level Security. (You have your own auth built in the Admin panel anyway).

ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE content DISABLE ROW LEVEL SECURITY;

-- If you also faced issues with Storage Bucket Uploads, run this to make the storage public and allow uploads:
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public view" ON storage.objects;

CREATE POLICY "Allow public view"
ON storage.objects FOR SELECT
USING ( bucket_id = 'uploads' );

CREATE POLICY "Allow public insert"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'uploads' );

CREATE POLICY "Allow public update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'uploads' );

CREATE POLICY "Allow public delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'uploads' );
