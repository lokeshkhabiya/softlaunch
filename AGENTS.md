# AGENTS.md

## Cursor Cloud specific instructions

### Overview
Softlaunch is an AI-powered code generation platform — a Turborepo monorepo with two apps and six shared packages. See `README.md` for full architecture and API reference.

### Services

| Service | Port | How to start |
|---------|------|-------------|
| PostgreSQL 16 | 5432 | `sudo docker compose up db -d` (from repo root) |
| Backend (Express/Bun) | 4000 | `bun run dev --filter=@softlaunch/backend` |
| Frontend (Next.js 16) | 3000 | `bun run dev --filter=@softlaunch/frontend` |

Start all dev services at once: `bun run dev` (runs both frontend and backend via Turborepo).

### Key commands
See `README.md` "Development > Commands" table for standard commands (`bun run dev`, `bun run lint`, `bun run build`, etc.).

### Non-obvious notes

- **Bun v1.1.38** is required (specified in `package.json` `packageManager` field). Install via `curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.38"`.
- **Docker is required** for PostgreSQL. Start the DB before running backend: `sudo docker compose up db -d`.
- **Database schema sync**: After `bun install` (which runs `prisma generate` via `postinstall`), push schema with `cd packages/db && bunx prisma db push`.
- **`.env` files**: Copy `.env.example` to `.env` at repo root, `apps/backend/`, and `apps/frontend/`. The root `.env` is auto-loaded by the config package and feeds both backend and docker-compose. Default DATABASE_URL uses `softlaunch:softlaunch_password@localhost:5432/softlaunch_db`.
- **Lint** only has a script in the frontend (`eslint`). Running `bun run lint` at root invokes it via Turborepo. Pre-existing lint errors exist in the frontend code.
- **Build**: `bun run build` works but emits `NotImplementedError` warnings for `worker_threads` options not yet supported by Bun — these are harmless and the build completes successfully.
- **External API keys** (E2B, LLM provider) are required only for the AI code-generation flow, not for basic app startup, auth, or project CRUD.
- The config package (`packages/config/src/server.ts`) uses `dotenv` to load `.env` from several candidate paths; Bun's auto-loading may also pick it up.
