import { PGlite } from "@electric-sql/pglite"
import { live } from "@electric-sql/pglite/live";

/**
 * Reference for creating the instance
  * https://www.youtube.com/watch?v=AvJGFsYpQdI&t=588s
 */
let db: PGlite;
export async function getDB() {
  if (db) {
    return db;
  }
  const liveDB = new PGlite(process.env.DB_URI, {
    extensions: {
      live
    },
  });
  await liveDB.waitReady;
  db = liveDB;
  return db;
}