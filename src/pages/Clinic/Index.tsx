
import { getDashboard } from '@/actions/get-dashboard';
import {type  Dashboard, DashboardMain } from '@/components/dashboard/dashboard-main';
import { useQuery } from '@tanstack/react-query';

export function Homepage() {
	const { data } = useQuery({
		queryKey: ['DashboardMain'],
		queryFn: () => getDashboard()
	})

	return <DashboardMain dashboard={data as Dashboard} />;
}
