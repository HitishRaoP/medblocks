'use client';

import { cn } from '@/lib/utils';
import { type Staff } from '@/types';
import { type ColumnDef } from '@tanstack/react-table';
import { StaffWorkingDays } from './staff-working-days';
import type { StaffType, WeekDay } from '@/types/enums';

export const StaffColumns: ColumnDef<Staff>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return <div>{`${value.slice(0, 4)}...${value.slice(-4)}`}</div>;
		},
	},
	{
		accessorKey: 'first_name',
		header: 'First name',
	},
	{
		accessorKey: 'kmc',
		header: 'Kmc',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'phone',
		header: 'Phone number',
	},
	{
		accessorKey: 'type',
		header: 'Type',
		cell: ({ cell }) => {
			const value = cell.getValue() as StaffType;
			const typeBg: Record<StaffType, string> = {
				Full_time: 'bg-orange-100 text-orange-500',
				Part_time: 'bg-green-100 text-green-500',
			};
			return (
				<div
					className={cn(
						'rounded-full p-1 text-center font-semibold',
						typeBg[value],
					)}
				>
					{value.replace('_', '-')}
				</div>
			);
		},
	},
	{
		accessorKey: 'working_days',
		header: 'Working Days',
		cell: ({ cell }) => {
			const days = cell.getValue() as WeekDay[];
			return (
				<StaffWorkingDays days={days} />
			);
		},
	},
];
