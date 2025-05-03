'use client';

import { cn } from '@/lib/utils';
import { Staff } from '@/types';
import { StaffType, WeekDay, WeekDays } from '@/types/enums';
import { ColumnDef } from '@tanstack/react-table';

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
			const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
			const days = cell.getValue() as WeekDay[];

			return (
				<div className="flex justify-center gap-1">
					{WeekDays.map((day, i) => {
						const isActive = days.includes(day);
						return (
							<div
								key={i}
								className={cn(
									'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
									isActive
										? 'bg-blue-400 text-white'
										: 'bg-gray-100 text-gray-400',
								)}
							>
								{weekDays[i]}
							</div>
						);
					})}
				</div>
			);
		},
	},
];
