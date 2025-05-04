"use client"

import React from 'react';
import { PatientInfoCard } from './patient-info-card';
import { ProfileMini } from '../treatment/profile-mini';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PatientAppointments } from './patient-appointments';
import PatientVitals from './patient-vitals';
import { useQuery } from '@tanstack/react-query';
import { getRecordFromId } from '@/actions/get-record-from-id';
import { Patient, Vitals } from '@/types';

export const PatientDetailsMain = ({ id }: { id: string }) => {
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
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-muted-foreground'>
							Patient Appointments
						</CardTitle>
					</CardHeader>
					<CardContent className='flex'>
						<PatientAppointments id={id} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
