
import { ClinicDatatable } from '../ui/clinic-data-table';
import { type Appointment } from '@/types';
import { AppointmentColumns } from './appointment-columns';
import { Calendar } from 'lucide-react';
import { AppointmentAddButton } from './appointment-add-button';

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
			addButton={<AppointmentAddButton />}
		/>
	);
};
