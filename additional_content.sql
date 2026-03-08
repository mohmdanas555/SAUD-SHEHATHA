-- ============================================================
-- ADDITIONAL PROJECTS & BLOGS — Append to existing data
-- Run this AFTER setup_all_tables.sql has been executed
-- ============================================================

-- ============================================================
-- 6 MORE DUMMY PROJECTS (total will be 12)
-- ============================================================
INSERT INTO projects (title, category, image, span, description, location, area, year, status, duration, value, highlights) VALUES
(
  'The Pearl Residences',
  'Luxury Residential',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  'md:col-span-2 md:row-span-2',
  'A premium 32-floor residential tower in the heart of Abu Dhabi, featuring 196 luxury units with floor-to-ceiling windows and panoramic sea views. The project includes a rooftop infinity pool, concierge services, and an underground retail piazza. Saud Shehatha oversaw all civil and structural works from enabling to final handover.',
  'Al Reem Island, Abu Dhabi',
  '41,000 sqm GFA',
  '2023',
  'Completed',
  '30 months',
  'AED 980 Million',
  ARRAY['196 luxury units with sea views', 'Rooftop infinity pool', 'Underground retail piazza', 'Full concierge and valet services', 'Smart home automation in all units', 'LEED Silver certified']
),
(
  'SkyBridge Commerce Centre',
  'Mixed-Use Development',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'A striking twin-tower mixed-use complex connected by an elevated 3-storey sky bridge at level 28. Tower A houses Grade A commercial offices while Tower B comprises luxury serviced apartments. The landmark sky bridge contains a restaurant, event space, and an observation deck with 360-degree views over Downtown Dubai.',
  'Sheikh Zayed Road, Dubai',
  '72,000 sqm GFA',
  '2021',
  'Completed',
  '38 months',
  'AED 1.9 Billion',
  ARRAY['Twin-tower connected by sky bridge at level 28', 'Grade A commercial offices', 'Luxury serviced apartments', 'Sky bridge restaurant and observation deck', '360-degree panoramic views', 'LEED Gold certified']
),
(
  'Sharjah Cultural District Masterplan',
  'Civic and Cultural',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
  'md:col-span-2 md:row-span-1',
  'A landmark civic masterplan spanning 14 hectares, encompassing a performing arts centre, an international art museum, a public library, open plazas, and waterfront promenades. Designed to become the cultural heart of Sharjah, this development required complex phasing across three construction packages. Saud Shehatha led the infrastructure and superstructure delivery.',
  'Al Majaz Waterfront, Sharjah',
  '14 hectares site',
  '2024',
  'Ongoing',
  '60 months',
  'AED 4.2 Billion',
  ARRAY['14 hectares civic masterplan', 'Performing arts centre (2,200 seats)', 'International art museum', 'Public library and research centre', 'Waterfront promenades and plazas', 'Three phased construction packages']
),
(
  'Falcon Gate Industrial City',
  'Industrial and Logistics',
  'https://images.unsplash.com/photo-1565793979427-5d7e1882addb?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'An integrated industrial city spanning 500,000 sqm, designed to house manufacturing facilities, cold-storage warehouses, hazardous material stores, and a central administration complex. The development includes dedicated heavy-vehicle roads, truck weighbridges, and a worker accommodation village for 4,000 residents. Delivered in two phases.',
  'Jebel Ali Industrial Area, Dubai',
  '500,000 sqm Site',
  '2022',
  'Completed',
  '24 months',
  'AED 750 Million',
  ARRAY['500,000 sqm integrated industrial city', 'Manufacturing and cold-storage facilities', 'Worker accommodation for 4,000 residents', 'Heavy-vehicle dedicated road network', 'Hazardous material storage facilities', 'Delivered in two phases']
),
(
  'Ras Al Khaimah Waterfront Resort',
  'Hospitality',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
  'md:col-span-2 md:row-span-1',
  'A 5-star beachfront resort comprising 340 keys across a main hotel block and 48 standalone beach villas set amongst landscaped gardens. The resort features six dining venues, a destination spa, a PADI-certified dive centre, and a 200-metre private beach. Saud Shehatha managed the full project construction lifecycle for this landmark hospitality asset.',
  'Al Marjan Island, Ras Al Khaimah',
  '85,000 sqm Site',
  '2023',
  'Completed',
  '32 months',
  'AED 1.1 Billion',
  ARRAY['340 keys across hotel and beach villas', '200-metre private beach', 'Six dining and entertainment venues', 'Destination spa and wellness centre', 'PADI-certified dive centre', 'Landscaped tropical gardens']
),
(
  'Deira Integrated Transit Hub',
  'Infrastructure',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
  'md:col-span-1 md:row-span-1',
  'A major infrastructure project connecting metro, bus rapid transit, and water taxi systems under one roof. The 120,000 sqm hub serves as a pedestrian interchange for over 150,000 commuters per day, with integrated retail, F&B, and passenger amenities. The complex required deep basement construction across a live rail corridor — one of the most technically demanding projects in the Saud Shehatha portfolio.',
  'Deira, Dubai',
  '120,000 sqm GFA',
  '2025',
  'Upcoming',
  '54 months',
  'AED 5.8 Billion',
  ARRAY['Integrated metro, BRT, and water taxi hub', '150,000 daily commuter capacity', 'Deep basement across live rail corridor', 'Integrated retail and F&B levels', '120,000 sqm total floor area', 'Most complex infrastructure project in portfolio']
);

-- ============================================================
-- 6 MORE DUMMY BLOG POSTS (total will be 12)
-- ============================================================
INSERT INTO blog_posts (title, category, author, date, excerpt, image) VALUES
(
  'Building on Water: The Engineering of Al Reem Island',
  'Engineering Insights',
  'Saud Shehatha',
  'May 14, 2024',
  'Constructing a 32-floor tower on reclaimed island land in Abu Dhabi presents a unique set of geotechnical challenges. We detail how our team addressed differential settlement risks, designed a deep pile foundation system, and managed dewatering across the entire Pearl Residences site.',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
),
(
  'Designing for Resilience: UAE''s Extreme Heat and Construction',
  'Sustainability',
  'Eng. Khalid Al Mansoori',
  'April 2, 2024',
  'The UAE''s extreme summer heat — with temperatures routinely exceeding 48°C — creates unique concrete curing, worker safety, and material performance challenges. We outline the protocols and material specifications we apply across all our projects to maintain quality in these conditions.',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
),
(
  'How We Delivered a 5-Star Resort in 32 Months',
  'Project Management',
  'Saud Shehatha',
  'March 11, 2024',
  'Hospitality construction demands precision that goes far beyond structural quality — every finish, fitting, and fixture must meet brand standards while adhering to a tight program. Here''s how our team delivered the Ras Al Khaimah Waterfront Resort on time and to international 5-star specifications.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
),
(
  'The Art of Phasing: Managing Multi-Package Mega Projects',
  'Project Management',
  'Eng. Mohammed Al Rashidi',
  'February 17, 2024',
  'Mega project delivery across multiple construction packages demands rigorous interface management, master scheduling, and cross-package coordination. Using the Sharjah Cultural District as a case study, we explore the systems and governance structures that make phased delivery work.',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
),
(
  'BIM: How Digital Twins Are Transforming Our Sites',
  'Technology',
  'Saud Shehatha',
  'January 8, 2024',
  'Building Information Modelling has moved from a planning tool to a live site management system. We share how we are now streaming real-time sensor data into our project BIM models, enabling proactive quality control and predictive maintenance even before buildings are handed over.',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800'
),
(
  'Safety Culture: Zero LTI Across 3 Million Work Hours',
  'Health and Safety',
  'Eng. Khalid Al Mansoori',
  'December 4, 2023',
  'Achieving zero Lost Time Injuries across 3 million man-hours on the SkyBridge Commerce Centre project was not accidental. It was the result of systematic safety leadership, behavioural observation programmes, and a positive reporting culture. We detail the framework behind this milestone.',
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800'
);
