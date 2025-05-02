import { cookies } from 'next/headers';
import jwksClient from 'jwks-rsa';
import JsonWebToken from 'jsonwebtoken';
import type { JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';

const client = jwksClient({
	jwksUri: `${process.env.SUPERTOKENS_CONNECTION_URI}/.well-known/jwks.json`,
});

async function getAccessToken() {
	const cookiesStore = await cookies();
	return cookiesStore.get('sAccessToken')?.value;
}
function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
	client.getSigningKey(header.kid, (err, key) => {
		if (err) {
			callback(err);
		} else {
			const signingKey = key?.getPublicKey();
			callback(null, signingKey);
		}
	});
}

async function verifyToken(token: string): Promise<JwtPayload> {
	return new Promise((resolve, reject) => {
		JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded as JwtPayload);
			}
		});
	});
}

export async function getSSRSessionHelper(): Promise<{
	accessTokenPayload: JwtPayload | undefined;
	hasToken: boolean;
	error: Error | undefined;
}> {
	const accessToken = await getAccessToken();
	const hasToken = !!accessToken;
	try {
		if (accessToken) {
			const decoded = await verifyToken(accessToken);
			return { accessTokenPayload: decoded, hasToken, error: undefined };
		}
		return { accessTokenPayload: undefined, hasToken, error: undefined };
	} catch (error) {
		return { accessTokenPayload: undefined, hasToken, error: error as Error };
	}
}
