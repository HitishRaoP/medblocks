'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { PatientFormType, PatientSchema } from '@/schemas/patient-form-schema';
import { upsertPatient } from '@/actions/upsert-patient';

export const usePatientForm = () => {
	const form = useForm<PatientFormType>({
		resolver: zodResolver(PatientSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			dob: new Date(),
			gender: 'Male',
			phone: '',
			email: '',
			address: '',
			emergency_contact: '',
			insurance_provider: '',
			insurance_number: '',
			status: 'Outpatient',
			vitals: {
				temperature: '',
				systolic_bp: 0,
				diastolic_bp: 0,
				pulse: 0,
				spo2: 0,
				recorded_at: new Date(),
			},
		},
	});

	async function onSubmit(values: PatientFormType) {
		try {
			const response = await upsertPatient(values);
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
