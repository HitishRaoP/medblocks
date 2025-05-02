'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from 'supertokens-node/types';

type Metadata = {
	first_name: string;
	last_name: string;
};

export const useAuth = () => {
	const { isError, isLoading, data } = useQuery({
		queryKey: ['user'],
		queryFn: async function () {
			const response = await axios.get<{ user: User; metadata: Metadata }>(
				'/api/user',
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
