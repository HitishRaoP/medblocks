import SuperTokens from 'supertokens-node';
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';
import { TypeInput } from 'supertokens-node/types';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import axios from 'axios';

export const backendConfig = (): TypeInput => {
	return {
		framework: 'custom',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
			apiKey: process.env.SUPERTOKENS_API_KEY!,
		},
		appInfo,
		recipeList: [
			EmailPasswordNode.init({
				signUpFeature: {
					formFields: [
						{
							id: 'first_name',
						},
						{
							id: 'last_name',
							optional: true,
						},
					],
				},
				override: {
					apis: (originalImplementation) => {
						return {
							...originalImplementation,
							signUpPOST: async function (input) {
								if (originalImplementation.signUpPOST === undefined) {
									throw Error('Should never come here');
								}
								const response = await originalImplementation.signUpPOST(input);

								if (response.status === 'OK') {
									const formFields = input.formFields;

									const first_name = formFields.find(
										(f) => f.id === 'first_name',
									)?.value;
									const last_name = formFields.find(
										(f) => f.id === 'last_name',
									)?.value;

									await axios.post('http://localhost:3000/api/user', {
										first_name,
										last_name,
										userId: response.user.id,
									});
								}
								return response;
							},
						};
					},
				},
			}),
			SessionNode.init(),
			UserMetadata.init(),
		],
		isInServerlessEnv: true,
	};
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
	if (!initialized) {
		SuperTokens.init(backendConfig());
		initialized = true;
	}
}
