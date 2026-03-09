-- 1. Create the 'uploads' bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files in the 'uploads' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'uploads' );

-- 3. Allow public (anonymous) users to upload files to the 'uploads' bucket
-- Note: In a production app, you should restrict this to authenticated users.
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'uploads' );
