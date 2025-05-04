import { Staff } from '@/types';
import React from 'react';
import { ClinicDatatable } from '../ui/clinic-data-table';
import { StaffColumns } from './staff-columns';
import { StaffTypes } from '@/types/enums';
import { TreatmentAddButton } from '../treatment/treatment-add-button';

export const StaffMain = ({
	staff,
	count,
}: {
	staff: Staff[];
	count: number;
}) => {
	return (
		<ClinicDatatable
			columns={StaffColumns}
			data={staff}
			title={'Doctor'}
			count={count}
			searchKey={'first_name'}
			searchPlaceholder="Doctor"
			facet={{
				facetKey: 'type',
				facetOptions: StaffTypes.map((e) => e)
			}}
			addButton={<TreatmentAddButton />}
		/>
	);
};
