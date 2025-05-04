"use server";

import { getDB } from "@/db/pglite";
import { Results } from "@electric-sql/pglite";

export async function getRecordFromId<T>(id: string, table: "patient" | "staff") {
    const QUERY = `
        SELECT *
        FROM ${table}
        WHERE id = $1
    `;

    try {
        const db = await getDB();
        const response = await db.query<T>(QUERY, [id]);
        return response.rows.at(0);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
