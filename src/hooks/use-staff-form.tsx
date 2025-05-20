'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { type StaffFormType, StaffSchema } from '@/schemas/staff-form-schema';
import { upsertStaff } from '@/actions/upsert-staff';
import { useQueryClient } from '@tanstack/react-query';

export const useStaffForm = () => {
    const queryClient = useQueryClient();
    const form = useForm<StaffFormType>({
        resolver: zodResolver(StaffSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: '',
            working_days: [],
            type: 'Full_time',
            kmc: '',
            specialization: '',
        },
    });

    console.log(form.formState.errors);
    async function onSubmit(values: StaffFormType) {
        try {
            const response = await upsertStaff(values);
            await queryClient.invalidateQueries({ queryKey: ['staff'] });
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
