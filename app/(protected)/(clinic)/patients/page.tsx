import { getAllRecords } from '@/actions/get-all-records';
import { PatientMain } from '@/components/patient/patient-main';
import { Patient } from '@/types';
import React from 'react';

const PatientsPage = async () => {
	const response = await getAllRecords<Patient>('patient');

	return <PatientMain patients={response.data} count={response.count} />;
};

export default PatientsPage;
