import { PUBLIC_APP_URL } from '$env/static/public';
import { createAuthClient } from 'better-auth/svelte';

export const client = createAuthClient({
	baseURL: PUBLIC_APP_URL
});

export const { signIn, signUp, useSession } = client;
