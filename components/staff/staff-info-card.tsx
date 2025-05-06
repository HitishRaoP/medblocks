'use client';

import React from 'react';
import { cn, text } from '@/lib/utils';
import { Staff } from '@/types';
import { getRecordFromId } from '@/actions/get-record-from-id';
import { useQuery } from '@tanstack/react-query';
import { StaffWorkingDays } from './staff-working-days';
import { WeekDay } from '@/types/enums';

const InfoRow: React.FC<{
	label: string;
	value?: React.ReactNode;
	className?: string;
}> = ({ label, value, className }) => {
	if (!value) return null;
	return (
		<div className={cn('flex items-start py-2.5', className)}>
			<div className="flex-1">
				<p className="text-sm text-gray-500">{label}</p>
				<div className="mt-0.5 font-medium text-gray-700">{value}</div>
			</div>
		</div>
	);
};

export const StaffInfoCard: React.FC<{ id: string }> = ({ id }) => {
	const { data } = useQuery({
		queryKey: ['Staff', id],
		queryFn: () => getRecordFromId<Staff>(id, 'staff'),
	});

	if (!data) return null;

	const valueRenderMap: Partial<Record<keyof Staff, (value: unknown) => React.ReactNode>> = {
		type: (v) => text(v as string),
		working_days: (v) => <StaffWorkingDays days={v as WeekDay[]} />,
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-md">
			{Object.entries(data).map(([k, v]) => {
				const render = valueRenderMap[k as keyof Staff];
				const value = render ? render(v) : v;
				return (
					<InfoRow
						key={k}
						label={text(k)}
						value={value}
					/>
				);
			})}
		</div>
	);
};
