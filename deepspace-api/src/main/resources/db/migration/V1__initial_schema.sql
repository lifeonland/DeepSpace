-- Initial schema for Deep Space Explorer

CREATE TABLE IF NOT EXISTS planets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(100) NOT NULL,
    size_km INTEGER,
    distance_from_sun_km BIGINT,
    surface_temperature_celsius INTEGER,
    gravity_ms2 DOUBLE PRECISION,
    orbital_period_days INTEGER,
    rotation_period_hours INTEGER,
    description TEXT,
    has_rings BOOLEAN DEFAULT FALSE,
    moons_count INTEGER DEFAULT 0,
    color_hex VARCHAR(7),
    is_habitable BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS simulations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    simulation_type VARCHAR(100),
    planet_id BIGINT REFERENCES planets(id),
    speed_multiplier DOUBLE PRECISION DEFAULT 1.0,
    duration_seconds INTEGER,
    status VARCHAR(50),
    parameters JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
