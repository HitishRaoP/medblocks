import { faker } from '@faker-js/faker';
import { getDB } from '../pglite';

async function seed() {
    const db = await getDB();
    
    for (let i = 0; i < 10; i++) {
        await db.query(
            `INSERT INTO patient (
            id, first_name, last_name, dob, gender, phone, email, address,
            emergency_contact, insurance_provider, insurance_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
                faker.string.uuid(),
                faker.person.firstName(),
                faker.person.lastName(),
                faker.date.birthdate({ min: 1950, max: 2005, mode: "year" }).toISOString().split("T")[0],
                faker.helpers.arrayElement(["Male", "Female", "Other"]),
                faker.phone.number({ style: "national" }),
                faker.internet.email(),
                faker.location.streetAddress(),
                faker.phone.number({ style: "national" }),
                faker.company.name(),
                faker.string.alphanumeric(10),
            ]
        );
    }
}

seed();
