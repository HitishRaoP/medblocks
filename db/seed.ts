import { faker } from '@faker-js/faker';
import { Genders, PatientStatuses, StaffTypes, WeekDays } from '@/types/enums';
import { getDB } from './pglite';


async function patients() {
    const db = await getDB();
    for (let i = 0; i < 10; i++) {
        await db.query(
            `
            INSERT INTO patient (
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
    console.log('Seeded staff records.');
}
async function seed() {
    await Promise.all([
        await patients(),
        await staff()
    ])
}

seed();
