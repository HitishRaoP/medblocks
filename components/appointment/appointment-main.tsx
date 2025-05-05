import React from 'react';
import { ClinicDatatable } from '../ui/clinic-data-table';
import { Appointment } from '@/types';
import { AppointmentColumns } from './appointment-columns';
import { Calendar } from 'lucide-react';

export const AppointmentMain = ({
	appointments,
	count,
}: {
	appointments: Appointment[];
	count: number;
}) => {
	return (
		<ClinicDatatable
			icon={<Calendar />}
			columns={AppointmentColumns}
			data={appointments}
			title={'Appointment'}
			count={count}
			searchKey={'status'}
		/>
	);
};
