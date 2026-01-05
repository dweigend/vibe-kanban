# 🔌 Extension Points für Wissensmanagement

## MCP (Model Context Protocol) - Haupterweiterungspunkt

Vibe Kanban nutzt MCP als standardisierte Schnittstelle. Zwei Richtungen:

### 1. MCP-Server IN Vibe Kanban (für Agents)
Agents können externe Tools via MCP nutzen.

```json
// Agent-Konfiguration
{
  "mcpServers": {
    "custom_knowledge": {
      "command": "node",
      "args": ["/path/to/knowledge-server.js"]
    }
  }
}
```

### 2. Vibe Kanban ALS MCP-Server (extern nutzbar)
Andere Tools können Vibe Kanban steuern.

```bash
npx vibe-kanban@latest --mcp
```

Verfügbare Tools: `list_projects`, `list_tasks`, `create_task`, `start_task_attempt`

---

## Erweiterungs-Tiers

### Tier 1: Einfach (keine Core-Änderungen)

| Option | Beschreibung |
|--------|--------------|
| Custom MCP-Server | Eigene Tools für Agents |
| Agent-Profile | Konfigurationen anpassen |
| Task-Descriptions | Markdown für Knowledge |
| Tags | Kategorisierung nutzen |

### Tier 2: Mittel (Service-Extension)

```
crates/services/src/services/
├── knowledge_graph.rs    # NEU: Beziehungen
├── semantic_search.rs    # NEU: Vector Search
└── markdown_processor.rs # NEU: Enhanced MD
```

### Tier 3: Umfassend (Architektur)

- Knowledge Graph mit Embeddings
- Structured Data (YAML Frontmatter)
- Vector Database Integration

---

## Für Wissensmanagement nutzbar

### Bestehende Features

| Feature | Nutzen |
|---------|--------|
| Task-Descriptions | Markdown-Content |
| Tags | Kategorisierung |
| Images | Visuelle Dokumentation |
| Workspaces | Knowledge-Domains |

### Empfohlener Ansatz

1. **Phase 1**: MCP-Server für Obsidian/Notion erstellen
2. **Phase 2**: Tag-basierte Knowledge-Kategorisierung
3. **Phase 3**: Custom Service unter `crates/services/`

---

## Dateien für Erweiterungen

| Bereich | Pfad |
|---------|------|
| Neue Routes | `crates/server/src/routes/` |
| Neue Services | `crates/services/src/services/` |
| Neue Models | `crates/db/src/models/` |
| Migrations | `crates/db/migrations/` |
| Frontend Pages | `frontend/src/pages/` |
| API Calls | `frontend/src/lib/api.ts` |
