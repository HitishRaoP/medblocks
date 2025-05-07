"use client"

import { getDB } from "@/db/pglite";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGliteWithLive } from "@electric-sql/pglite/live";
import { useEffect, useState } from "react";

export const PgliteProvider = ({ children }: { children: React.ReactNode }) => {
    const [db, setDb] = useState<PGliteWithLive | null>(null);

    useEffect(() => {
        getDB().then(setDb);
    }, []);

    if (!db) return null;

    return (
        <PGliteProvider db={db}>
            {children}
        </PGliteProvider>
    )
}