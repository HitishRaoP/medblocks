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
	BaggageClaim,
	Calendar,
	ChartLine,
	Command,
	CreditCard,
	LayoutDashboard,
	LifeBuoy,
	Send,
	ShoppingBag,
	ShoppingCart,
	Stethoscope,
	UserRound,
	Users,
	WalletCards,
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
					url: '#',
					icon: Calendar,
				},
				{
					title: 'Patients',
					url: '#',
					icon: UserRound,
				},
				{
					title: 'Treatments',
					url: '#',
					icon: Stethoscope,
				},
				{
					title: 'Staff List',
					url: '#',
					icon: Users,
				},
			],
		},
		{
			title: 'Finance',
			url: '#',
			items: [
				{
					title: 'Accounts',
					url: '#',
					icon: WalletCards,
				},
				{
					title: 'Sales',
					url: '#',
					icon: ChartLine,
				},
				{
					title: 'Purchases',
					url: '#',
					icon: ShoppingBag,
				},
				{
					title: 'Payment Method',
					url: '#',
					icon: CreditCard,
				},
			],
		},
		{
			title: 'Physical Asset',
			url: '#',
			items: [
				{
					title: 'Stocks',
					url: '#',
					icon: BaggageClaim,
				},
				{
					title: 'Pheriperals',
					url: '#',
					icon: ShoppingCart,
				},
			],
		},
	],
	navSecondaryTop: [
		{
			title: 'Dashboard',
			url: '#',
			icon: LayoutDashboard,
		},
	],
	navSecondaryBottom: [
		{
			title: 'Support',
			url: '#',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '#',
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
				<NavSecondary items={data.navSecondaryTop} className="mt-auto" />
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondaryBottom} className="mt-auto" />
			</SidebarContent>
		</Sidebar>
	);
}
