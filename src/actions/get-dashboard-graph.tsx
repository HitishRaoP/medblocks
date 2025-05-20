import { initDatabase } from '@/db/pglite';

type Graph = {
  day: string;
  Inpatient: number;
  Outpatient: number;
  Emergency: number;
  Discharged: number;
}[];

export async function getDashboardGraph() {
  try {
    const db = await initDatabase();
    const { rows } = await db.query<Graph>(`
            SELECT
              TO_CHAR(a.date, 'Dy') AS day,
              COUNT(*) FILTER (WHERE p.status = 'Inpatient') AS "Inpatient",
              COUNT(*) FILTER (WHERE p.status = 'Outpatient') AS "Outpatient",
              COUNT(*) FILTER (WHERE p.status = 'Emergency') AS "Emergency",
              COUNT(*) FILTER (WHERE p.status = 'Discharged') AS "Discharged"
            FROM appointment a
            JOIN treatment t ON a.treatment_id = t.id
            JOIN patient p ON t.patient_id = p.id
            GROUP BY TO_CHAR(a.date, 'Dy')
            ORDER BY MIN(a.date);
          `);

    return rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
