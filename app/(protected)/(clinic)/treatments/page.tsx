"use client"

import { TreatmentMain } from '@/components/treatment/treatment-main';
import { Treatment } from '@/types';
import { useLiveQuery } from '@electric-sql/pglite-react';
import React from 'react';

const TreatmentsPage = () => {
	const { rows } = useLiveQuery(
		'SELECT * FROM treatment'
	) ?? {};

	const treatments = (rows as unknown as Treatment[]) ?? [];

	return <TreatmentMain treatments={treatments} count={treatments.length} />;
};

export default TreatmentsPage;
