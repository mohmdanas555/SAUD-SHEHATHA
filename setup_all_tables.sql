-- ============================================================
-- FULL SETUP SCRIPT — Run this in Supabase SQL Editor
-- ============================================================

-- 1. DROP & RECREATE projects table with full detail fields
DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  category text NOT NULL,
  image text,
  span text DEFAULT 'md:col-span-1 md:row-span-1',
  description text,
  location text,
  area text,
  year text,
  status text DEFAULT 'Completed',
  duration text,
  value text,
  gallery text[],
  highlights text[]
);

-- 2. DROP & RECREATE blog_posts table
DROP TABLE IF EXISTS blog_posts CASCADE;
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  date text NOT NULL,
  excerpt text NOT NULL,
  content text,
  image text
);

-- 3. Create settings table (key-value store)
CREATE TABLE IF NOT EXISTS settings (
  id text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- DISABLE RLS
-- ============================================================
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- DUMMY PROJECT DATA
-- ============================================================
INSERT INTO projects (title, category, image, span, description, location, area, year, status, duration, value, highlights) VALUES
(
  'The Opus Tower',
  'Commercial High-Rise',
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
  'md:col-span-2 md:row-span-2',
  'A landmark 52-storey commercial tower in the heart of Dubai''s business district. Designed to achieve LEED Gold certification, it features a double-skin glass facade, sky gardens, and a rooftop terrace offering panoramic city views. Saud Shehatha oversaw structural engineering, project phasing, and contractor coordination from groundbreaking to handover.',
  'Business Bay, Dubai',
  '58,000 sqm GFA',
  '2022',
  'Completed',
  '34 months',
  'AED 1.2 Billion',
  ARRAY['LEED Gold Certified', 'Double-skin glass facade', 'Basement spanning 6 levels', '52 floors above ground', 'Rooftop helipad', 'Central chiller plant integration']
),
(
  'Al Fattan Downtown Residences',
  'Luxury Residential',
  'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'An exclusive 38-floor luxury residential tower comprising 280 premium apartments and 12 sky villas with private pools. The development integrates a podium retail space, an infinity pool, and a state-of-the-art wellness spa. Saud Shehatha managed value engineering that resulted in a 12% cost saving without compromising quality.',
  'Downtown Dubai',
  '32,500 sqm GFA',
  '2021',
  'Completed',
  '28 months',
  'AED 850 Million',
  ARRAY['280 premium apartments and 12 sky villas', 'Private pools in sky villas', 'Podium retail level', 'Infinity edge pool', '5-star wellness spa', '12% value engineering saving']
),
(
  'Oasis Hub Corporate Campus',
  'Corporate Campus',
  'https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&q=80&w=800',
  'md:col-span-2 md:row-span-1',
  'A sprawling 8-building corporate campus designed for a major UAE conglomerate, encompassing executive offices, R&D labs, training centers, and staff amenities. The campus features sustainable transport links, shaded pedestrian pathways, and district cooling. The project required coordination of over 40 subcontractors simultaneously.',
  'Dubai Science Park',
  '95,000 sqm Site',
  '2023',
  'Completed',
  '42 months',
  'AED 2.1 Billion',
  ARRAY['8 interconnected buildings', 'R&D and innovation labs', 'Staff gymnasium and cafeteria', 'District cooling system', 'EV charging infrastructure', '3,500-person campus capacity']
),
(
  'Jumeirah Heights Towers',
  'Residential Towers',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'Twin 44-storey residential towers connected by a sky bridge at the 30th floor, offering over 600 apartments ranging from studios to 4-bedroom units. The development features a shared podium club, resort-style pools, and direct access to the Jumeirah waterfront. Saud Shehatha led all structural and MEP coordination.',
  'Jumeirah Beach Residence, Dubai',
  '64,000 sqm GFA',
  '2020',
  'Completed',
  '36 months',
  'AED 1.6 Billion',
  ARRAY['Twin 44-storey towers', 'Sky bridge connection at level 30', '600+ apartments across all sizes', 'Resort-style podium club', 'Direct waterfront access', 'Seismic isolation base']
),
(
  'Marina Zenith Skyscraper',
  'Iconic Skyscraper',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  'md:col-span-2 md:row-span-1',
  'Currently the tallest building in the Marina district at 78 storeys, the Marina Zenith is a mixed-use icon comprising hotel suites, branded residences, and a sky lounge at level 74. With its spiraling architectural form, the structure required advanced wind-load engineering solutions and custom-fabricated high-strength steel connections.',
  'Dubai Marina',
  '78,000 sqm GFA',
  '2024',
  'Ongoing',
  '48 months',
  'AED 3.4 Billion',
  ARRAY['78 floors — tallest in Marina', 'Mixed hotel and branded residences', 'Sky lounge at level 74', 'Spiral architectural form', 'Advanced wind-load analysis', 'Custom high-strength steel connections']
),
(
  'Al Qudra Industrial Logistics Hub',
  'Industrial and Logistics',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'A 15-warehouse logistics park covering 200,000 sqm of gross floor area, designed for heavy industrial use with 14-metre clear heights, drive-through loading bays, and integrated truck weighbridges. The project was fast-tracked in 18 months to meet the client''s operational deadlines. Saud Shehatha directed phased handover for early occupancy.',
  'Al Qudra, Dubai',
  '200,000 sqm GFA',
  '2022',
  'Completed',
  '18 months',
  'AED 480 Million',
  ARRAY['15 warehouses over 200,000 sqm', '14m clear internal height', 'Drive-through loading bays', 'Integrated weighbridges', 'Phased handover for early occupancy', 'CCTV and security command centre']
);

-- ============================================================
-- DUMMY BLOG POSTS
-- ============================================================
INSERT INTO blog_posts (title, category, author, date, excerpt, image) VALUES
(
  'How We Delivered The Opus Tower 3 Months Ahead of Schedule',
  'Project Management',
  'Saud Shehatha',
  'November 12, 2024',
  'A behind-the-scenes look at the planning, coordination, and leadership that allowed our team to overcome supply chain disruptions and deliver one of Dubai''s most ambitious commercial towers before the contracted completion date.',
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800'
),
(
  'Sustainable Construction: Our Approach to LEED Certification',
  'Sustainability',
  'Eng. Khalid Al Mansoori',
  'October 5, 2024',
  'Over the past decade, we have integrated sustainable construction practices into every major project. In this piece, we explore the strategies, materials, and engineering decisions that have earned three of our developments LEED Gold status.',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800'
),
(
  'The Engineering Challenge Behind Marina Zenith''s Spiral Form',
  'Engineering Insights',
  'Saud Shehatha',
  'September 18, 2024',
  'A 78-storey spiral skyscraper presents unique structural challenges — from customized wind tunnel testing to non-standard steel connections. We share the technical journey of solving one of the most complex structural briefs our team has faced.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
),
(
  'Value Engineering Without Compromise: Lessons from Al Fattan',
  'Cost Management',
  'Eng. Mohammed Al Rashidi',
  'August 22, 2024',
  'On the Al Fattan Downtown Residences project, our team identified AED 102 million in value engineering opportunities — none of which compromised the luxury finish or structural integrity. Here is how we approached that process.',
  'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800'
),
(
  'Managing 40+ Subcontractors: Coordination at Scale',
  'Project Management',
  'Saud Shehatha',
  'July 9, 2024',
  'The Oasis Hub Corporate Campus required simultaneous coordination of 42 specialist subcontractors across 8 buildings. What systems, communication structures, and quality gates did we put in place to maintain schedule and quality at that scale?',
  'https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&q=80&w=800'
),
(
  'The Future of High-Rise Construction in Dubai',
  'Industry Insights',
  'Eng. Khalid Al Mansoori',
  'June 3, 2024',
  'Dubai continues to set new benchmarks in architectural ambition. We analyse the trends shaping the next decade of high-rise construction: modular building systems, AI-driven project management, and the growing role of environmental performance in client briefs.',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
);

-- ============================================================
-- SETTINGS DUMMY DATA
-- ============================================================
INSERT INTO settings (id, value) VALUES
('company_name', 'Saud Shehatha Construction'),
('company_tagline', 'Engineering Legacy. Defining Skylines.'),
('company_email', 'info@saudshehatha.ae'),
('company_phone', '+971 4 123 4567'),
('company_whatsapp', '+971 50 123 4567'),
('company_address', 'Level 22, The Exchange Tower, Business Bay, Dubai, UAE'),
('company_logo_url', ''),
('company_favicon_url', ''),
('social_linkedin', 'https://linkedin.com/company/saud-shehatha-construction'),
('social_instagram', 'https://instagram.com/saudshehatha'),
('social_twitter', 'https://twitter.com/saudshehatha'),
('social_youtube', ''),
('map_embed_code', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1779703703327!2d55.26516131500898!3d25.186689183899255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d4e14f5b4b%3A0xb7d854d35fc5c6c4!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'),
('meta_description', 'Saud Shehatha Construction — a legacy of structural precision, delivering landmark commercial, residential and industrial developments across the UAE.')
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;
