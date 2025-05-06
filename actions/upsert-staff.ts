'use server';

import { v4 as uuid } from 'uuid';
import { getDB } from '@/db/pglite';
import { StaffFormType } from '@/schemas/staff-form-schema';

export async function upsertStaff(staff: StaffFormType, staff_id?: string) {
	const db = await getDB();
	const id = staff_id ?? uuid();

	try {
		await db.query(
			`
      INSERT INTO staff (
        id, first_name, last_name, specialization,
        phone, email, address, working_days, type, kmc
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        specialization = EXCLUDED.specialization,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        address = EXCLUDED.address,
        working_days = EXCLUDED.working_days,
        type = EXCLUDED.type,
        kmc = EXCLUDED.kmc
    `,
			[
				id,
				staff.first_name,
				staff.last_name,
				staff.specialization ?? null,
				staff.phone,
				staff.email,
				staff.address,
				staff.working_days,
				staff.type,
				staff.kmc,
			],
		);

		return { message: 'Staff upserted successfully', staffId: id };
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
