import { StaffDetailedMain } from '@/components/staff/staff-detailed-main';
import React from 'react';

const StaffDetailedPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	return <StaffDetailedMain id={id} />;
};

export default StaffDetailedPage;
