import { faker } from '@faker-js/faker';
import { Genders, PatientStatuses, StaffTypes, WeekDays, AppointmentStatus } from '@/types/enums';
import { getDB } from './pglite';
import { Patient, Staff, Treatment } from '@/types';

// Function to seed patients
async function patients() {
    const db = await getDB();
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

// Function to seed staff (doctors)
async function staff() {
    const db = await getDB();
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

// Function to seed treatments (linked to patients and staff)
async function treatments() {
    const db = await getDB();
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
                Math.floor(Math.random() * 120) + 30, // duration in minutes
            ]
        );
    }
    console.log('Seeded Treatment records.');
}

// Function to seed appointments (linked to treatments)
async function appointments() {
    const db = await getDB();
    const treatmentsResult = await db.query<Treatment>(`SELECT id FROM treatment`);

    const treatmentsIds = treatmentsResult.rows.map((row) => row.id);

    for (let i = 0; i < 20; i++) {
        const treatmentId = faker.helpers.arrayElement(treatmentsIds);
        const date = faker.date.soon();
        const startTime = faker.date.anytime();
        const endTime = faker.date.future();

        await db.query(
            `INSERT INTO appointment (
                id, treatment_id, date, start_time, end_time, status, visit_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                faker.string.uuid(),
                treatmentId,
                date.toISOString().split('T')[0], // Date in yyyy-mm-dd format
                startTime.toISOString().split('T')[1].split('.')[0], // Time in HH:mm:ss format
                endTime.toISOString().split('T')[1].split('.')[0], // Time in HH:mm:ss format
                faker.helpers.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
                Math.floor(Math.random() * 5) + 1
            ]
        );
    }
    console.log('Seeded Appointment records.');
}

// Main function to call all seed functions
async function seed() {
    await Promise.all([patients(), staff(), treatments(), appointments()]);
}

seed();
