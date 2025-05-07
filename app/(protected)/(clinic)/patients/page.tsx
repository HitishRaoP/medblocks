"use client"

import { PatientMain } from '@/components/patient/patient-main';
import { Patient } from '@/types';
import { useLiveQuery } from '@electric-sql/pglite-react';
import React from 'react';

const PatientsPage = () => {
	const { rows } = useLiveQuery(
		'SELECT * FROM patient'
	) ?? {};

	return (
		<PatientMain
			patients={rows as unknown as Patient[] ?? []}
			count={rows?.length ?? 0}
		/>
	);
};

export default PatientsPage;
