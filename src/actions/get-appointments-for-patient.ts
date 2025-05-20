import { initDatabase } from '@/db/pglite';
import { type AppointmentExtended } from '@/types';

export const getAppointmentsForPatient = async (
  patientId: string,
) => {
  const db = await initDatabase();
  const QUERY = `
        SELECT a.*,
          to_jsonb(p) AS patient,
          to_jsonb(s) AS staff,
          to_jsonb(t) AS treatment
        FROM appointment a
        JOIN treatment t ON a.treatment_id = t.id
        JOIN patient p ON t.patient_id = p.id
        JOIN staff s ON t.doctor_id = s.id
        WHERE t.patient_id = $1
        ORDER BY a.date DESC, a.start_time DESC
    `;

  try {
    const response = await db.query<AppointmentExtended>(QUERY, [patientId]);
    return response.rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
