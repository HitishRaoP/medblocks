import { PGliteWithLive } from '@electric-sql/pglite/live';

export async function getAllRecords<T>(
	db: PGliteWithLive,
	table: 'patient' | 'staff' | 'appointment' | 'treatment',
) {
	let QUERY = `SELECT * FROM ${table}`;

	if (table === 'appointment') {
		QUERY = `
            SELECT
                a.*,
                to_jsonb(p) AS patient,
                to_jsonb(s) AS staff,
                to_jsonb(t) AS treatment
            FROM appointment a
            JOIN treatment t ON a.treatment_id = t.id
            JOIN patient p ON t.patient_id = p.id
            JOIN staff s ON t.doctor_id = s.id
        `;
	}

	try {
		const response = await db.query<T>(QUERY);
		return {
			count: response.rows.length,
			data: response.rows,
		};
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
