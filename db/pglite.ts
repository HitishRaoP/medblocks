"use server"

import { PGlite } from "@electric-sql/pglite"
import { live, PGliteWithLive } from "@electric-sql/pglite/live";
import { loadEnvConfig } from '@next/env'
import path from "path";

loadEnvConfig(path.resolve(__dirname, "../"));
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
  const liveDB = await PGlite.create(process.env.DB_PATH, {
    extensions: {
      live
    },
  });
  await liveDB.waitReady;
  db = liveDB;
  return db;
}