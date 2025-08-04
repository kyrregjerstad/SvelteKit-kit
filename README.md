# SvelteKit Project

A modern SvelteKit application with authentication, database integration, and shadcn-svelte.

## Quick Start

### Automated Setup

The easiest way to get started is using the automated setup script:

```sh
# Run the setup script (requires Bun)
bun run scripts/setup.ts

# Or if you have Bun installed globally
bun scripts/setup.ts
```

This script will:

- Install all dependencies with `pnpm install`
- Create a local SQLite database file
- Set up a `.env` file with placeholder values
- Run database migrations with `pnpm db:push`

### Manual Setup

If you prefer to set up manually:

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the project root with:

   ```env
   DATABASE_URL="file:./local.sqlite"
   DATABASE_AUTH_TOKEN="replace-me"
   GITHUB_CLIENT_ID="replace-me"
   GITHUB_CLIENT_SECRET="replace-me"
   GOOGLE_CLIENT_ID="replace-me"
   GOOGLE_CLIENT_SECRET="replace-me"
   ```

3. **Initialize database:**
   ```sh
   pnpm db:push
   ```

## Development

Start the development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

## Database

This project uses Drizzle ORM with SQLite:

- **Push schema changes:** `pnpm db:push`
- **Generate migrations:** `pnpm db:generate`
- **Seed database:** `pnpm db:seed`

## Authentication

The project includes authentication setup for:

- GitHub OAuth

Configure your OAuth providers in the `.env` file and update the authentication settings in `src/lib/auth.ts`.

## UI Components

This project includes a comprehensive UI component library based on shadcn-svelte, located in `src/lib/components/ui/`.

## Testing

Run tests with:

```sh
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Deployment

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

> **Note:** Make sure to update your environment variables for production deployment.
