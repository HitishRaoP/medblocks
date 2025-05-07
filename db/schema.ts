import { PGliteWithLive } from "@electric-sql/pglite/live";

export async function schema(db: PGliteWithLive) {
    try {
        const res = await db.exec(`
            -- Create ENUM for appointment status only if it doesn't exist
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
                    CREATE TYPE appointment_status AS ENUM ('Scheduled', 'Completed', 'Cancelled');
                END IF;
            END $$;

            -- Patient Table
            CREATE TABLE IF NOT EXISTS patient (
                id TEXT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                dob DATE NOT NULL,
                gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
                phone VARCHAR(15) NOT NULL,
                email VARCHAR(100) NOT NULL,
                address TEXT,
                emergency_contact VARCHAR(100),
                insurance_provider VARCHAR(100),
                insurance_number VARCHAR(50),
                status VARCHAR(15) CHECK (status IN ('Inpatient', 'Outpatient', 'Discharged', 'Emergency'))
            );

            CREATE TABLE IF NOT EXISTS vitals (
                id TEXT PRIMARY KEY,
                patient_id TEXT REFERENCES patient(id),
                temperature NUMERIC,
                systolic_bp INTEGER,
                diastolic_bp INTEGER,
                pulse INTEGER,
                spo2 INTEGER,
                recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Staff Table
            CREATE TABLE IF NOT EXISTS staff (
                id TEXT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                specialization VARCHAR(100),
                phone VARCHAR(15) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                address TEXT NOT NULL,
                working_days TEXT[] DEFAULT '{}' NOT NULL,
                type TEXT CHECK (type IN ('Full_time', 'Part_time')),
                kmc VARCHAR(50) UNIQUE NOT NULL
            );

            -- Treatment Table
            CREATE TABLE IF NOT EXISTS treatment (
                id TEXT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(200),
                patient_id TEXT NOT NULL REFERENCES patient(id) ON DELETE CASCADE,
                doctor_id TEXT NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
                price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
                duration INTEGER NOT NULL CHECK (duration > 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Appointment Table
            CREATE TABLE IF NOT EXISTS appointment (
                id TEXT PRIMARY KEY,
                treatment_id TEXT NOT NULL REFERENCES treatment(id) ON DELETE CASCADE,
                date DATE NOT NULL,
                start_time TEXT NOT NULL,
                end_time TEXT NOT NULL,
                status appointment_status NOT NULL DEFAULT 'Scheduled',
                notes TEXT,
                visit_number INTEGER NOT NULL CHECK (visit_number > 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(treatment_id, visit_number)
            );
        `);
        console.log("Schema executed:", res);
    } catch (error) {
        console.error("Error executing schema:", error);
    }
}
