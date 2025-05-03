'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from 'supertokens-node/types';
import { API_ROUTES } from '@/lib/constants';

type Metadata = {
	first_name: string;
	last_name: string;
};

export const useAuth = () => {
	const { isError, isLoading, data } = useQuery({
		queryKey: ['user'],
		queryFn: async function () {
			const response = await axios.get<{ user: User; metadata: Metadata }>(
				API_ROUTES.USER,
			);
			return response.data;
		},
	});
	const user = data?.user;
	const metadata = data?.metadata;

	return {
		isError,
		isLoading,
		first_name: metadata?.first_name,
		last_name: metadata?.last_name,
		full_name: `${metadata?.first_name} ${metadata?.last_name}`,
		email: user?.emails.at(0),
	};
};
