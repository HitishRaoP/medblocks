import { SessionAuth } from '@/components/providers/session-auth';
import React from 'react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { HeaderMain } from '@/components/root/header-main';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionAuth>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<HeaderMain />
					<div className="p-4">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</SessionAuth>
	);
};

export default ProtectedLayout;
