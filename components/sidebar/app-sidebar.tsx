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
import { Command } from 'lucide-react';
import { NavSecondary } from './nav-secondary';
import { NavMain } from './nav-main';
import { useAppSidebar } from '@/hooks/use-app-sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data } = useAppSidebar();

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
			</SidebarContent>
		</Sidebar>
	);
}
