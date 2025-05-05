'use client';

import { Treatment } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ProfileMini } from './profile-mini';

export const TreatmentColumns: ColumnDef<Treatment>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return <div>{`${value.slice(0, 4)}...${value.slice(-4)}`}</div>;
		},
	},
	{
		accessorKey: 'name',
		header: 'Treatment Name',
	},
	{
		accessorKey: 'description',
		header: 'Treatment Description',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'duration',
		header: 'Duration (hrs)',
	},
	{
		accessorKey: 'patient_id',
		header: 'Patient',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;

			return <ProfileMini size="small" id={value} user="patient" />;
		},
	},
	{
		accessorKey: 'doctor_id',
		header: 'Doctor',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;

			return <ProfileMini size="small" id={value} user="staff" />;
		},
	},
];
