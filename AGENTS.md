# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope Control

- **DO:** Smallest possible change that solves problem
- **EXACT TASK ONLY:** Do precisely what's requested
- **NO EXTRAS:** No "nice to have" features without request
- **DON'T TOUCH:** Only edit files directly related to task

## Documentation

- **Next Session:** Always write `dev/UEBERGABE.md` at session end
- **Development History:** Track progress in `dev/PLAN.md`

## Workflow

See `dev/WORKFLOW.md` for the step-by-step development process:
1. **Checkpoint** → Safety commit before changes
2. **Research** → Explore codebase (optional)
3. **Plan** → Design approach (optional)
4. **Implement** → Write code
5. **Verify** → Lint, DevTools, Review Agent
6. **Commit** → With proper type and emoji

## Project Structure

- `crates/`: Rust workspace — `server` (API), `db` (SQLx), `executors`, `services`, `utils`
- `frontend/`: React + TypeScript (Vite, Tailwind)
- `shared/`: Generated TypeScript types (`shared/types.ts`) — do not edit directly
- `dev/`: Development documentation and handover files

## Build & Development Commands

```bash
# Install
pnpm i

# Development
pnpm run dev                    # Frontend + Backend
pnpm run backend:dev:watch      # Backend only (hot reload)
pnpm run frontend:dev           # Frontend only

# Type checking
pnpm run check                  # Frontend TypeScript
pnpm run backend:check          # Rust cargo check

# Testing
cargo test --workspace          # Rust tests

# Type generation (Rust → TypeScript)
pnpm run generate-types

# Database
pnpm run prepare-db             # SQLx offline mode
```

## Managing Shared Types

ts-rs generates TypeScript from Rust structs. After changing Rust types:
```bash
pnpm run generate-types
```
Never edit `shared/types.ts` directly — edit `crates/server/src/bin/generate_types.rs`.

## Coding Style

**Rust:**
- `rustfmt` enforced
- snake_case modules, PascalCase types
- Add `Debug`/`Serialize`/`Deserialize` where useful

**TypeScript/React:**
- ESLint + Prettier (2 spaces, single quotes)
- PascalCase components, camelCase vars/functions
- Explicit types, no `any`
- React: Proper hooks, avoid unnecessary re-renders
- Zustand for state management

## Git Repository

- **ALWAYS use `origin`** (`dweigend/vibe-kanban`) for all Git operations
- Never use `upstream` (BloopAI/vibe-kanban) unless explicitly requested
- Issues, PRs, and pushes go to `origin`

## Commit Format

```
type: emoji description
```

| Type | Emoji | Description |
|------|-------|-------------|
| feat | ✨ | New feature |
| fix | 🐛 | Bugfix |
| refactor | ♻️ | Code restructure |
| style | 🎨 | Formatting, CSS |
| docs | 📝 | Documentation |
| chore | 🔧 | Build, dependencies |
