import { SessionAuth } from '@/components/providers/session-auth';
import React from 'react';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
	return <SessionAuth>{children}</SessionAuth>;
};

export default ProtectedLayout;
