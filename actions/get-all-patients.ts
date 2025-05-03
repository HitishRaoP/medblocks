"use server"

import { getDB } from "@/db/pglite";
import { Patient } from "@/types";

export async function getAllPatients() {
    try {
        const db = await getDB()
        const response = await db.query<Patient>(`SELECT * FROM patient`);
        return response.rows
    } catch (error) {
        throw new Error((error as Error).message)
    }
}