# 📋 Knowledge Orchestrator - Project Plan

> Transformation von Vibe Kanban zu einem Knowledge Management System

---

## 🎯 Vision

Ein modulares Wissensmanagement-Tool für:
- Research-Orchestrierung mit AI-Agents
- Systematische Informationsspeicherung in Markdown
- Multi-Device Zugriff (Desktop, Mobile, Remote)

---

## Phase 0: Project Setup ✅

**Status:** Abgeschlossen (2026-01-05)

- [x] GitHub Repository einrichten (dweigend/vibe-kanban)
- [x] README anpassen (eigenes Projekt, Credits)
- [x] Projekt-Architektur verstehen
- [x] Entwicklungsdokumentation anlegen (dev/)
- [x] Workflow-System einrichten (WORKFLOW.md)
- [x] CLAUDE.md konfigurieren

---

## Phase 1: Research 🔬 ✅

**Status:** Abgeschlossen (2026-01-05)

### 1.1 System-Analyse
- [x] Task-System analysiert (Tags, Parent-Child, Status)
- [x] Executor-System analysiert (9 Agents, MCP-Integration)
- [x] Frontend-Architektur analysiert (Zustand, Hooks, API)
- [x] Testing/Deployment Pipeline analysiert
- [x] Dokumentiert in `dev/research/`

### 1.2 MCP Ecosystem Research
- [x] Existierende MCP Server recherchiert
- [x] **Scientific-Papers-MCP** gefunden (ArXiv + OpenALEX + 4 weitere)
- [x] **mcp-memory-service** gefunden (1062⭐)
- [x] **arxiv-mcp-server** gefunden
- [x] Dokumentiert in `dev/research/existing-mcp-servers.md`

### 1.3 GitHub Patterns
- [x] GPT-Researcher Architektur analysiert
- [x] mem0 Memory Layer evaluiert
- [x] Chroma Vector DB API verstanden

### Key Insight: KISS++
**Noch mehr existiert als gedacht!**
- Tags für Kategorien → ✅ Vorhanden
- Parent-Child Tasks → ✅ Vorhanden
- MCP System → ✅ Vorhanden
- ArXiv MCP Server → ✅ Existiert bereits!
- OpenALEX MCP Server → ✅ Existiert bereits!
- Memory MCP Server → ✅ Existiert bereits!

---

## Phase 2: Foundation 🏗️

**Status:** In Progress (2026-01-05)

### 2.1 Local MCP Setup ✅
- [x] `data/mcp/` Ordnerstruktur angelegt
- [x] Scientific-Papers-MCP in default_mcp.json konfiguriert
- [x] mcp-memory-service in default_mcp.json konfiguriert
- [x] `.gitignore` für lokale MCP-Daten aktualisiert

### 2.2 Tags für Kategorien
- [ ] 8 Knowledge-Tags anlegen (nach Testing-Phase)

### 2.3 Context-Engineering
- [ ] Dev-Ordner konsolidieren (nach Testing-Phase)
- [ ] CONTEXT.md erstellen

---

## Phase 2.5: Testing & Feedback 🧪 ✅

**Status:** Abgeschlossen (2026-01-05)

### Ergebnisse
- [x] System getestet
- [x] Feedback gesammelt in `dev/FEEDBACK.md`
- [x] Interview für Task-Typen geführt
- [x] Roadmap erstellt

### Key Decisions
- **Task-Typen = Templates** (MCP + Output Style + System Prompt)
- **Agents:** Konfigurierbar in Settings
- **Login:** Komplett entfernen (Single-User)
- **Workflow:** Iterativ (mehrere Sessions)

---

## Phase 2.6: UI Cleanup 🎨 ✅

**Status:** Abgeschlossen (2026-01-05)

### Erledigt
- [x] Logo durch Text "Knowledge Orchestrator" ersetzen
- [x] Discord-Badge + Links entfernen
- [x] simple-icons Dependency entfernt
- [x] UI-Kontraste verbessert (Diff-Viewer: 0.7 → 0.85)

### Commit
`67facef4` - style: 🎨 UI cleanup - rebrand & remove Discord

---

## Phase 2.7: Settings UI Refactor 🎨 ✅

**Status:** Abgeschlossen (2026-01-05)

### Erledigt
- [x] @radix-ui/react-accordion & react-separator installiert
- [x] `accordion.tsx` und `separator.tsx` UI-Komponenten erstellt
- [x] GeneralSettings modularisiert (745 → 130 Zeilen)
- [x] 8 Sektionen mit Icons extrahiert:
  - AppearanceSection (Palette)
  - EditorSection (Code)
  - GitSection (GitBranch)
  - PullRequestsSection (GitPullRequest)
  - NotificationsSection (Bell)
  - PrivacySection (Shield)
  - TaskTemplatesSection (Tags)
  - SafetySection (AlertTriangle)
- [x] `useSettingsForm.ts` Hook extrahiert
- [x] Sticky Save Bar implementiert
- [x] Chrome DevTools Verifizierung bestanden

### Commit
`6d70b1b9` - refactor: ♻️ modularize GeneralSettings into sections

### Dateien (neu/geändert)
```
frontend/src/pages/settings/
├── GeneralSettings.tsx          (refactored)
├── useSettingsForm.ts           (neu)
└── sections/
    ├── AppearanceSection.tsx    (neu)
    ├── EditorSection.tsx        (neu)
    ├── GitSection.tsx           (neu)
    ├── NotificationsSection.tsx (neu)
    ├── PrivacySection.tsx       (neu)
    ├── PullRequestsSection.tsx  (neu)
    ├── SafetySection.tsx        (neu)
    ├── SettingsSection.tsx      (neu)
    ├── TaskTemplatesSection.tsx (neu)
    └── index.ts                 (neu)
frontend/src/components/ui/
├── accordion.tsx                (neu)
└── separator.tsx                (neu)
```

---

## Phase 3: Knowledge Features 🚀

**Status:** In Progress (2026-01-06)

### 3.0 Konsolidierung ✅
- [x] 6 redundante Dev-Dateien gelöscht
- [x] Dev-Ordner aufgeräumt

### 3.1 Backend: knowledge_tag_id ✅
- [x] Migration für knowledge_tag_id Feld
- [x] Task, CreateTask, UpdateTask structs erweitert
- [x] SQL Queries aktualisiert
- [x] TypeScript Types regeneriert

### 3.2 Knowledge View (Frontend) ✅
- [x] `useKnowledgeStore.ts` - Zustand Store für Filter-State
- [x] `KnowledgePage.tsx` - Tag-Filter Sidebar + Task-Liste
- [x] Route `/projects/:projectId/knowledge` registriert
- [x] knowledge_tag_id in alle Task-Operationen integriert

### 3.3 Task Dialog Integration ✅
- [x] Knowledge-Tag Dropdown in Task-Creation Dialog
- [x] Create + Edit Mode Support

### 3.4 Knowledge Navigation ✅
- [x] Link zur Knowledge Page im Hamburger-Menü
- [x] DevTools Verifizierung

### 3.5 Multi-Tag Support
- [ ] DB: Junction-Tabelle `task_knowledge_tags`
- [ ] Rust: `Vec<String>` statt `Option<String>`
- [ ] TypeScript Types regenerieren
- [ ] UI: Multi-Select mit Badges (shadcn Badge)
- [ ] UI: Plus-Button zum Hinzufügen

### Commits
```
7bba591e feat: ✨ add knowledge navigation and tag selector
ef4b53cf chore: 🔧 consolidate dev documentation
41eb9805 feat: ✨ add knowledge_tag_id to tasks
18703a5a feat: ✨ add knowledge view with tag filtering
```

---

## Phase 4: Remote & Mobile 📱

**Status:** Geplant

### 4.1 Remote Hosting
- [ ] Docker Compose Setup (existiert bereits in `crates/remote/`)
- [ ] Cloudflare Tunnel Konfiguration
- [ ] Security Hardening

### 4.2 Mobile/PWA
- [ ] PWA Manifest erstellen
- [ ] Responsive UI anpassen
- [ ] Offline-Funktionalität

---

## 📊 Ressourcen-Übersicht

### Existierende MCP Server (KEINE Entwicklung nötig!)

| Server | Installation | Features |
|--------|--------------|----------|
| Scientific-Papers-MCP | `npx -y @futurelab-studio/latest-science-mcp@latest` | 6 Quellen, Full-Text |
| arxiv-mcp-server | `uv tool install arxiv-mcp-server` | ArXiv Search/Download |
| alex-mcp | `uvx --from git+...` | OpenALEX Author Disambiguation |
| mcp-memory-service | `npx -y @doobidoo/mcp-memory-service` | Persistent Memory |

### Existierende Vibe Kanban Features (NUTZEN!)

| Feature | Wie nutzen |
|---------|------------|
| Tags | Kategorien für Knowledge Items |
| Parent-Child Tasks | Research Hierarchien |
| MCP Support | Alle 9 Agents können MCP nutzen |
| Docker Setup | Remote Deployment ready |

---

## 📂 Research Dokumentation

| Datei | Inhalt |
|-------|--------|
| `dev/research/system-analysis.md` | Task, Executor, Frontend Analyse |
| `dev/research/integration-strategies.md` | KISS-Antworten auf Fragen |
| `dev/research/existing-mcp-servers.md` | **NEU** - Existierende MCP Server |
| `dev/research/testing-deployment.md` | **NEU** - CI/CD Pipeline |
| `dev/research/mcp-extensions.md` | MCP Konzepte (historisch) |

---

## 📝 Notes

- **KEINE eigene MCP Server Entwicklung** - Existierende nutzen!
- KISS-Prinzip: Bestehendes nutzen, minimal erweitern
- Context-Engineering für effiziente AI-Nutzung
- Jede Phase = 1-2 Sessions
