'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsForPatient } from '@/actions/get-appointments-for-patient';
import { ScrollArea } from '../ui/scroll-area';
import {
	Timeline,
	TimelineContent,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from '@/components/ui/timeline';
import { Badge } from '../ui/badge';
import { dateToDOB } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@/types/enums';
import { usePGlite } from '@electric-sql/pglite-react';

const statusBgMap: Record<AppointmentStatus, string> = {
	Scheduled: 'bg-blue-100 text-blue-700',
	Missed: 'bg-red-100 text-red-700',
	Completed: 'bg-green-100 text-green-700',
	Cancelled: 'bg-red-100 text-red-700',
};

export const PatientAppointments = ({ id }: { id: string }) => {
	const { db } = usePGlite()
	const { data } = useQuery({
		queryKey: ['Appointments'],
		queryFn: () => getAppointmentsForPatient(db, id),
	});

	if (data?.length === 0) {
		return <div>No Results</div>;
	}

	return (
		<ScrollArea className="h-96 w-full">
			{
				<Timeline defaultValue={1}>
					{data?.map((item, index) => (
						<TimelineItem
							key={item.id}
							step={index + 1}
							className="group-data-[orientation=vertical]/timeline:ms-10"
						>
							<TimelineHeader>
								<TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
								<TimelineTitle className="flex items-center justify-between">
									<Badge className={cn(`${statusBgMap[item.status]}`)}>
										{item.status}
									</Badge>
								</TimelineTitle>
								<TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
									<span>{index + 1}</span>
								</TimelineIndicator>
							</TimelineHeader>
							<TimelineContent className="mt-4 space-y-2 rounded-md border p-4">
								<div className="">
									<span>{'Date: '}</span>
									{dateToDOB(item.date)}
								</div>
								<div className="flex gap-2">
									<div className="flex">
										<span>{'Start: '}</span>
										{item.start_time as unknown as string}
									</div>
									<div className="flex">
										<span>{'End: '}</span>
										{item.end_time as unknown as string}
									</div>
								</div>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			}
		</ScrollArea>
	);
};
