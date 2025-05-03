"use server"

import { getDB } from "@/db/pglite";
import { Staff } from "@/types";

export async function getAllStaff() {
    const QUERY = `SELECT * FROM staff`;

    try {
        const db = await getDB()
        const response = await db.query<Staff>(QUERY);
        return {
            count: response.rows.length,
            data: response.rows
        }
    } catch (error) {
        throw new Error((error as Error).message)
    }
}