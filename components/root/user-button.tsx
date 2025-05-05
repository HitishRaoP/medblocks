'use client';

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'supertokens-web-js/recipe/emailpassword';
import { Skeleton } from '../ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './theme-toggle';

export function UserButton() {
	const { isLoading, email, full_name } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 focus-visible:outline-0">
				<Avatar className="h-8 w-8 rounded-lg">
					{isLoading ? (
						<Skeleton className="h-8 w-8 rounded-lg" />
					) : (
						<>
							<AvatarFallback className="rounded-lg">
								{full_name?.at(0)}
							</AvatarFallback>
						</>
					)}
				</Avatar>
				<div className="hidden flex-1 text-left text-sm leading-tight sm:grid">
					{isLoading ? (
						<>
							<Skeleton className="mb-1 h-4 w-24" />
							<Skeleton className="h-3 w-16" />
						</>
					) : (
						<>
							<span className="truncate font-semibold">{full_name}</span>
							<span className="truncate text-xs">{email}</span>
						</>
					)}
				</div>
				<ChevronsUpDown className="ml-auto size-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuItem className='flex items-center justify-between' onClick={() => signOut()}>
					Log out
					<LogOut className="mr-2 h-4 w-4" />
				</DropdownMenuItem>
				<DropdownMenuLabel className='flex items-center justify-between'>
					Theme
					<ThemeToggle />
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
