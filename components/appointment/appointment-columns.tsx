'use client';

import { dateToDOB } from '@/lib/dayjs';
import { Appointment } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CopyButton } from '../root/copy-button';
import { AppointmentStatus } from '@/types/enums';

export const AppointmentColumns: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return (
				<div>
					<CopyButton
						copiedText={value}
						displayText={`${value.slice(0, 4)}...${value.slice(-4)}`}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'treatment_id',
		header: 'Treatment Id',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return <div>{`${value.slice(0, 4)}...${value.slice(-4)}`}</div>;
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ cell }) => {
			const value = cell.getValue() as AppointmentStatus;

			const statusBgMap: Record<AppointmentStatus, string> = {
				Scheduled: 'bg-blue-100 text-blue-700',
				Missed: 'bg-red-100 text-red-700',
				Completed: 'bg-green-100 text-green-700',
				Cancelled: 'bg-gray-100 text-gray-700',
			};

			return (
				<div
					className={`rounded px-2 py-1 text-center text-sm font-medium ${statusBgMap[value]}`}
				>
					{value}
				</div>
			);
		},
	},
	{
		accessorKey: 'visit_number',
		header: 'Visit',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return <div>{dateToDOB(new Date(value))}</div>;
		},
	},
	{
		accessorKey: 'start_time',
		header: 'Start Time',
	},
	{
		accessorKey: 'end_time',
		header: 'End Time',
	},
];
