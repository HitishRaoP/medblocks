import { getAllRecords } from '@/actions/get-all-records';
import { TreatmentMain } from '@/components/treatment/treatment-main';
import { Treatment } from '@/types';
import React from 'react';

const TreatmentsPage = async () => {
	const response = await getAllRecords<Treatment>('treatment')

	return <TreatmentMain treatments={response.data} count={response.count} />;
};

export default TreatmentsPage;
