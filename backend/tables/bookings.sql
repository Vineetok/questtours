CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    travel_start_date DATE NOT NULL,
    travel_end_date DATE NOT NULL,
    
    -- Group composition
    group_data JSONB,
    
    -- Accommodation
    accommodation_preferences TEXT,
    
    -- Insurance (merged)
    insurance_policy_number VARCHAR(50),
    insurance_provider VARCHAR(100),
    emergency_assistance_phone VARCHAR(20),
    insurance_document_path VARCHAR(255),
    
    -- Payment (merged)
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed')),
    billing_address TEXT,
    last_four_digits VARCHAR(4),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    paid_at TIMESTAMP NULL,
    
    booking_status VARCHAR(20) DEFAULT 'pending' CHECK (booking_status IN ('pending','confirmed','cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);