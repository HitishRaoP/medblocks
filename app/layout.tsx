import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { SuperTokensProvider } from '@/components/providers/supertokens-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
	subsets: ['cyrillic'],
});

export const metadata: Metadata = {
	title: 'Medblocks',
	description: 'Unlock the potential of health data',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<SuperTokensProvider>
				<body className={cn('antialiased', manrope.className)}>
					<QueryProvider>
						<Toaster position="top-right" />
						<ThemeProvider>{children}</ThemeProvider>
					</QueryProvider>
				</body>
			</SuperTokensProvider>
		</html>
	);
}
