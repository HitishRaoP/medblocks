import { PGliteWorker } from "@electric-sql/pglite/worker";

export async function schema(db: PGliteWorker) {
    try {
        console.log("Starting schema creation");

        await db.query(`
            CREATE TABLE IF NOT EXISTS patient (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                dob TEXT NOT NULL,
                gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
                phone TEXT NOT NULL,
                email TEXT NOT NULL,
                address TEXT,
                emergency_contact TEXT,
                insurance_provider TEXT,
                insurance_number TEXT,
                status TEXT CHECK (status IN ('Inpatient', 'Outpatient', 'Discharged', 'Emergency'))
            );
`)
        await db.query(`
            CREATE TABLE IF NOT EXISTS vitals (
                id TEXT PRIMARY KEY,
                patient_id TEXT,
                temperature TEXT,
                systolic_bp TEXT,
                diastolic_bp TEXT,
                pulse TEXT,
                spo2 TEXT,
                recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(patient_id) REFERENCES patient(id)
            );
        `)

        await db.query(`
            CREATE TABLE IF NOT EXISTS staff (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                specialization TEXT,
                phone TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                working_days TEXT DEFAULT '', -- comma-separated values
                type TEXT CHECK (type IN ('Full_time', 'Part_time')),
                kmc TEXT UNIQUE NOT NULL
            );
            `)

        await db.query(`
            CREATE TABLE IF NOT EXISTS treatment (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                patient_id TEXT NOT NULL,
                doctor_id TEXT NOT NULL,
                price TEXT NOT NULL,
                duration TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(patient_id) REFERENCES patient(id) ON DELETE CASCADE,
                FOREIGN KEY(doctor_id) REFERENCES staff(id) ON DELETE CASCADE
            );
            `)

        await db.query(`
            CREATE TABLE IF NOT EXISTS appointment (
                id TEXT PRIMARY KEY,
                treatment_id TEXT NOT NULL,
                date TEXT NOT NULL,
                start_time TEXT NOT NULL,
                end_time TEXT NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')) DEFAULT 'Scheduled',
                notes TEXT,
                visit_number TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(treatment_id) REFERENCES treatment(id) ON DELETE CASCADE,
                UNIQUE(treatment_id, visit_number)
            );
        `);

        console.log("Schema executed successfully.");
    } catch (error) {
        console.error("Error executing schema:", error);
    }
}
