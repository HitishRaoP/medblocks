import path from "path";
import fs from "fs";
import { getDB } from "../pglite";

/**
 * Patient
 */
async function schema() {
    try {
        const db = await getDB();
        const sql = fs.readFileSync(path.resolve(__dirname, "../", "sql/", "schema.sql"), "utf-8");
        const res = await db.exec(sql);
        console.log("Schema executed:", res);
    } catch (error) {
        console.error("Error executing schema:", error);
    }
}

schema();
