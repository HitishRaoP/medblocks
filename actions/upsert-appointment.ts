import { v4 as uuid } from 'uuid';
import { AppointmentFormType } from '@/schemas/appointment-form-schema';
import { PGliteWithLive } from '@electric-sql/pglite/live';

export async function upsertAppointment(
	db: PGliteWithLive,
	appointments: AppointmentFormType,
	treatmentId?: string,
) {
	const generatedId = treatmentId ?? uuid();

	try {
		for (const appointment of appointments.appointments) {
			await db.query(
				`
        INSERT INTO appointment (
          id, treatment_id, date, start_time, end_time, status, notes, visit_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (treatment_id, visit_number) DO UPDATE SET
          date = EXCLUDED.date,
          start_time = EXCLUDED.start_time,
          end_time = EXCLUDED.end_time,
          status = EXCLUDED.status,
          notes = EXCLUDED.notes
      `,
				[
					uuid(),
					generatedId,
					appointment.date,
					appointment.start_time,
					appointment.end_time,
					appointment.status,
					appointment.notes ?? '',
					appointment.visit_number,
				],
			);
		}

		return {
			message: 'Appointments upserted successfully',
			treatmentId: generatedId,
		};
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
