import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command:
			'varlock run -- vp build && BETTER_AUTH_URL=http://localhost:4173 BETTER_AUTH_SECRET=e2e-test-secret-0123456789abcdef012345 varlock run -- vp preview',
		port: 4173
	},
	testDir: 'e2e'
});
