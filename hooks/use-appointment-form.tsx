'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
	AppointmentFormType,
	appointmentSchema,
} from '@/schemas/appointment-form-schema';
import { upsertAppointment } from '@/actions/upsert-appointment';
import { PGliteWithLive } from '@electric-sql/pglite/live';

export const useAppointmentForm = (db: PGliteWithLive,) => {
	const form = useForm<AppointmentFormType>({
		resolver: zodResolver(appointmentSchema),
		defaultValues: {
			appointments: [
				{
					treatment_id: '',
					date: new Date(),
					start_time: '',
					end_time: '',
					notes: '',
					status: 'Scheduled',
					visit_number: 1,
				},
			],
		},
	});

	async function onSubmit(values: AppointmentFormType) {
		try {
			values.appointments.map(async (a) => {
				const response = await upsertAppointment(db, values, a.treatment_id);
				toast.success(response.message);
			});
		} catch (error) {
			toast.error((error as Error).message);
		}
	}

	return {
		form,
		onSubmit,
	};
};
