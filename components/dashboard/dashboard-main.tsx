'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ArrowRight, Calendar, Stethoscope, User, Users } from 'lucide-react';
import Link from 'next/link';
import { DashboardChart } from './dashboard-chart';
import { AppointmentExtended } from '@/types';
import { Appointments } from '../common/appointments';
import { useLiveQuery } from '@electric-sql/pglite-react';

export type Dashboard = {
	'Total Patients': number;
	'Total Appointments': number;
	'Total Treatments': number;
	'Total Staff': number;
};

const icons: Record<keyof Dashboard, React.JSX.Element> = {
	'Total Appointments': <Calendar />,
	'Total Patients': <User />,
	'Total Staff': <Users />,
	'Total Treatments': <Stethoscope />,
};

const links: Record<keyof Dashboard, string> = {
	'Total Appointments': '/appointments',
	'Total Patients': '/patients',
	'Total Staff': '/staff-list',
	'Total Treatments': '/treatments',
};

export const DashboardMain = ({ dashboard }: { dashboard: Dashboard }) => {
	const { rows = [] } = useLiveQuery(
		`
        SELECT
            a.*,
            to_jsonb(p) AS patient,
            to_jsonb(s) AS staff,
            to_jsonb(t) AS treatment
        FROM appointment a
        JOIN treatment t ON a.treatment_id = t.id
        JOIN patient p ON t.patient_id = p.id
        JOIN staff s ON t.doctor_id = s.id
        `
	) ?? {};
	const appointments = rows as AppointmentExtended[];

	if (!dashboard) return <div>Loading...</div>

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Object.entries(dashboard).map(([key, value]) => (
					<Card className="w-full pb-0" key={key}>
						<CardContent className="flex gap-4 pt-6">
							<div className="bg-muted w-fit rounded-md border p-2">
								{icons[key as keyof Dashboard]}
							</div>
							<div>
								<div className="text-sm">{key}</div>
								<div className="font-semibold">{value}</div>
							</div>
						</CardContent>
						<Link href={links[key as keyof Dashboard]}>
							<CardFooter className="bg-muted py-3 font-semibold text-emerald-500">
								<span className="mr-2 text-sm">See Details</span>
								<ArrowRight size={18} />
							</CardFooter>
						</Link>
					</Card>
				))}
			</div>
			<div className="flex flex-col gap-6 lg:flex-row">
				<div className="w-full lg:w-3/5">
					<DashboardChart />
				</div>
				<div className="w-full lg:w-2/5">
					<Appointments
						role="staff"
						appointments={appointments}
					/>
				</div>
			</div>
		</div>
	);
};
