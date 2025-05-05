'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { getDashboardGraph } from '@/actions/get-dashboard-graph';
import { PatientStatus } from '@/types/enums';

const chartConfig: Record<
	PatientStatus,
	{
		label: string;
		color: string;
	}
> = {
	Inpatient: {
		label: 'Inpatient',
		color: 'hsl(var(--chart-1))',
	},
	Outpatient: {
		label: 'Outpatient',
		color: 'hsl(var(--chart-2))',
	},
	Emergency: {
		label: 'Emergency',
		color: 'hsl(var(--chart-3))',
	},
	Discharged: {
		label: 'Discharged',
		color: 'hsl(var(--chart-4))',
	},
} satisfies ChartConfig;

export function DashboardChart() {
	const { data = [] } = useQuery({
		queryKey: ['DashboardGraph'],
		queryFn: getDashboardGraph,
	});

	return (
		<Card className="my-5 w-full">
			<CardHeader>
				<CardTitle>Patient Status</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						{Object.keys(chartConfig).map((key) => (
							<Bar
								key={key}
								dataKey={key}
								fill={chartConfig[key as keyof typeof chartConfig].color}
								radius={4}
							/>
						))}
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
