'use client';

import {
	Calendar,
	LayoutDashboard,
	type LucideIcon,
	Stethoscope,
	UserRound,
	Users,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Item = {
	title: string;
	url: string;
	isActive?: boolean;
	items: {
		icon: LucideIcon;
		title: string;
		url: string;
		isActive?: boolean;
	}[];
};

type NavSecondary = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
};

type Data = {
	navSecondaryTop: NavSecondary[];
	navMain: Item[];
};

export const useAppSidebar = () => {
	const location = useLocation()
	const markActive = (url: string) => location.pathname.includes(url);

	const data: Data = {
		navSecondaryTop: [
			{
				title: 'Dashboard',
				url: '/',
				icon: LayoutDashboard,
			},
		],
		navMain: [
			{
				title: 'Clinic',
				url: '/',
				items: [
					{
						title: 'Appointments',
						url: '/appointments',
						icon: Calendar,
					},
					{
						title: 'Patients',
						url: '/patients',
						icon: UserRound,
					},
					{
						title: 'Treatments',
						url: '/treatments',
						icon: Stethoscope,
					},
					{
						title: 'Staff List',
						url: '/staff-list',
						icon: Users,
					},
				],
			},
		],
	};

	const dataWithPath: Data = {
		navSecondaryTop: data.navSecondaryTop.map((item) => ({
			...item,
			isActive: markActive(item.url),
		})),
		navMain: data.navMain.map((group) => ({
			...group,
			items: group.items.map((item) => ({
				...item,
				isActive: markActive(item.url),
			})),
		})),
	};

	return {
		data: dataWithPath,
	};
};
