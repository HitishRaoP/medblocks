"use server";

import { getDB } from "@/db/pglite";
import { Appointment } from "@/types";

export const getAppointmentsForPatient = async (patientId: string) => {
    const QUERY = `
        SELECT a.*
        FROM appointment a
        INNER JOIN treatment t ON a.treatment_id = t.id
        WHERE t.patient_id = $1
        ORDER BY a.date DESC, a.start_time DESC
    `;

    try {
        const db = await getDB();
        const response = await db.query<Appointment>(QUERY, [patientId]);
        return response.rows;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
