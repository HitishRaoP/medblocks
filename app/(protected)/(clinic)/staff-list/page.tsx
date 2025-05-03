import { getAllStaff } from '@/actions/get-all-staff';
import { StaffMain } from '@/components/staff/staff-main';
import React from 'react';

const StaffListPage = async () => {
	const response = await getAllStaff();

	return <StaffMain staff={response.data} count={response.count} />;
};

export default StaffListPage;
