'use client';

import { Patient } from '@/types';
import { PatientColumns } from './patient-columns';
import { ClinicDatatable } from '../ui/clinic-data-table';
import { PatientStatuses } from '@/types/enums';
import { User } from 'lucide-react';
import { PatientAddButton } from './patient-add-button';

export const PatientMain = ({
	patients,
	count,
}: {
	patients: Patient[];
	count: number;
}) => {
	return (
		<ClinicDatatable
			icon={<User />}
			columns={PatientColumns}
			data={patients}
			title={'Patient'}
			count={count}
			searchKey={'first_name'}
			searchPlaceholder="Name"
			facet={{
				facetKey: 'status',
				facetOptions: PatientStatuses.map((e) => e),
			}}
			redirectPath={({ row }) => `/patients/${row?.getValue('id')}`}
			addButton={<PatientAddButton />}
		/>
	);
};
