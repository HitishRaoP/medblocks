import { getAllRecords } from '@/actions/get-all-records';
import { AppointmentMain } from '@/components/appointment/appointment-main';
import { Appointment } from '@/types';
import React from 'react';

const AppointmentPage = async () => {
	const response = await getAllRecords<Appointment>('appointment');

	return <AppointmentMain appointments={response.data} count={response.count} />;
};

export default AppointmentPage;
