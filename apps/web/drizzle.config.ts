import { defineConfig } from 'drizzle-kit';
import { ENV } from 'varlock/env';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		authToken: ENV.DATABASE_AUTH_TOKEN,
		url: ENV.DATABASE_URL
	},
	verbose: true,
	strict: true
});
