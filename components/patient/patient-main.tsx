'use client';

import { Patient } from '@/types';
import { PatientColumns } from './patient-columns';
import { ClinicDatatable } from '../ui/clinic-data-table';
import { PatientStatuses } from '@/types/enums';

export const PatientMain = ({
	patients,
	count,
}: {
	patients: Patient[];
	count: number;
}) => {
	return (
		<ClinicDatatable
			columns={PatientColumns}
			data={patients}
			title={'Patient'}
			count={count}
			searchKey={'first_name'}
			searchPlaceholder="Name"
			facetKey={'status'}
			facetOptions={PatientStatuses.map((s) => ({
				label: s,
				value: s,
			}))}
			redirectPath={({ row }) => `/patients/${row?.getValue('id')}`}
		/>
	);
};
