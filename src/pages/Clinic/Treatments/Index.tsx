"use client"

import { getAllRecords } from '@/actions/get-all-records';
import { useDatabaseContext } from '@/components/providers/pglite-provider';
import { TreatmentMain } from '@/components/treatment/treatment-main';
import { type Treatment } from '@/types';
import { useQuery } from '@tanstack/react-query';

const TreatmentsPage = () => {
    const { isLoading, isInitialized } = useDatabaseContext();

    const { data: treatmentsData, isLoading: isTreatmentsLoading } = useQuery({
        queryKey: ['treatments'],
        queryFn: () => getAllRecords<Treatment>('treatment'),
        enabled: isInitialized
    });

    if (isLoading || isTreatmentsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return <TreatmentMain treatments={treatmentsData?.data ?? []} count={treatmentsData?.count ?? 0} />;
};

export { TreatmentsPage };