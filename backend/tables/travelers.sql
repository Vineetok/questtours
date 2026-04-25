CREATE TABLE travelers (
    traveler_id SERIAL PRIMARY KEY,
    full_legal_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Mr.', 'Mrs.', 'Ms.', 'Mx.')),
    nationality VARCHAR(50) NOT NULL,
    country_of_residence VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Passport fields (merged)
    passport_number VARCHAR(20) UNIQUE,
    issuing_country VARCHAR(50),
    passport_expiry DATE,
    
    -- Health fields (merged)
    has_limitations BOOLEAN DEFAULT FALSE,
    limitation_description TEXT,
    has_allergies BOOLEAN DEFAULT FALSE,
    allergy_details TEXT,
    dietary_restrictions TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
