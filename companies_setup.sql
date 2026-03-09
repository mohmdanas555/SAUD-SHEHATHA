-- 1. Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  subtitle text,
  description text,
  image text,
  mission text,
  vision text,
  services text[],
  website_url text,
  contact_email text,
  contact_phone text,
  created_at timestamptz DEFAULT now()
);

-- 2. Disable RLS for easy admin access (consistent with existing tables)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;

-- 3. Insert Dummy Data for Royal Arrow and Royal Wooden
INSERT INTO companies (name, slug, subtitle, description, image, mission, vision, services, contact_email, contact_phone)
VALUES 
(
  'Royal Arrow', 
  'royal-arrow', 
  'Premier Architectural Aluminum & Glass Solutions',
  'Royal Arrow is a leading specialist in high-end architectural aluminum systems and structural glass. We provide innovative cladding, curtain walls, and bespoke glazing solutions for iconic skyscrapers and luxury residential towers across the UAE.',
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
  'To redefine architectural boundaries through precision engineering and advanced glass technology.',
  'To be the region''s most trusted partner for complex building facades and structural glazing.',
  ARRAY['Curtain Wall Systems', 'Structural Glazing', 'Aluminum Cladding', 'Skylights & Canopies', 'Automated Door Systems'],
  'info@royalarrow.ae',
  '+971 4 123 4567'
),
(
  'Royal Wooden', 
  'royal-wooden', 
  'Exquisite Interior Joinery & Fit-out',
  'Royal Wooden specializes in premium interior joinery, custom furniture, and high-end fit-out services. With a state-of-the-art manufacturing facility, we deliver bespoke wooden interiors that define luxury for commercial spaces, five-star hotels, and private palaces.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  'To craft timeless interior spaces through traditional craftsmanship and modern precision.',
  'To lead the luxury fit-out industry with sustainable and innovative wooden solutions.',
  ARRAY['Bespoke Joinery', 'Luxury Fit-out', 'Custom Furniture', 'Fire-Rated Doors', 'Wall Paneling & Acoustic Solutions'],
  'contact@royalwooden.ae',
  '+971 4 765 4321'
)
ON CONFLICT (slug) DO NOTHING;
