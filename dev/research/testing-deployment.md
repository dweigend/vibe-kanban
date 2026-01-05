# 🧪 Testing & Deployment - Vibe Kanban Analysis

> Analyse der bestehenden CI/CD Pipeline und Deployment-Strategien

---

## 🔬 Test-Infrastruktur

### Rust Tests
```bash
cargo test --workspace          # Alle Crate Tests
cargo clippy --all --all-targets # Linting
```

**Crates mit Tests:**
- `crates/server` - API Routes
- `crates/db` - SQLx Queries
- `crates/executors` - Agent Logic
- `crates/services` - Business Logic

### Frontend Tests
```bash
pnpm run lint        # ESLint
pnpm run format:check # Prettier
pnpm run check       # TypeScript
```

**Hinweis:** Keine Unit Test Suite (Jest/Vitest) konfiguriert.

### Database Tests
- SQLx Offline Mode für CI/CD
- Migration Checks
- Prepared Queries Validation

---

## 🔄 CI/CD Workflows

### 1. Test Workflow (`test.yml`)
**Trigger:** Pull Requests auf `main`

```yaml
Steps:
├── Frontend Lint + Format + TypeScript
├── i18n Regression Check
├── Frontend Build (Vite)
├── Backend: cargo test --workspace
├── Backend: cargo clippy
├── SQLx Prepared Queries Check
└── Database Migration Check
```

### 2. Pre-Release Workflow (`pre-release.yml`)
**Trigger:** Manual (workflow_dispatch)

```yaml
Jobs:
├── bump-version (package.json + Cargo.toml)
├── build-frontend (Vite + Sentry)
├── build-backend (6 Targets)
│   ├── Linux x64, ARM64 (cargo-zigbuild)
│   ├── macOS x64, ARM64 (Code Signing + Notarization)
│   └── Windows x64, ARM64
├── package-npx-cli
├── upload-to-r2 (Cloudflare)
└── create-prerelease (GitHub)
```

### 3. Publish Workflow (`publish.yml`)
**Trigger:** GitHub Release

```yaml
Steps:
├── Download Release Assets
├── Verify Package Integrity
├── Publish to npm Registry
└── Update Release Description
```

### 4. Remote Deploy (`remote-deploy-*.yml`)
**Trigger:** Push zu `main` (bei `crates/remote/**` Changes)

```yaml
Action: Dispatch Event zu BloopAI/vibe-kanban-remote-deployment
```

---

## 🐳 Docker Configuration

### Dockerfile (`crates/remote/Dockerfile`)
```dockerfile
# Multi-Stage Build
FROM node:20-alpine AS frontend-builder
FROM rust:1.89 AS backend-builder
FROM debian:bookworm-slim AS runtime

# Health Check
HEALTHCHECK CMD wget -qO- http://localhost:8081/health

# Security: Non-root user
USER appuser
```

### docker-compose.yml
```yaml
services:
  remote-db:
    image: postgres:16-alpine
    ports: 5432

  electric:
    # ElectricSQL für Real-Time Sync
    ports: 3000

  remote-server:
    build: .
    ports: 3000
    depends_on:
      - remote-db
      - electric
```

### Lokaler Start
```bash
docker compose --env-file .env.remote up --build
```

---

## 🛠️ Build System

### Local Build (`local-build.sh`)
```bash
# 1. Frontend
cd frontend && pnpm build

# 2. Backend
cargo build --release

# 3. MCP Server
cd crates/mcp-server && cargo build --release

# 4. Package
# Output: npx-cli/dist/macos-arm64/
```

### Development Setup
```bash
pnpm run dev                   # Frontend + Backend
pnpm run backend:dev:watch     # Backend only (hot reload)
pnpm run frontend:dev          # Frontend only
```

---

## 📦 Distribution

### NPM Package
```bash
npx @anthropic/vibe-kanban    # CLI Installation
```

**Binaries in:**
- `npx-cli/dist/linux-x64/`
- `npx-cli/dist/linux-arm64/`
- `npx-cli/dist/macos-x64/`
- `npx-cli/dist/macos-arm64/`
- `npx-cli/dist/windows-x64/`
- `npx-cli/dist/windows-arm64/`

### Cloudflare R2
- Binary Distribution
- Manifest für Version Management

---

## 🔐 Security

### Code Signing (macOS)
- Apple Developer Certificate
- Notarization via Apple

### Environment Variables
```bash
# OAuth (GitHub + Google)
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# JWT
JWT_SECRET

# Database
DATABASE_URL

# Sentry
SENTRY_AUTH_TOKEN
```

---

## 📊 Test Commands Summary

| Scope | Command |
|-------|---------|
| All Rust | `cargo test --workspace` |
| Rust Lint | `cargo clippy --all --all-targets` |
| Frontend Lint | `pnpm run lint` |
| Frontend Types | `pnpm run check` |
| Frontend Build | `pnpm run build` |
| Full Dev | `pnpm run dev` |
| SQLx Prepare | `pnpm run prepare-db` |
| Type Generation | `pnpm run generate-types` |

---

## 🚀 Deployment Optionen

### 1. Local (Desktop App)
```bash
npx @anthropic/vibe-kanban
```

### 2. Remote (Self-Hosted)
```bash
cd crates/remote
docker compose --env-file .env.remote up --build
```

### 3. Cloud (via GitHub Actions)
- Automatisches Deployment bei Push zu `main`
- Separate Dev/Prod Environments

---

## 📝 Relevanz für Knowledge Orchestrator

### Testing-Strategie
1. **Rust Tests beibehalten** - cargo test funktioniert
2. **MCP Server Tests** - Analog zu existierenden Patterns
3. **Integration Tests** - Gegen Scientific-Papers-MCP

### Deployment-Strategie
1. **Local First** - Desktop App via `npx`
2. **Remote später** - Docker Setup existiert
3. **Mobile** - PWA auf Remote Server
