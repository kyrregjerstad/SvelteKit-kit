import { auth } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.route.id?.startsWith('/(protected)/')) {
		const authRes = await auth.api.getSession({
			headers: event.request.headers
		});

		if (authRes) {
			event.locals.session = {
				...authRes.session,
				ipAddress: authRes.session.ipAddress ?? null,
				userAgent: authRes.session.userAgent ?? null
			};
			event.locals.user = {
				...authRes.user,
				image: authRes.user.image ?? null
			};

			return svelteKitHandler({ event, resolve, auth, building });
		} else {
			redirect(307, '/sign-in');
		}
	} else {
		return svelteKitHandler({ event, resolve, auth, building });
	}
};
