'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { StaffFormType, StaffSchema } from '@/schemas/staff-form-schema';
import { upsertStaff } from '@/actions/upsert-staff';
import { Staff } from '@/types';
import { PGliteWithLive } from '@electric-sql/pglite/live';

export const useStaffForm = (db: PGliteWithLive) => {
    const form = useForm<StaffFormType>({
        resolver: zodResolver(StaffSchema),
        defaultValues: {
            id: '',
            first_name: '',
            last_name: '',
            specialization: '',
            phone: '',
            email: '',
            address: '',
            working_days: [],
            type: 'Full_time',
            kmc: '',
        },
    });

    async function onSubmit(values: Staff) {
        try {
            const response = await upsertStaff(db, values);
            toast.success(response.message);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return {
        form,
        onSubmit,
    };
};
