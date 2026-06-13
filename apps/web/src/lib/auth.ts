import { dev } from '$app/environment';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { createDb } from '@sveltekit-kit/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

const db = createDb({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN
});

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		}
	},
	// there's a type issue here for now, but it seems to work fine
	// oxlint-disable-next-line @typescript-eslint/no-explicit-any
	plugins: [sveltekitCookies(getRequestEvent as any)]
});
