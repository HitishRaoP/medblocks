"use server";

import { v4 as uuid } from "uuid";
import { getDB } from "@/db/pglite";
import { PatientFormType } from "@/schemas/patient-form-schema";

export async function upsertPatient(patient: PatientFormType, patient_id?: string) {
    const db = await getDB();
    const id = patient_id ?? uuid();

    try {
        await db.query(
            `
      INSERT INTO patient (
        id, first_name, last_name, dob, gender,
        phone, email, address, emergency_contact,
        insurance_provider, insurance_number, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        dob = EXCLUDED.dob,
        gender = EXCLUDED.gender,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        address = EXCLUDED.address,
        emergency_contact = EXCLUDED.emergency_contact,
        insurance_provider = EXCLUDED.insurance_provider,
        insurance_number = EXCLUDED.insurance_number,
        status = EXCLUDED.status
    `,
            [
                id,
                patient.first_name,
                patient.last_name,
                patient.dob,
                patient.gender,
                patient.phone,
                patient.email,
                patient.address ?? null,
                patient.emergency_contact ?? null,
                patient.insurance_provider ?? null,
                patient.insurance_number ?? null,
                patient.status,
            ]
        );

        const vitalsId = uuid();
        const v = patient.vitals;

        await db.query(
            `
      INSERT INTO vitals (
        id, patient_id, temperature, systolic_bp, diastolic_bp,
        pulse, spo2, recorded_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        temperature = EXCLUDED.temperature,
        systolic_bp = EXCLUDED.systolic_bp,
        diastolic_bp = EXCLUDED.diastolic_bp,
        pulse = EXCLUDED.pulse,
        spo2 = EXCLUDED.spo2,
        recorded_at = EXCLUDED.recorded_at
    `,
            [
                vitalsId,
                id,
                v.temperature,
                v.systolic_bp,
                v.diastolic_bp,
                v.pulse,
                v.spo2,
                v.recorded_at,
            ]
        );

        return { message: "Patient and vitals upserted successfully", patientId: id };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
