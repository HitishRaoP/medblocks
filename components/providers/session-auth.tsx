'use client';

import React, { useState, useEffect } from 'react';
import { SessionAuth as SessionAuthForNext } from 'supertokens-auth-react/recipe/session';

type Props = Parameters<typeof SessionAuthForNext>[0] & {
	children?: React.ReactNode | undefined;
};

export const SessionAuth = (props: Props) => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);
	}, []);
	if (!loaded) {
		return props.children;
	}

	return <SessionAuthForNext {...props}>{props.children}</SessionAuthForNext>;
};
