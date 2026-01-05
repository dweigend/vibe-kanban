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
- [x] Dokumentiert in `dev/research/system-analysis.md`

### 1.2 Integration-Strategien
- [x] Deep Research Tools evaluiert (GPT-Researcher, CrewAI)
- [x] OpenALEX/ArXiv Integration konzipiert (MCP Server)
- [x] Memory-Funktion konzipiert (Tasks oder MCP)
- [x] Todo-Kategorien definiert (8 Tags)
- [x] Dokumentiert in `dev/research/integration-strategies.md`

### 1.3 MCP-Konzepte
- [x] OpenALEX MCP Server spezifiziert
- [x] ArXiv MCP Server spezifiziert
- [x] Memory MCP Server spezifiziert
- [x] Dokumentiert in `dev/research/mcp-extensions.md`

### Key Insight: KISS-Strategie
**Viel existiert bereits!** Tags, Parent-Child Tasks, MCP-System - nutzen statt neu bauen.

---

## Phase 2: Foundation 🏗️

**Status:** Nächste Session

### 2.1 Tags für Kategorien (Effort: Minimal)
- [ ] SQL-Script für Knowledge-Tags erstellen
- [ ] Tags anlegen: `research`, `deep-research`, `idea`, `request`, `review`, `debug`, `docs`, `code`
- [ ] Tag-Templates definieren (Prompt-Vorlagen)

### 2.2 Memory MCP Server (Effort: 1 Tag)
- [ ] Package-Struktur anlegen (`packages/memory-mcp/`)
- [ ] SQLite-basierte Speicherung implementieren
- [ ] Tools: `remember`, `recall`, `forget`, `list_memories`
- [ ] Tests schreiben
- [ ] In MCP-Config integrieren

### 2.3 OpenALEX MCP Server (Effort: 1 Tag)
- [ ] Package-Struktur anlegen (`packages/openalex-mcp/`)
- [ ] API-Client implementieren
- [ ] Tools: `search_works`, `get_work`, `get_citations`
- [ ] Tests schreiben
- [ ] In MCP-Config integrieren

---

## Phase 3: Extended Features 🚀

**Status:** Geplant

### 3.1 ArXiv MCP Server
- [ ] Package-Struktur anlegen
- [ ] Atom XML Parser implementieren
- [ ] Tools: `search_arxiv`, `get_paper`, `get_pdf_url`

### 3.2 Research Templates
- [ ] Multi-Step Research Template (Tag: `deep-research`)
- [ ] Quick Research Template (Tag: `research`)
- [ ] Idea Capture Template (Tag: `idea`)

### 3.3 Knowledge View (Frontend)
- [ ] Neuer Zustand Store für Knowledge
- [ ] Knowledge-Liste Komponente
- [ ] Tag-Filter UI
- [ ] Search-Funktion

---

## Phase 4: Remote & Mobile 📱

**Status:** Geplant

### 4.1 Remote Hosting
- [ ] Docker Compose Setup
- [ ] Cloudflare Tunnel Konfiguration
- [ ] Security Hardening

### 4.2 Mobile/PWA
- [ ] PWA Manifest erstellen
- [ ] Responsive UI anpassen
- [ ] Offline-Funktionalität

---

## 📊 Effort-Schätzung

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 2.1 | Tags | < 1h |
| Phase 2.2 | Memory MCP | 1 Tag |
| Phase 2.3 | OpenALEX MCP | 1 Tag |
| Phase 3.1 | ArXiv MCP | 0.5 Tag |
| Phase 3.2 | Templates | < 1h |
| Phase 3.3 | Knowledge View | 2 Tage |
| Phase 4 | Remote/Mobile | 2-3 Tage |

**Gesamt für MVP:** ~5-6 Tage

---

## 📝 Notes

- Jede Phase = 1-2 Sessions
- Research-Ergebnisse in `dev/research/` dokumentieren
- KISS-Prinzip: Bestehendes nutzen, minimal erweitern
- MCP Server sind modular und wiederverwendbar
