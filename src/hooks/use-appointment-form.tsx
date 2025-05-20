'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
	type AppointmentFormType,
	appointmentSchema,
} from '@/schemas/appointment-form-schema';
import { upsertAppointment } from '@/actions/upsert-appointment';
import { useQueryClient } from '@tanstack/react-query';

export const useAppointmentForm = () => {
	const queryClient = useQueryClient();
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
			await Promise.all(
				values.appointments.map(async (a) => {
					const response = await upsertAppointment(values, a.treatment_id);
					return response;
				})
			);
			await queryClient.invalidateQueries({ queryKey: ['appointments'] });
			toast.success('Appointments updated successfully');
		} catch (error) {
			toast.error((error as Error).message);
		}
	}

	return {
		form,
		onSubmit,
	};
};
