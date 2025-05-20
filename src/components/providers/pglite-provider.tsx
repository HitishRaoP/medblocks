import { initDatabase } from '@/db/pglite';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DatabaseContextType = {
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;
};
const DatabaseContext = createContext<DatabaseContextType>({
    isLoading: true,
    isInitialized: false,
    error: null,
});
export const useDatabaseContext = () => useContext(DatabaseContext);

export const PgliteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initDatabase();
                setIsInitialized(true);
                setError(null);
            } catch (err) {
                console.error('Failed to initialize database:', err);
                setError('Failed to initialize database. Please refresh the page and try again.');
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, []);
    
    return (
        <DatabaseContext.Provider value={{ isLoading, isInitialized, error }}>
            {children}
        </DatabaseContext.Provider>
    );
};