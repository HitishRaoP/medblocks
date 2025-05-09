import React from 'react';
import { PatientDetailsMain } from '@/components/patient/patient-detailed-main';

const PatientDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	return <PatientDetailsMain id={id} />;
};

export default PatientDetailsPage;
