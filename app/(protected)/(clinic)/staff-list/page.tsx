import { getAllRecords } from '@/actions/get-all-records';
import { StaffMain } from '@/components/staff/staff-main';
import { Staff } from '@/types';
import React from 'react';

const StaffListPage = async () => {
	const response = await getAllRecords<Staff>('staff');

	return <StaffMain staff={response.data} count={response.count} />;
};

export default StaffListPage;
