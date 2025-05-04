"use server";

import { getDB } from "@/db/pglite";

export async function getRecordFromId<T>(id: string, table: "patient" | "staff" | "vitals") {
    const QUERY = `
        SELECT *
        FROM ${table}
        WHERE ${table === 'vitals' ? "patient_id" : "id"} = $1
    `;

    try {
        const db = await getDB();
        const response = await db.query<T>(QUERY, [id]);
        return response.rows.at(0);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
