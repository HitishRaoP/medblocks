import { getAllPatients } from '@/actions/get-all-patients';
import { PatientMain } from '@/components/patient/patient-main';
import React from 'react';

const PatientsPage = async () => {
	const response = await getAllPatients();

	return <PatientMain patients={response} />;
};

export default PatientsPage;
