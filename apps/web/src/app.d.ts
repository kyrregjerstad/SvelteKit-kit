// See https://kit.svelte.dev/docs/types#app

import type { DbSession, DbUser } from '$lib/server/db/schema';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session?: DbSession;
			user?: DbUser;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
