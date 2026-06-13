# Vite+ migration research

## Repo finding

This working tree does not currently look like a Turborepo workspace: no `turbo.json`, no `turbo` references outside ignored files, and only root `package.json`/`vite.config.ts` were found. The practical migration here is from a single-package SvelteKit Vite/Bun setup to Vite+, unless another branch/repo has the actual Turborepo layout.

## What Vite+ is

Vite+ is VoidZero's unified web toolchain. It ships as a global `vp` CLI plus a local `vite-plus` package. It wraps/replaces common frontend tooling: Vite/Rolldown for dev/build, Vitest for tests, Oxlint/Oxfmt for lint/format, tsdown for package builds, and Vite Task for workspace task orchestration.

Primary sources:

- https://viteplus.dev/guide/
- https://viteplus.dev/guide/why
- https://github.com/voidzero-dev/vite-plus

## Migration-relevant facts

- Official migration command: `vp migrate --no-interactive` from workspace root.
- Recommended before migration: already be on Vite 8+ and Vitest 4.1+. This repo is already on `vite ^8.0.16` and `vitest ^4.1.8`.
- After migration, run: `vp install`, `vp check`, `vp test`, `vp build`.
- `vp migrate` updates dependencies, rewrites imports, merges tool configs into `vite.config.ts`, and updates scripts, but docs say most projects still need manual adjustments.
- Vite+ imports usually replace `vite` config imports with `vite-plus`, and Vitest imports with `vite-plus/test`.
- `vp install/add/remove/update` delegates to the detected package manager. Bun is supported and detection uses `packageManager`, `devEngines.packageManager`, lockfiles, then `bunfig.toml` among other signals.

Sources:

- https://viteplus.dev/guide/migrate
- https://viteplus.dev/guide/install
- https://viteplus.dev/config/

## Turborepo replacement model

Vite+ does not use `turbo.json`. `vp run` runs package scripts and tasks declared under `run.tasks` in `vite.config.ts`.

Important differences:

- `package.json` scripts are not cached by default; use `vp run --cache <script>` or define Vite+ tasks.
- `vite.config.ts` tasks are cached by default.
- Dependencies use `dependsOn`, including cross-package `package#task` references.
- Workspace order is inferred from normal `package.json` workspace dependencies, not a separate Turbo graph.
- Recursive/filter execution exists: `vp run -r build`, `vp run --filter ./apps/web build`, `vp run -t @my/app#build`.
- Cache inputs can be automatic or explicit via `input`; cache outputs must be declared via `output` if artifacts should be restored.

Sources:

- https://viteplus.dev/guide/run
- https://viteplus.dev/config/run
- https://viteplus.dev/guide/monorepo

## Likely repo-specific migration shape

1. Install/use `vp` and ensure Bun stays the package manager. Consider adding explicit `packageManager: "bun@..."` if absent.
2. Run `vp migrate --no-interactive` on a clean branch.
3. Review `vite.config.ts`: preserve SvelteKit, Tailwind, Varlock, devtools, and Vitest browser/Svelte setup.
4. Review scripts:
   - `dev` -> likely `vp dev` or `varlock run -- vp dev` if secrets are needed.
   - `build` -> likely `vp build` or `varlock run -- vp build`.
   - `preview` -> `vp preview`.
   - `test:unit` -> `vp test` if compatible; browser Svelte setup needs verification.
   - `check` may still need `svelte-kit sync` / `svelte-check` unless Vite+ fully covers the project's SvelteKit checking needs.
   - DB and Playwright scripts may remain `vp run ...`/package scripts.
5. Validate with `vp install`, `vp check`, `vp test`, `vp build`, plus existing `bun run test:e2e`/`vp run test:e2e` if desired.

## Risks / uncertainties

- Vite+ is young/alpha-ish by versioning in sources (`0.1.x` references). Treat migration as experimental unless the team is comfortable with churn.
- Replacing Prettier + `prettier-plugin-svelte` with Oxfmt may be risky for Svelte formatting; verify `.svelte` formatting carefully.
- Replacing ESLint + `eslint-plugin-svelte` with Oxlint may lose Svelte-specific lint coverage.
- Replacing `svelte-check` with Vite+ type checking may not be a 1:1 SvelteKit substitute; keep `svelte-check` until proven redundant.
- Existing Varlock wrapping may need to stay around commands that require secrets.
- Current repo is not a Turborepo workspace, so Turbo-specific migration may need a different source tree.
