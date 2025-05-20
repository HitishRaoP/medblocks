import { PGliteWorker } from '@electric-sql/pglite/worker';
import { schema } from './schema';

let db: PGliteWorker | null = null;

export const initDatabase = async (): Promise<PGliteWorker> => {
    if (!db) {
        try {
            const workerInstance = new Worker(new URL('/worker.js', import.meta.url), {
                type: 'module',
            });
            db = new PGliteWorker(workerInstance);
            await schema(db);
        } catch (error) {
            console.error("Failed to initialize database:", error);
            throw error;
        }
    }
    return db;
};