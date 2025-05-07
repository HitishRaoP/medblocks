'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	treatmentFormSchema,
	TreatmentFormType,
} from '@/schemas/treatment-form-schema';
import { upsertTreatment } from '@/actions/upsert-treatment';
import toast from 'react-hot-toast';
import { PGliteWithLive } from '@electric-sql/pglite/live';

export const useTreatmentForm = (db: PGliteWithLive) => {
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
			const response = await upsertTreatment(db, values);
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
