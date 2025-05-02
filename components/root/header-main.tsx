'use client';

import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { UserButton } from './user-button';

export const HeaderMain = () => {
	return (
		<header className="flex items-center justify-between border-b px-4">
			<div className="flex h-16 shrink-0 items-center gap-2">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#">
								Building Your Application
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>Data Fetching</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<UserButton
				user={{
					name: 'shadcn',
					email: 'm@example.com',
					avatar: '/avatars/shadcn.jpg',
				}}
			/>
		</header>
	);
};
