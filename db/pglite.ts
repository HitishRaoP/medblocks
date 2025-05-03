import { PGlite } from "@electric-sql/pglite"
import { live, PGliteWithLive } from "@electric-sql/pglite/live";

/**
 * Singleton approach like prisma
 * Reference for creating the instance
  * https://www.youtube.com/watch?v=AvJGFsYpQdI&t=588s
 */
let db: PGliteWithLive;
export async function getDB() {
  if (db) {
    return db;
  }
  const liveDB = await PGlite.create("file://E:/projects/is/medblocks/db/database", {
    extensions: {
      live
    },
  });
  await liveDB.waitReady;
  db = liveDB;
  return db;
}