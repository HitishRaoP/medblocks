'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ArrowRight, Calendar, Stethoscope, User, Users } from 'lucide-react';
import Link from 'next/link';
import { DashboardChart } from './dashboard-chart';
import { useQuery } from '@tanstack/react-query';
import { getAllRecords } from '@/actions/get-all-records';
import { AppointmentExtended } from '@/types';
import { Appointments } from '../common/appointments';

type Dashboard = {
	'Total Patients': number;
	'Total Appointments': number;
	'Total Treatments': number;
	'Total Staff': number;
};

const icons: Record<keyof Omit<Dashboard, 'Graph'>, React.JSX.Element> = {
	'Total Appointments': <Calendar />,
	'Total Patients': <User />,
	'Total Staff': <Users />,
	'Total Treatments': <Stethoscope />,
};

const links: Record<keyof Omit<Dashboard, 'Graph'>, string> = {
	'Total Appointments': '/appointments',
	'Total Patients': '/patients',
	'Total Staff': '/staff-list',
	'Total Treatments': '/treatments',
};

export const DashboardMain = ({
	dashboard,
}: {
	dashboard: Omit<Dashboard, 'Graph'>;
}) => {
	const { data } = useQuery({
		queryKey: ['Appointments'],
		queryFn: () => getAllRecords<AppointmentExtended>('appointment'),
	});

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Object.entries(dashboard).map(([k, v]) => (
					<Card className="w-full pb-0" key={k}>
						<CardContent className="flex gap-4 pt-6">
							<div className="bg-muted w-fit rounded-md border p-2">
								{icons[k as keyof Omit<Dashboard, 'Graph'>]}
							</div>
							<div>
								<div className="text-sm">{k}</div>
								<div className="font-semibold">{v}</div>
							</div>
						</CardContent>
						<Link href={links[k as keyof Omit<Dashboard, 'Graph'>]}>
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
						appointments={data?.data as AppointmentExtended[]}
					/>
				</div>
			</div>
		</div>
	);
};
