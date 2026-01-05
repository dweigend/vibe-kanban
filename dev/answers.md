# 📋 Antworten auf Fragen

> Referenz: [questions.md](./questions.md)

---

## 1. Git-Struktur und Workflow

**Frage**: Was muss ich mit der Git-Struktur beachten?

**Antwort**:
- Das Repo ist von BloopAI/vibe-kanban geklont
- Du musst einen Fork erstellen und die Remotes konfigurieren
- Workflow: Feature-Branch → Rebase von upstream → PR

→ Details: [git-workflow.md](./git-workflow.md)

---

## 2. Lizenz

**Frage**: Was ist die Lizenz? Darf ich forken/weiterentwickeln?

**Antwort**: **Apache 2.0** ✅

| Erlaubt | Pflicht |
|---------|---------|
| ✅ Forken | Lizenz-Kopie mitgeben |
| ✅ Weiterentwickeln | Änderungen kennzeichnen |
| ✅ Kommerziell nutzen | Copyright-Notizen bewahren |
| ✅ Sublizenzieren | |

---

## 3. Technische Infrastruktur

**Frage**: Welche technische Infrastruktur wird genutzt?

**Antwort**:
- **Backend**: Rust + Axum + Tokio + SQLx
- **Frontend**: React 18 + TypeScript + Vite + Zustand
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Types**: ts-rs generiert TypeScript aus Rust

→ Details: [architecture.md](./architecture.md)

---

## 4. Code → Wissensmanagement

**Frage**: Welche Teile ändern für Wissensmanagement?

**Antwort**: Wenig ändern, viel ergänzen:

1. **Task-Descriptions** bereits Markdown-fähig
2. **Tags** für Kategorisierung vorhanden
3. **MCP-Server** für externe Integration
4. Neue Services unter `crates/services/` hinzufügen

---

## 5. Allgemeine Architektur

**Frage**: Wie sieht die Architektur aus?

**Antwort**: Layered Architecture:

```
Frontend → REST/SSE → Routes → Services → Database
                                  ↓
                            Executors (Agents)
```

→ Details: [architecture.md](./architecture.md)

---

## 6. Schlüsselkomponenten

**Frage**: Welche Komponenten sind Schlüsselkomponenten?

**Antwort**:

| Komponente | Pfad | Funktion |
|------------|------|----------|
| Container Service | `crates/services/.../container.rs` | Kern-Orchestrierung |
| Executors | `crates/executors/` | 9 Agent-Implementierungen |
| MCP Server | `crates/server/src/mcp/` | Externe Integration |
| API Client | `frontend/src/lib/api.ts` | Frontend-Backend Komm. |

---

## 7. Upstream-Kompatibilität

**Frage**: Wie bleibe ich kompatibel mit dem Haupt-Repo?

**Antwort**:
1. **Separation of Concerns**: Eigene Module, wenig Core-Änderungen
2. **Regelmäßiger Sync**: `git fetch upstream && git rebase upstream/main`
3. **Feature Flags**: Eigene Features optional machen
4. **Eigener Branch**: `feature/knowledge-module` für deine Änderungen

---

## 8. Hardcoded vs. MCP/Agents

**Frage**: Was hardcoded, was via MCP/Agents?

**Antwort**:

| Hardcoded | MCP/Agents |
|-----------|------------|
| Core UI | Externe Datenquellen |
| Database Models | Knowledge-Enrichment |
| API Routes | Tool-Integrationen |
| | LLM-basierte Verarbeitung |

---

## 9. Libraries & Dokumentationen

**Frage**: Welche Libraries/Docs lesen?

**Antwort**:

| Priorität | Library | Docs |
|-----------|---------|------|
| 🔴 Hoch | Axum | https://docs.rs/axum |
| 🔴 Hoch | SQLx | https://docs.rs/sqlx |
| 🟡 Mittel | ts-rs | https://docs.rs/ts-rs |
| 🟡 Mittel | Zustand | https://zustand-demo.pmnd.rs |
| 🟢 Nice | rmcp (MCP) | https://docs.rs/rmcp |

---

## 10. Für Coding-Agenten wichtig

**Frage**: Was muss ein Agent beachten?

**Antwort**:
- `CLAUDE.md` lesen (Repository Guidelines)
- `pnpm run generate-types` nach Rust-Änderungen
- `cargo test --workspace` vor Commits
- Migrations in `crates/db/migrations/` für DB-Änderungen

---

## 11. Use Cases & Weiterentwicklungen

**Frage**: Welche dokumentierten Use Cases gibt es?

**Antwort**:
- **Task-Orchestrierung**: Multi-Agent Workflows
- **PR-Automation**: Automatische PR-Erstellung
- **MCP-Integration**: Externe Tools einbinden
- **Remote Deployment**: Cloud-basierte Ausführung

→ Siehe `docs/` Ordner für detaillierte Dokumentation

---

## 12. Deep Research Tools

**Frage**: Welche Deep Research Tools gibt es als Vorlage?

**Antwort**:

| Tool | Pattern | Eignung |
|------|---------|---------|
| **GPT-Researcher** | Planner → Crawler → Aggregator | ⭐⭐⭐ Beste Vorlage |
| **CrewAI** | Role-based Multi-Agent | ⭐⭐⭐ Gut für Custom |
| **AutoGen** | Decentralized Agents | ⭐⭐ Experimentell |

**KISS-Ansatz**: Parent-Child Tasks + Tags statt eigenem Framework!

→ Details: [research/integration-strategies.md](./research/integration-strategies.md)

---

## 13. OpenALEX / ArXiv Integration

**Frage**: Wie nutze ich OpenALEX oder ArXiv für akademische Quellen?

**Antwort**: **MCP Server erstellen** (modular, alle Agents können es nutzen)

| API | Zugang | Limit |
|-----|--------|-------|
| OpenALEX | Email in Header | 100k/Tag |
| ArXiv | Ohne Auth | Unbegrenzt |

→ Details: [research/mcp-extensions.md](./research/mcp-extensions.md)

---

## 14. Memory-Funktion

**Frage**: Wie integriere ich eine Memory-Funktion?

**Antwort**:

**Option A (KISS)**: Tasks als Wissens-Container
- Jeder Fakt = Ein Task mit Tag `knowledge`
- Durchsuchbar via Task-Suche

**Option B (Modular)**: Memory MCP Server
- SQLite oder Chroma für Speicherung
- `remember` / `recall` Tools

→ Details: [research/mcp-extensions.md](./research/mcp-extensions.md)

---

## 15. Fakten-Speicherung

**Frage**: Wie speichere ich Fakten, um Suchen nicht zu wiederholen?

**Antwort**: **Cache-Pattern via MCP**

```
1. Vor Suche: cache.check(query)
2. Falls gefunden: Cached Result nutzen
3. Falls nicht: Suchen → cache.save(query, result)
```

Implementierung: Memory MCP mit `cache_search` / `save_search` Tools

---

## 16. Systematischer Wissensaufbau

**Frage**: Wie baue ich System- und Projektwissen systematisch auf?

**Antwort**: **Hierarchische Task-Struktur**

```
Knowledge Base (Project)
├── System Knowledge [tag: meta]
│   ├── Architecture Decisions
│   └── Code Patterns
├── Research Log [tag: research]
│   └── 2024-01: Topic X
└── Open Questions [tag: question]
```

**Keine neuen Features nötig** - nur Workflow-Konvention!

---

## 17. Todo-Kategorien

**Frage**: Welche Kategorien sollten Todos haben?

**Antwort**: **Via Tags (existiert bereits!)**

| Tag | Icon | Use Case |
|-----|------|----------|
| `research` | 🔍 | Web-Recherche |
| `deep-research` | 🔬 | Multi-Step Analysis |
| `code` | 💻 | Programmierung |
| `idea` | 💡 | Brainstorming |
| `request` | 📨 | Externe Anfragen |
| `review` | 👁️ | Prüfung |
| `debug` | 🐛 | Fehlerbehebung |
| `docs` | 📝 | Dokumentation |

**Implementierung**: Tags mit Templates anlegen (SQL Insert)
