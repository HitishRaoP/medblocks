'use client';

import { dateToDOB } from '@/lib/dayjs';
import { Patient } from '@/types';
import { PatientStatus } from '@/types/enums';
import { ColumnDef } from '@tanstack/react-table';

export const PatientColumns: ColumnDef<Patient>[] = [
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
		accessorKey: 'gender',
		header: 'Gender',
	},
	{
		accessorKey: 'dob',
		header: 'Date of Birth',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return <div>{dateToDOB(new Date(value))}</div>;
		},
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
		accessorKey: 'status',
		header: 'Status',
		cell: ({ cell }) => {
			const value = cell.getValue() as PatientStatus;
			const statusBgMap: Record<PatientStatus, string> = {
				Inpatient: 'bg-blue-100 text-blue-800',
				Outpatient: 'bg-lime-100 text-lime-800',
				Discharged: 'bg-amber-100 text-amber-800',
				Emergency: 'bg-pink-100 text-pink-800',
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
];
