"use client"

import { getDashboard } from '@/actions/get-dashboard';
import { Dashboard, DashboardMain } from '@/components/dashboard/dashboard-main';
import { usePGlite } from '@electric-sql/pglite-react';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
	const db = usePGlite();
	const { data } = useQuery({
		queryKey: ['DashboardMain'],
		queryFn: () => getDashboard(db)
	})

	return <DashboardMain dashboard={data as Dashboard} />;
}
