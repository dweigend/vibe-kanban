# 🧠 Knowledge Orchestrator

> **A Knowledge Management System based on [Vibe Kanban](https://github.com/BloopAI/vibe-kanban)**

---

## ⚠️ Status: Experimental

This project is **not functional** and under active development. It serves as a personal learning project.

**For a working version → [Original Vibe Kanban](https://github.com/BloopAI/vibe-kanban)**

---

## 🎯 Vision

Transforming Vibe Kanban (Coding Agent Orchestrator) into a **Knowledge Management Tool**:

| Vibe Kanban | Knowledge Orchestrator |
|-------------|------------------------|
| Write code | Orchestrate research |
| Pull Requests | Markdown documents |
| Coding Agents | Research Agents |
| Task = Feature | Task = Knowledge unit |

### Goals

- 📚 **Research Orchestration** – AI agents for information gathering
- 📝 **Markdown-First** – Knowledge in structured documents
- 🔗 **Knowledge Graph** – Linking information
- 🧩 **Modular** – Extensions without core changes

---

## 🙏 Credits

This project is based on the excellent work of **[BloopAI](https://github.com/BloopAI)**:

<p align="center">
  <a href="https://github.com/BloopAI/vibe-kanban">
    <img src="https://img.shields.io/badge/Based_on-Vibe_Kanban-blue?style=for-the-badge&logo=github" alt="Based on Vibe Kanban">
  </a>
  <a href="https://vibekanban.com">
    <img src="https://img.shields.io/badge/Original-vibekanban.com-green?style=for-the-badge" alt="Original Website">
  </a>
</p>

**License**: Apache 2.0 (same as original)

---

## 📁 Project Structure

```
├── crates/          # Rust Backend (Axum + Tokio)
│   ├── server/      # HTTP API
│   ├── services/    # Business Logic
│   ├── db/          # SQLx Models & Migrations
│   └── executors/   # Agent Execution Engine
├── frontend/        # React + TypeScript (Vite)
├── shared/          # Generated TypeScript Types (ts-rs)
└── dev/             # Development Documentation
    ├── questions.md
    ├── answers.md
    ├── architecture.md
    ├── git-workflow.md
    └── extension-points.md
```

---

## 🛠️ Development

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (>=18)
- [pnpm](https://pnpm.io/) (>=8)

Additional tools:
```bash
cargo install cargo-watch
cargo install sqlx-cli
```

### Setup

```bash
# Install dependencies
pnpm i

# Run dev server (frontend + backend)
pnpm run dev

# Backend only (with hot reload)
pnpm run backend:dev:watch

# Frontend only
pnpm run frontend:dev
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start full dev environment |
| `pnpm run generate-types` | Generate TypeScript types from Rust |
| `pnpm run check` | TypeScript type check |
| `pnpm run backend:check` | Rust cargo check |
| `cargo test --workspace` | Run all Rust tests |
| `pnpm run prepare-db` | Prepare SQLx offline mode |

### Building

```bash
# Build frontend
cd frontend && pnpm build

# Build from source (macOS)
./local-build.sh
```

### Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | Runtime | Auto | Server port |
| `BACKEND_PORT` | Runtime | Auto | Backend port (dev) |
| `FRONTEND_PORT` | Runtime | 3000 | Frontend port (dev) |
| `HOST` | Runtime | 127.0.0.1 | Server host |
| `RUST_LOG` | Runtime | info | Log level |

---

## 🔗 Links

- **Original Project**: [github.com/BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
- **Original Docs**: [vibekanban.com/docs](https://vibekanban.com/docs)
- **Install Original**: `npx vibe-kanban`
