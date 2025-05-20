'use client';

import { type Staff } from '@/types';

import { ClinicDatatable } from '../ui/clinic-data-table';
import { StaffColumns } from './staff-columns';
import { StaffTypes } from '@/types/enums';
import { Users } from 'lucide-react';
import { StaffAddButton } from './staff-add-button';

export const StaffMain = ({
	staff,
	count,
}: {
	staff: Staff[];
	count: number;
}) => {
	return (
		<ClinicDatatable
			icon={<Users />}
			columns={StaffColumns}
			data={staff}
			title={'Doctor'}
			count={count}
			searchKey={'first_name'}
			searchPlaceholder="Doctor"
			facet={{
				facetKey: 'type',
				facetOptions: StaffTypes.map((e) => e),
			}}
			addButton={<StaffAddButton />}
			redirectPath={({ row }) => `staff-list/${row?.getValue('id')}`}
		/>
	);
};
