'use client';

import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Calendar,
	Command,
	CreditCard,
	LayoutDashboard,
	LifeBuoy,
	Send,
	ShoppingBag,
	Stethoscope,
	UserRound,
	Users,
} from 'lucide-react';
import { NavSecondary } from './nav-secondary';
import { NavMain } from './nav-main';

const data = {
	navMain: [
		{
			title: 'Clinic',
			url: '/',
			items: [
				{
					title: 'Reservations',
					url: '/reservations',
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
		{
			title: 'Finance',
			url: '/',
			items: [
				{
					title: 'Billing',
					url: '/billing',
					icon: ShoppingBag,
				},
				{
					title: 'Payment Method',
					url: '/payment-method',
					icon: CreditCard,
				},
			],
		},
	],
	navSecondaryTop: [
		{
			title: 'Dashboard',
			url: '/',
			icon: LayoutDashboard,
		},
	],
	navSecondaryBottom: [
		{
			title: 'Support',
			url: '/support',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '/feedback',
			icon: Send,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-lg leading-tight font-semibold">
									Medblocks
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavSecondary items={data.navSecondaryTop} />
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondaryBottom} className="mt-auto" />
			</SidebarContent>
		</Sidebar>
	);
}
