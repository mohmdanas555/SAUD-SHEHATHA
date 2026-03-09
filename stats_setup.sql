-- Insert Dynamic Stats Content
INSERT INTO content (id, value) VALUES 
('stats_1_value', '15'),
('stats_1_suffix', '+'),
('stats_1_label', 'Years of Legacy'),

('stats_2_value', '250'),
('stats_2_suffix', '+'),
('stats_2_label', 'Completed Developments'),

('stats_3_value', '12'),
('stats_3_suffix', 'M+'),
('stats_3_label', 'Sq. Ft. Developed'),

('stats_4_value', '100'),
('stats_4_suffix', '%'),
('stats_4_label', 'Safety Record')
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;
