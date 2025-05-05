"use client"

import React from 'react';
import { PatientInfoCard } from './patient-info-card';
import { ProfileMini } from '../treatment/profile-mini';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PatientAppointments } from './patient-appointments';
import PatientVitals from './patient-vitals';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsForPatient } from '@/actions/get-appointments-for-patient';
import { Appointments } from '../common/appointments';
import { AppointmentExtended } from '@/types';

export const PatientDetailsMain = ({ id }: { id: string }) => {
	const { data } = useQuery({
		queryKey: ['Appointments'],
		queryFn: () => getAppointmentsForPatient(id)
	});

	return (
		<div>
			<ProfileMini id={id} user={'patient'} />
			<PatientVitals id={id} />
			<div className='flex flex-col md:flex-row gap-4'>
				<Card className='md:min-w-3xl'>
					<CardHeader>
						<CardTitle className='text-muted-foreground'>
							Patient Information
						</CardTitle>
					</CardHeader>
					<CardContent className='flex'>
						<PatientInfoCard id={id} />
					</CardContent>
				</Card>
				<Appointments role='patient' appointments={data as AppointmentExtended[]} />
			</div>
		</div>
	);
};
