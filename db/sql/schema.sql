CREATE TABLE IF NOT EXISTS patient (
    id TEXT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(100),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(50),
    status VARCHAR(10) CHECK (status IN ('Inpatient', 'Outpatient', 'Discharged', 'Emergency'))
);

CREATE TABLE IF NOT EXISTS staff (
    id TEXT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    specialization VARCHAR(100),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    kmc VARCHAR(50) UNIQUE NOT NULL
);
