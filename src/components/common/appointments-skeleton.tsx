'use client';


import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AppointmentsSkeleton = ({
	role,
}: {
	role: 'patient' | 'staff';
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-muted-foreground text-base sm:text-lg">
					{role === 'patient' ? 'Patient' : 'Doctor'} Appointments
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-96 w-full space-y-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="relative pl-10">
							{/* Timeline line */}
							<div className="bg-muted absolute top-4 bottom-0 left-2.5 w-px"></div>

							{/* Timeline indicator */}
							<div className="bg-muted absolute top-4 left-0 h-5 w-5 rounded-full" />

							{/* Card content */}
							<div className="mt-2 space-y-4 rounded-md border bg-white p-4">
								{/* Status badge */}
								<Skeleton className="h-6 w-24 rounded-full" />

								{/* Date */}
								<div className="text-sm text-gray-700">
									<Skeleton className="h-4 w-32" />
								</div>

								{/* Time range */}
								<div className="flex gap-6 text-sm">
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-4 w-20" />
								</div>

								{/* Profiles */}
								<div className="flex flex-col gap-8 text-sm sm:flex-row">
									<div className="flex flex-col gap-2">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-8 w-32 rounded-md" />
									</div>
									<div className="flex flex-col gap-2">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-8 w-32 rounded-md" />
									</div>
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
};
