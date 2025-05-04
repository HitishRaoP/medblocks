"use server"

import { getDB } from "@/db/pglite";

export async function getAllRecords<T>(table: 'patient' | 'staff' | 'appointment' |'treatment') {
    const QUERY = `SELECT * FROM ${table}`;

    try {
        const db = await getDB()
        const response = await db.query<T>(QUERY);
        return {
            count: response.rows.length,
            data: response.rows
        }
    } catch (error) {
        throw new Error((error as Error).message)
    }
}