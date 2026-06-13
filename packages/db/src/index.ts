import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

export * from './schema';
export { schema };

export type CreateDbOptions = {
	url: string;
	authToken?: string;
};

export function createDb({ url, authToken }: CreateDbOptions) {
	const client = createClient({
		url,
		authToken
	});

	return drizzle(client, { schema });
}

export type Db = ReturnType<typeof createDb>;
