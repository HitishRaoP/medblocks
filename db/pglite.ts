import { PGlite } from "@electric-sql/pglite"
import { live, PGliteWithLive } from "@electric-sql/pglite/live";
import { schema } from "@/db/schema";

/**
 * Singleton approach like prisma
 * Reference for creating the instance
  * https://www.youtube.com/watch?v=AvJGFsYpQdI&t=588s
 */

let db: PGliteWithLive;
let isInitialized = false;

export async function getDB() {
  if (db && isInitialized) {
    return db;
  }

  const channel = new BroadcastChannel("db-sync");

  return new Promise<PGliteWithLive>(async (resolve) => {
    if (db && isInitialized) {
      return resolve(db);
    }

    channel.onmessage = async (event) => {
      if (event.data === "seeded") {
        const liveDB = await PGlite.create("idb://database", {
          extensions: { live },
        });
        await liveDB.waitReady;
        db = liveDB;
        await schema(db); // ensure schema even in other tabs
        isInitialized = true;
        resolve(db);
      }
    };

    if (!db) {
      const liveDB = await PGlite.create("idb://database", {
        extensions: { live },
      });
      await liveDB.waitReady;

      db = liveDB;
      await schema(db);

      const result = await db.query<{ count: string }>(`SELECT COUNT(*) as count FROM patient`);
      const alreadySeeded = parseInt(result.rows?.[0]?.count || "0", 10) > 0;

      if (!alreadySeeded) {
        console.log("[DB] Seeding now...");
        await import("@/db/seed").then((mod) => mod.seed(db));
        channel.postMessage("seeded");
      }

      isInitialized = true;
      resolve(db);
    }
  });
}
