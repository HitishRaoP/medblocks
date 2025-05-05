import { getDashboard } from "@/actions/get-dashboard";
import { DashboardMain } from "@/components/dashboard/dashboard-main";

export default async function Home() {
	const response = await getDashboard();

	return (
		<DashboardMain dashboard={response} />
	);
}
