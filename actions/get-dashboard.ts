import { PGliteWithLive } from '@electric-sql/pglite/live';

export async function getDashboard(db: PGliteWithLive) {
	try {
		const [patients, appointments, treatments, staff] = await Promise.all([
			db.query<{ count: string }>(`SELECT COUNT(*) AS count FROM patient`),
			db.query<{ count: string }>(`SELECT COUNT(*) AS count FROM appointment`),
			db.query<{ count: string }>(`SELECT COUNT(*) AS count FROM treatment`),
			db.query<{ count: string }>(`SELECT COUNT(*) AS count FROM staff`),
		]);

		return {
			'Total Patients': parseInt(patients.rows[0].count),
			'Total Appointments': parseInt(appointments.rows[0].count),
			'Total Treatments': parseInt(treatments.rows[0].count),
			'Total Staff': parseInt(staff.rows[0].count),
		};
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
