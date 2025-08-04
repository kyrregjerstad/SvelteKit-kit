import { resolve, dirname } from 'node:path';

// Get project root (one level up from scripts directory)
const projectRoot = resolve(dirname(import.meta.dir), '.');

console.log('🚀 Setting up SvelteKit project...\n');

try {
	// Step 1: Run pnpm install
	console.log('📦 Installing dependencies...');
	const installProc = Bun.spawn(['pnpm', 'install'], {
		stdout: 'inherit',
		stderr: 'inherit',
		cwd: projectRoot
	});

	await installProc.exited;

	if (installProc.exitCode !== 0) {
		throw new Error(`pnpm install failed with exit code ${installProc.exitCode}`);
	}

	console.log('✅ Dependencies installed\n');

	// Step 2: Create local.sqlite file
	const dbPath = resolve(projectRoot, 'local.sqlite');
	const dbFile = Bun.file(dbPath);

	if (!(await dbFile.exists())) {
		console.log('🗄️  Creating local.sqlite database...');
		await Bun.write(dbPath, new Uint8Array(0)); // Create empty file
		console.log('✅ Database file created\n');
	} else {
		console.log('📋 Database file already exists, skipping...\n');
	}

	// Step 3: Create .env file
	const envPath = resolve(projectRoot, '.env');
	const envFile = Bun.file(envPath);

	if (!(await envFile.exists())) {
		console.log('⚙️  Creating .env file...');
		await setupEnvFile({
			DATABASE_URL: 'file:./local.sqlite',
			DATABASE_AUTH_TOKEN: 'replace-me',
			PUBLIC_AUTH_URL: 'http://localhost:5173',
			GITHUB_CLIENT_ID: 'replace-me',
			GITHUB_CLIENT_SECRET: 'replace-me',
			GOOGLE_CLIENT_ID: 'replace-me',
			GOOGLE_CLIENT_SECRET: 'replace-me'
		});
		console.log('✅ .env file created\n');
	} else {
		console.log('📋 .env file already exists, skipping...\n');
	}

	// Step 4: Run db:push
	console.log('🔄 Running db:push...');
	const pushProc = Bun.spawn(['pnpm', 'db:push'], {
		stdin: 'inherit',
		stdout: 'inherit',
		stderr: 'inherit',
		cwd: projectRoot
	});
	await pushProc.exited;

	console.log('🎉 Setup complete! Your SvelteKit project is ready to go.');
	console.log('\nNext steps:');
	console.log('  pnpm dev        # Start development server');
	console.log('  pnpm db:seed    # Seed your database (if needed)');
} catch (error) {
	console.error('❌ Setup failed:', error instanceof Error ? error.message : error);
	process.exit(1);
}

/**
 * Creates or updates a .env file with the provided key-value pairs
 * @param envVars - Object containing environment variables to set
 * @param append - Whether to append to existing file (default: false)
 */
async function setupEnvFile(envVars: Record<string, string>, append: boolean = false) {
	const envPath = resolve(projectRoot, '.env');
	const envFile = Bun.file(envPath);

	let content = '';

	if (append && (await envFile.exists())) {
		// Read existing content if appending
		content = await envFile.text();
		if (!content.endsWith('\n') && content.length > 0) {
			content += '\n';
		}
	}

	// Add new environment variables
	for (const [key, value] of Object.entries(envVars)) {
		content += `${key}="${value}"\n`;
	}

	await Bun.write(envPath, content);
}
