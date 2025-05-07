import { faker } from '@faker-js/faker';
import { Genders, PatientStatuses, StaffTypes, WeekDays } from '@/types/enums';
import { Patient, Staff } from '@/types';
import { PGliteWithLive } from '@electric-sql/pglite/live';

async function patients(db: PGliteWithLive) {
    for (let i = 0; i < 10; i++) {
        await db.query(
            `INSERT INTO patient (
            id, first_name, last_name, dob, gender, phone, email, address,
            emergency_contact, insurance_provider, insurance_number, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                faker.string.uuid(),
                faker.person.firstName(),
                faker.person.lastName(),
                faker.date.birthdate({ min: 1950, max: 2005, mode: "year" }).toISOString().split("T")[0],
                faker.helpers.arrayElement(Genders),
                faker.phone.number({ style: "national" }),
                faker.internet.email(),
                faker.location.streetAddress(),
                faker.phone.number({ style: "national" }),
                faker.company.name(),
                faker.string.alphanumeric(10),
                faker.helpers.arrayElement(PatientStatuses)
            ]
        );
    }
    console.log('Seeded Patient records.');
}

async function vitals(db: PGliteWithLive) {
    const patientsResult = await db.query<Patient>(`SELECT id FROM patient`);
    const patientIds = patientsResult.rows.map(row => row.id);

    for (const patientId of patientIds) {
        await db.query(
            `INSERT INTO vitals (
                id, patient_id, recorded_at, temperature, systolic_bp, diastolic_bp, pulse, spo2
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                faker.string.uuid(),
                patientId,
                faker.date.recent().toISOString(),
                parseFloat(faker.number.float({ min: 97, max: 100 }).toFixed(1)),
                faker.number.int({ min: 100, max: 140 }),
                faker.number.int({ min: 60, max: 90 }),
                faker.number.int({ min: 60, max: 100 }),
                faker.number.int({ min: 95, max: 100 }),
            ]
        );
    }
    console.log('Seeded Vitals records.');
}

async function staff(db: PGliteWithLive) {
    for (let i = 0; i < 10; i++) {
        await db.query(
            `INSERT INTO staff (
          id, first_name, last_name, specialization, phone, email, address, working_days, type, kmc
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
                faker.string.uuid(),
                faker.person.firstName(),
                faker.person.lastName(),
                faker.person.jobTitle(),
                faker.phone.number({ style: "national" }),
                faker.internet.email(),
                faker.location.streetAddress(),
                faker.helpers.shuffle(WeekDays).slice(0, Math.floor(Math.random() * 5) + 1),
                faker.helpers.arrayElement(StaffTypes),
                faker.string.alphanumeric(10).toUpperCase(),
            ]
        );
    }
    console.log('Seeded Staff records.');
}

async function treatments(db: PGliteWithLive) {
    const patientsResult = await db.query<Patient>(`SELECT id FROM patient`);
    const staffResult = await db.query<Staff>(`SELECT id FROM staff`);

    const patientsIds = patientsResult.rows.map((row) => row.id);
    const staffIds = staffResult.rows.map((row) => row.id);

    for (let i = 0; i < 10; i++) {
        const patientId = faker.helpers.arrayElement(patientsIds);
        const doctorId = faker.helpers.arrayElement(staffIds);

        await db.query(
            `INSERT INTO treatment (
                id, name, description, patient_id, doctor_id, price, duration
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                faker.string.uuid(),
                faker.lorem.words(3),
                faker.lorem.sentence(6),
                patientId,
                doctorId,
                parseFloat(faker.commerce.price()),
                Math.floor(Math.random() * 120) + 30,
            ]
        );
    }
    console.log('Seeded Treatment records.');
}

export async function appointments(db: PGliteWithLive) {
    const treatmentsResult = await db.query<{ id: string }>(`SELECT id FROM treatment`);
    const treatmentIds = treatmentsResult.rows.map((row) => row.id);

    const visitTracker: Record<string, Set<number>> = {};

    for (let i = 0; i < 20; i++) {
        const treatmentId = faker.helpers.arrayElement(treatmentIds);
        const date = faker.date.soon();
        const startTime = faker.date.anytime();
        const endTime = faker.date.future();

        if (!visitTracker[treatmentId]) {
            visitTracker[treatmentId] = new Set();
        }
        let visitNumber: number;
        let attempts = 0;
        do {
            visitNumber = Math.floor(Math.random() * 100) + 1;
            attempts++;
        } while (visitTracker[treatmentId].has(visitNumber) && attempts < 10);

        if (visitTracker[treatmentId].has(visitNumber)) continue;

        visitTracker[treatmentId].add(visitNumber);

        await db.query(
            `INSERT INTO appointment (
                id, treatment_id, date, start_time, end_time, status, visit_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                faker.string.uuid(),
                treatmentId,
                date.toISOString().split('T')[0],
                startTime.toISOString().split('T')[1].split('.')[0],
                endTime.toISOString().split('T')[1].split('.')[0],
                faker.helpers.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
                visitNumber
            ]
        );
    }

    console.log('Seeded Appointment records.');
}


export async function seed(db: PGliteWithLive) {
    await Promise.all([await patients(db), await vitals(db), await staff(db), await treatments(db), await appointments(db)]);
}

