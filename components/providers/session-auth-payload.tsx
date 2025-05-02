import { getSSRSessionHelper } from '@/lib/supertoken';
import { redirect } from 'next/navigation';
import { TryRefreshComponent } from '../auth/try-refresh-component';
import { SessionAuth } from './session-auth';

export async function SessionAuthPayload({
	children,
}: {
	children: React.ReactNode;
}) {
	const { accessTokenPayload, hasToken, error } = await getSSRSessionHelper();

	if (error) {
		return (
			<div>
				Something went wrong while trying to get the session. Error -{' '}
				{error.message}
			</div>
		);
	}

	// `accessTokenPayload` will be undefined if it the session does not exist or has expired
	if (accessTokenPayload === undefined) {
		if (!hasToken) {
			/**
			 * This means that the user is not logged in. If you want to display some other UI in this
			 * case, you can do so here.
			 */
			return redirect('/auth');
		}

		/**
		 * This means that the session does not exist but we have session tokens for the user. In this case
		 * the `TryRefreshComponent` will try to refresh the session.
		 *
		 * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
		 */
		return <TryRefreshComponent key={Date.now()} />;
	}

	/**
	 * SessionAuthForNextJS will handle proper redirection for the user based on the different session states.
	 * It will redirect to the login page if the session does not exist etc.
	 */

	return <SessionAuth>{children}</SessionAuth>;
}
