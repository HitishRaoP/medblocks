import { withSession } from 'supertokens-node/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '../../../config/backend';
import supertokens from 'supertokens-node';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

ensureSuperTokensInit();

export function GET(request: NextRequest) {
	return withSession(request, async (err, session) => {
		if (err) {
			return NextResponse.json(err, { status: 500 });
		}
		if (!session) {
			return new NextResponse('Authentication required', { status: 401 });
		}

		const userId = session.getUserId();

		const response = await UserMetadata.getUserMetadata(userId);

		return NextResponse.json({
			user: await supertokens.getUser(userId),
			metadata: response.metadata,
		});
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		/**
		 * Get the userId
		 */
		const userId = body.userId;

		/**
		 * Update the metadata
		 * https://supertokens.com/docs/post-authentication/user-management/user-metadata#user-metadata
		 */
		const response = await UserMetadata.updateUserMetadata(userId, {
			first_name: body.first_name,
			last_name: body.last_name,
		});

		return NextResponse.json({
			response,
		});
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
