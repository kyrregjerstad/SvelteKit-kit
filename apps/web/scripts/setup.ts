const projectRoot = `${import.meta.dir}/..`;

console.log('🚀 Setting up SvelteKit project...\n');

try {
	// Step 1: Run bun install
	console.log('📦 Installing dependencies...');
	const installProc = Bun.spawn(['bun', 'install'], {
		stdout: 'inherit',
		stderr: 'inherit',
		cwd: projectRoot
	});

	await installProc.exited;

	if (installProc.exitCode !== 0) {
		throw new Error(`bun install failed with exit code ${installProc.exitCode}`);
	}

	console.log('✅ Dependencies installed\n');

	// Step 2: Create local.sqlite file
	const dbPath = `${projectRoot}/local.sqlite`;
	const dbFile = Bun.file(dbPath);

	if (!(await dbFile.exists())) {
		console.log('🗄️  Creating local.sqlite database...');
		await Bun.write(dbPath, new Uint8Array(0)); // Create empty file
		console.log('✅ Database file created\n');
	} else {
		console.log('📋 Database file already exists, skipping...\n');
	}

	// Step 3: Run db:push
	console.log('🔄 Running db:push...');
	const pushProc = Bun.spawn(['bun', 'run', 'db:push'], {
		stdin: 'inherit',
		stdout: 'inherit',
		stderr: 'inherit',
		cwd: projectRoot
	});
	await pushProc.exited;

	console.log('🎉 Setup complete! Your SvelteKit project is ready to go.');
	console.log('\nNext steps:');
	console.log('  bun dev        # Start development server');
	console.log('  bun run db:seed    # Seed your database (if needed)');
} catch (error) {
	console.error('❌ Setup failed:', error instanceof Error ? error.message : error);
	process.exit(1);
}

export {};
