"use client"

import { StaffMain } from '@/components/staff/staff-main';
import { Staff } from '@/types';
import { useLiveQuery } from '@electric-sql/pglite-react';
import React from 'react';

const StaffListPage = () => {
	const { rows } = useLiveQuery(
		'SELECT * FROM staff',
	) ?? {};

	const staff = (rows as unknown as Staff[]) ?? [];

	return <StaffMain staff={staff} count={staff.length} />;
};

export default StaffListPage;
