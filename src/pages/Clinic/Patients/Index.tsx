"use client"

import { getAllRecords } from '@/actions/get-all-records';
import { PatientMain } from '@/components/patient/patient-main';
import { useDatabaseContext } from '@/components/providers/pglite-provider';
import { type Patient } from '@/types';
import { useQuery } from '@tanstack/react-query';

const PatientsPage = () => {
    const { isLoading, isInitialized } = useDatabaseContext();

    const { data: patientsData, isLoading: isPatientsLoading } = useQuery({
        queryKey: ['patients'],
        queryFn: () => getAllRecords<Patient>("patient"),
        enabled: isInitialized
    });

    if (isLoading || isPatientsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return <PatientMain patients={patientsData?.data ?? []} count={patientsData?.count ?? 0} />;
};

export { PatientsPage };
