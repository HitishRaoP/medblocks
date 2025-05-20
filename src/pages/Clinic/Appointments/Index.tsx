"use client"


import { getAllRecords } from '@/actions/get-all-records';
import { AppointmentMain } from '@/components/appointment/appointment-main';
import { useDatabaseContext } from '@/components/providers/pglite-provider';
import { type AppointmentExtended, } from '@/types';
import { useQuery } from '@tanstack/react-query';


const AppointmentPage = () => {
    const { isInitialized } = useDatabaseContext();

    const { data: appointments, isLoading: isAppointmentsLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => getAllRecords<AppointmentExtended>('appointment'),
        enabled: isInitialized
    });

    if (isAppointmentsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }


    return (
        <AppointmentMain
            appointments={appointments?.data ?? []}
            count={appointments?.count ?? 0} />
    );
};

export { AppointmentPage };
