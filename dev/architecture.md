# 🏗️ Knowledge Orchestrator - Systemarchitektur

> Ursprünglich "Vibe Kanban" - transformiert zu einem Wissensmanagement-System

## Übersicht

Monorepo mit **Rust-Backend** (Axum) + **React-Frontend** (Vite). Orchestriert AI-Agents für Research und Wissensmanagement.

## Projektstruktur

```
vibe-kanban/
├── crates/                   # Rust Workspace
│   ├── server/              # HTTP API (Axum)
│   ├── services/            # Business Logic
│   ├── db/                  # SQLx Models
│   ├── executors/           # Agent Execution
│   └── ...
├── frontend/                # React + TypeScript
├── shared/                  # Generated Types (ts-rs)
└── dev/                     # Lokale Dokumentation
```

## Tech-Stack

| Layer | Technologie |
|-------|-------------|
| Backend | Rust + Axum + Tokio |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Frontend | React 18 + TypeScript + Vite |
| State | Zustand + React Query |
| Types | ts-rs (Rust → TypeScript) |

## Schlüsselkomponenten

| Datei | Funktion |
|-------|----------|
| `crates/services/src/services/container.rs` | Kern-Orchestrierung |
| `crates/executors/` | 9 Agent-Executors |
| `crates/server/src/mcp/` | MCP-Server |
| `frontend/src/lib/api.ts` | API-Client |

## Architektur

```
Frontend (React) → REST/SSE → Backend (Axum) → Services → Database
                                    ↓
                              Executors (Agents)
```

## Commands

```bash
pnpm run dev              # Full dev
pnpm run generate-types   # Rust → TypeScript
cargo test --workspace    # Rust tests
```
