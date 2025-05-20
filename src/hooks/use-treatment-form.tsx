'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	treatmentFormSchema,
	type TreatmentFormType,
} from '@/schemas/treatment-form-schema';
import { upsertTreatment } from '@/actions/upsert-treatment';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useTreatmentForm = () => {
	const queryClient = useQueryClient();
	const form = useForm<TreatmentFormType>({
		resolver: zodResolver(treatmentFormSchema),
		defaultValues: {
			name: '',
			description: '',
			appointments: [],
			patientId: '',
			doctorId: '',
			price: 0,
			duration: 1,
		},
	});

	async function onSubmit(values: TreatmentFormType) {
		try {
			const response = await upsertTreatment(values);
			await queryClient.invalidateQueries({ queryKey: ['treatments'] });
			await queryClient.invalidateQueries({ queryKey: ['appointments'] });
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
