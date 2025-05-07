"use client"

import { AppointmentMain } from '@/components/appointment/appointment-main';
import { Appointment } from '@/types';
import { useLiveQuery } from '@electric-sql/pglite-react';
import React from 'react';

const AppointmentPage = () => {
	const data = useLiveQuery.sql`
	  SELECT
                a.*,
                to_jsonb(p) AS patient,
                to_jsonb(s) AS staff,
                to_jsonb(t) AS treatment
            FROM appointment a
            JOIN treatment t ON a.treatment_id = t.id
            JOIN patient p ON t.patient_id = p.id
            JOIN staff s ON t.doctor_id = s.id`

	return (
		<AppointmentMain
			appointments={data?.rows as Appointment[] ?? []}
			count={data?.rows.length as number} />
	);
};

export default AppointmentPage;
