"use server"

import { getDB } from "@/db/pglite";
import { Patient } from "@/types";

export async function getAllPatients() {
    const QUERY = `SELECT * FROM patient`;

    try {
        const db = await getDB()
        const response = await db.query<Patient>(QUERY);
        return {
            count: response.rows.length,
            data: response.rows
        }
    } catch (error) {
        throw new Error((error as Error).message)
    }
}