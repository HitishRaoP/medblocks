'use client';

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

function UserSkeleton() {
	return (
		<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
			<Skeleton className="h-8 w-8 rounded-lg" />
			<div className="grid flex-1 text-left text-sm leading-tight">
				<Skeleton className="mb-1 h-4 w-24" />
				<Skeleton className="h-3 w-16" />
			</div>
		</div>
	);
}

function UserInfo({
	avatar,
	name,
	email,
}: {
	avatar: string;
	name: string;
	email: string;
}) {
	return (
		<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage src={avatar} alt={name || 'User'} />
				<AvatarFallback className="rounded-lg">{name?.at(0)}</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold">{name}</span>
				<span className="truncate text-xs">{email}</span>
			</div>
		</div>
	);
}

export function UserButton({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
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
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					{isLoading ? (
						<UserSkeleton />
					) : (
						<UserInfo
							avatar={user.avatar}
							name={full_name}
							email={email as string}
						/>
					)}
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BadgeCheck className="mr-2 h-4 w-4" />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Bell className="mr-2 h-4 w-4" />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
