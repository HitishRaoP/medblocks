'use client';


import { ProfileMini } from '../treatment/profile-mini';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Appointments } from '../common/appointments';
import { useQuery } from '@tanstack/react-query';
import { type AppointmentExtended } from '@/types';
import { getAppointmentsForStaff } from '@/actions/get-appointments-for-staff';
import { StaffInfoCard } from './staff-info-card';

export const StaffDetailedMain = ({ id }: { id: string }) => {
	const { data } = useQuery({
		queryKey: ['Appointments'],
		queryFn: () => getAppointmentsForStaff(id),
	});

	return (
		<div>
			<ProfileMini id={id} user={'staff'} />
			<div className="flex flex-col gap-4 md:flex-row">
				<div className="w-full lg:w-3/5">
					<Card>
						<CardHeader>
							<CardTitle className="text-muted-foreground">
								Patient Information
							</CardTitle>
						</CardHeader>
						<CardContent className="flex">
							<StaffInfoCard id={id} />
						</CardContent>
					</Card>
				</div>
				<div className="w-full lg:w-2/5">
					<Appointments
						role="staff"
						appointments={data as AppointmentExtended[]}
					/>
				</div>
			</div>
		</div>
	);
};
