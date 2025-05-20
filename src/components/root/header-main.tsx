'use client';


import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { capitalize } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import React from 'react';
export const HeaderMain = () => {
	const location = useLocation()
	const breadcrumbs = location.pathname.split('/').slice(1);

	return (
		<header className="flex items-center justify-between border-b px-4 mb-6">
			<div className="flex h-16 shrink-0 items-center gap-2">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((b, i) => (
							<React.Fragment key={i}>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href={`/${b}`}>
										{capitalize(decodeURIComponent(b))}
									</BreadcrumbLink>
								</BreadcrumbItem>
								{i < breadcrumbs.length - 1 && (
									<BreadcrumbSeparator className="hidden md:block" />
								)}
							</React.Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
};
