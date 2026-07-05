-- Seed planetary data

INSERT INTO planets (name, type, size_km, distance_from_sun_km, surface_temperature_celsius, gravity_ms2, orbital_period_days, rotation_period_hours, description, has_rings, moons_count, color_hex, is_habitable)
VALUES 
('Mercury', 'TERRESTRIAL', 4879, 57900000, 167, 3.7, 88, 1407, 'The smallest planet in our solar system and closest to the Sun.', FALSE, 0, '#A5A5A5', FALSE),
('Venus', 'TERRESTRIAL', 12104, 108200000, 464, 8.87, 225, -5832, 'Second planet from the Sun and the hottest planet in our solar system.', FALSE, 0, '#E3BB76', FALSE),
('Earth', 'TERRESTRIAL', 12742, 149600000, 15, 9.81, 365, 24, 'Our home planet and the only place we know of so far that’s inhabited by living things.', FALSE, 1, '#2B82C9', TRUE),
('Moon', 'LUNAR', 3474, 384400, -20, 1.62, 27, 655, 'Earth’s only natural satellite, a barren, cratered world.', FALSE, 0, '#D3D3D3', FALSE),
('Mars', 'TERRESTRIAL', 6779, 227900000, -65, 3.71, 687, 25, 'A dusty, cold, desert world with a very thin atmosphere.', FALSE, 2, '#E27B58', FALSE),
('Jupiter', 'GAS_GIANT', 139820, 778600000, -110, 24.79, 4333, 10, 'The largest planet in our solar system — more than twice as massive as all the other planets combined.', TRUE, 79, '#D39C7E', FALSE),
('Saturn', 'GAS_GIANT', 116460, 1433500000, -140, 10.44, 10759, 11, 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.', TRUE, 82, '#C5AB6E', FALSE),
('Uranus', 'ICE_GIANT', 50724, 2872500000, -195, 8.69, 30687, -17, 'An ice giant, nearly four times larger than Earth.', TRUE, 27, '#BBE1E4', FALSE),
('Neptune', 'ICE_GIANT', 49244, 4495100000, -201, 11.15, 60190, 16, 'Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.', TRUE, 14, '#6081FF', FALSE);
