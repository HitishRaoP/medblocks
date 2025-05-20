"use client"


import { getAllRecords } from '@/actions/get-all-records';
import { useDatabaseContext } from '@/components/providers/pglite-provider';
import { StaffMain } from '@/components/staff/staff-main';
import { type Staff } from '@/types';
import { useQuery } from '@tanstack/react-query';

const StaffListPage = () => {
    const { isLoading, isInitialized } = useDatabaseContext();

    const { data: staffData, isLoading: isStaffLoading } = useQuery({
        queryKey: ['staff'],
        queryFn: () => getAllRecords<Staff>('staff'),
        enabled: isInitialized
    });

    if (isLoading || isStaffLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return <StaffMain staff={staffData?.data ?? []} count={staffData?.count ?? 0} />;
};

export { StaffListPage };