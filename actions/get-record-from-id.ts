'use server';

import { getDB } from '@/db/pglite';

type Table = 'patient' | 'staff' | 'vitals' | 'appointment';

const columns: Record<Table, string> = {
	patient: 'id',
	staff: 'id',
	vitals: 'patient_id',
	appointment: 'treatment_id',
};

export async function getRecordFromId<T>(id: string, table: Table) {
	const column = columns[table];
	const QUERY = `SELECT * FROM ${table} WHERE ${column} = $1`;

	try {
		const db = await getDB();
		const response = await db.query<T>(QUERY, [id]);
		return response.rows.at(0);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
