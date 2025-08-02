# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use `pnpm` for all package management operations.

## Development Commands

- **Start dev server**: `pnpm run dev`
- **Build production**: `pnpm run build`
- **Preview build**: `pnpm run preview`
- **Type checking**: `pnpm run check` (with watch: `pnpm run check:watch`)
- **Linting**: `pnpm run lint`
- **Formatting**: `pnpm run format`
- **All tests**: `pnpm test`
- **Unit tests**: `pnpm run test:unit`
- **E2E tests**: `pnpm run test:e2e`

## Database Commands

- **Push schema**: `pnpm run db:push`
- **Generate migrations**: `pnpm run db:generate`
- **Run migrations**: `pnpm run db:migrate`
- **Database studio**: `pnpm run db:studio`

## Architecture

### Tech Stack

- **Framework**: SvelteKit with Svelte 5 runes
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Better-auth with GitHub OAuth
- **UI**: Tailwind CSS with Shadcn components
- **Testing**: Vitest (unit) + Playwright (E2E)

### Key Features

- GitHub OAuth authentication
- Protected routes for authenticated gameplay

### Database Schema

Located in `src/lib/server/db/schema.ts`:

- `user` - User accounts with GitHub OAuth data
- `session` - User sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

### Authentication

- Uses Better-auth with GitHub OAuth provider
- Authentication logic in `src/lib/auth.ts`
- Protected routes under `src/routes/(protected)/`

## Code Conventions

Follow the established patterns from `.cursor/rules/svelte.mdc`:

- TypeScript for all code
- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- PascalCase for components, camelCase for variables/functions
- Functional programming patterns preferred
- Classes for complex state management (state machines)
- Shadcn components from `$lib/components/ui`

## Testing

- Unit tests use Vitest with browser testing via `vitest-browser-svelte`
- E2E tests use Playwright
