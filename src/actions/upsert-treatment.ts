import { v4 as uuid } from 'uuid';
import { type TreatmentFormType } from '@/schemas/treatment-form-schema';
import { initDatabase } from '@/db/pglite';

export async function upsertTreatment(
	treatment: TreatmentFormType,
	treatmentId?: string,
) {
	const db = await initDatabase()
	const generatedTreatmentId = treatmentId ?? uuid();
	try {
		await db.transaction(async (tx) => {
			await tx.query(
				`
        INSERT INTO treatment (id, name, description, patient_id, doctor_id, price, duration)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          patient_id = EXCLUDED.patient_id,
          doctor_id = EXCLUDED.doctor_id,
          price = EXCLUDED.price,
          duration = EXCLUDED.duration
        `,
				[
					generatedTreatmentId,
					treatment.name,
					treatment.description ?? null,
					treatment.patientId,
					treatment.doctorId,
					String(treatment.price),
					String(treatment.duration),
				],
			);

			if (treatment.appointments?.length) {
				for (const appointment of treatment.appointments) {
					const appointmentId = uuid();
					await tx.query(
						`
            INSERT INTO appointment (
              id, treatment_id, date, start_time, end_time, status, notes, visit_number
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (treatment_id, visit_number) DO UPDATE SET
              date = EXCLUDED.date,
              start_time = EXCLUDED.start_time,
              end_time = EXCLUDED.end_time,
              status = EXCLUDED.status,
              notes = EXCLUDED.notes
            `,
						[
							appointmentId,
							generatedTreatmentId,
							appointment.date,
							appointment.start_time,
							appointment.end_time,
							appointment.status,
							appointment.notes ?? null,
							String(appointment.visit_number),
						],
					);
				}
			}
		});

		return {
			message: `Treatment updated successfully`,
			treatmentId: generatedTreatmentId,
		};
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
