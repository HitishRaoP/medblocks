'use client';

import React from 'react';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';
import { LucideIcon } from 'lucide-react';

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

export const NavMain = ({ items }: { items: Item[] }) => {
	return (
		<div>
			{items.map((item: Item) => (
				<SidebarGroup key={item.title}>
					<SidebarGroupLabel>{item.title.toUpperCase()}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{item.items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={item.isActive}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title} </span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</div>
	);
};
