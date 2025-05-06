"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getDashboardGraph } from "@/actions/get-dashboard-graph"
import type { PatientStatus } from "@/types/enums"

const chartConfig: Record<
	PatientStatus,
	{
		label: string
		color: string
	}
> = {
	Inpatient: {
		label: "Inpatient",
		color: "hsl(var(--chart-1))",
	},
	Outpatient: {
		label: "Outpatient",
		color: "hsl(var(--chart-2))",
	},
	Emergency: {
		label: "Emergency",
		color: "hsl(var(--chart-3))",
	},
	Discharged: {
		label: "Discharged",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig

export function DashboardChart() {
	const { data = [] } = useQuery({
		queryKey: ["DashboardGraph"],
		queryFn: getDashboardGraph,
	})

	return (
		<Card className="h-full w-full">
			<CardHeader>
				<CardTitle className="text-base sm:text-lg">Patient Status</CardTitle>
			</CardHeader>
			<CardContent className="h-[350px]">
				<ChartContainer config={chartConfig} className="h-full w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
							<CartesianGrid vertical={false} />
							<XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
							{Object.keys(chartConfig).map((key) => (
								<Bar key={key} dataKey={key} fill={chartConfig[key as keyof typeof chartConfig].color} radius={4} />
							))}
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
