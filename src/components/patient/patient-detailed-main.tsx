'use client';


import { PatientInfoCard } from './patient-info-card';
import { ProfileMini } from '../treatment/profile-mini';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import PatientVitals from './patient-vitals';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsForPatient } from '@/actions/get-appointments-for-patient';
import { Appointments } from '../common/appointments';
import { type AppointmentExtended } from '@/types';

export const PatientDetailsMain = ({ id }: { id: string }) => {
	const { data } = useQuery({
		queryKey: ['Appointments'],
		queryFn: () => getAppointmentsForPatient(id),
	});

	return (
		<div>
			<ProfileMini id={id} user={'patient'} />
			<PatientVitals id={id} />
			<div className="flex flex-col gap-4 md:flex-row">
				<div className="w-full lg:w-3/5">
					<Card>
						<CardHeader>
							<CardTitle className="text-muted-foreground">
								Patient Information
							</CardTitle>
						</CardHeader>
						<CardContent className="flex">
							<PatientInfoCard id={id} />
						</CardContent>
					</Card>
				</div>
				<div className="w-full lg:w-2/5">
					<Appointments
						role='patient'
						appointments={data as AppointmentExtended[]}
					/>
				</div>
			</div>
		</div>
	);
};
