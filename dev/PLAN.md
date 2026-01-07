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

### Key Insight: KISS++
**Noch mehr existiert als gedacht!**
- Tags für Kategorien → ✅ Vorhanden
- Parent-Child Tasks → ✅ Vorhanden
- MCP System → ✅ Vorhanden
- ArXiv MCP Server → ✅ Existiert bereits!

---

## Phase 2: Foundation 🏗️ ✅

**Status:** Abgeschlossen (2026-01-05)

### 2.1 Local MCP Setup ✅
- [x] `data/mcp/` Ordnerstruktur angelegt
- [x] Scientific-Papers-MCP in default_mcp.json konfiguriert
- [x] mcp-memory-service in default_mcp.json konfiguriert

### 2.5 Testing & Feedback ✅
- [x] System getestet
- [x] Feedback gesammelt in `dev/FEEDBACK.md`
- [x] Interview für Task-Typen geführt

### 2.6 UI Cleanup ✅
- [x] Logo durch Text "Knowledge Orchestrator" ersetzen
- [x] Discord-Badge + Links entfernen
- [x] UI-Kontraste verbessert

### 2.7 Settings UI Refactor ✅
- [x] GeneralSettings modularisiert (745 → 130 Zeilen)
- [x] 8 Sektionen mit Icons extrahiert

---

## Phase 3: Knowledge Features 🚀 ✅

**Status:** Abgeschlossen (2026-01-07)

### 3.1-3.4 Knowledge Tags & Navigation ✅
- [x] Backend: knowledge_tag_id → knowledge_tag_ids (Multi-Tag)
- [x] Frontend: KnowledgePage mit Tag-Filter
- [x] TaskFormDialog: Multi-Select + Inline Tag Creation
- [x] Navigation: Knowledge Link im Hamburger-Menü

### 3.5 Multi-Tag Support ✅
- [x] DB: Junction-Tabelle `task_knowledge_tags`
- [x] UI: Multi-Select mit Badges

### 3.6 Issue-Dokumentation ✅
- [x] 13 GitHub Issues erstellt für UX/Feature/Technical Debt
- [x] Architektur-Issue für Task-Type-System (#9)

---

## Phase 4: Consolidation & Planning 📋

**Status:** Nächste Session

> **Ziel:** Strukturierte Planung vor weiterer Entwicklung

### 4.1 Code-Analyse
- [ ] Codebase-Review mit Fokus auf Issues
- [ ] Identifiziere Quick Wins vs. größere Refactorings
- [ ] Dependencies und technische Schulden dokumentieren

### 4.2 Issue-Triage
- [ ] Alle 13 GitHub Issues priorisieren
- [ ] Issues in sinnvolle Gruppen sortieren
- [ ] Abhängigkeiten zwischen Issues identifizieren
- [ ] Architektur-Issue #9 (Task Types) als Grundlage analysieren

### 4.3 Test-Strategie
- [ ] Bestehende Tests analysieren (`cargo test`)
- [ ] Kritische Pfade für neue Tests identifizieren
- [ ] Test-Plan für Phase 5 erstellen

### 4.4 Roadmap-Update
- [ ] PLAN.md mit konkreten Aufgaben aktualisieren
- [ ] Phasen 5+ definieren basierend auf Issue-Analyse
- [ ] Zeitliche Priorisierung (was bringt schnell Wert?)

---

## Phase 5+: Implementation (nach Planung)

> Wird in Phase 4 detailliert geplant

### Mögliche Themen (noch nicht priorisiert)
- Task-Type-System Architektur (#9)
- UX-Verbesserungen (#1-#6)
- Result Management/Export (#8)
- Technical Debt (#10-#14)
- Remote & Mobile (Phase 4 alt)

---

## 📊 GitHub Issues (dweigend/vibe-kanban)

### UX/Feature Issues
| # | Titel | Priorität |
|---|-------|-----------|
| [#1](https://github.com/dweigend/vibe-kanban/issues/1) | Task creation flow inconsistency | TBD |
| [#2](https://github.com/dweigend/vibe-kanban/issues/2) | Programming-specific options in dropdown | TBD |
| [#3](https://github.com/dweigend/vibe-kanban/issues/3) | Technical system messages visible | TBD |
| [#4](https://github.com/dweigend/vibe-kanban/issues/4) | Executor names too technical | TBD |
| [#5](https://github.com/dweigend/vibe-kanban/issues/5) | Git/Branch UI for Knowledge | TBD |
| [#6](https://github.com/dweigend/vibe-kanban/issues/6) | Input area irrelevant options | TBD |
| [#8](https://github.com/dweigend/vibe-kanban/issues/8) | No result management/export | TBD |
| [#9](https://github.com/dweigend/vibe-kanban/issues/9) | **Task Type System Architecture** | 🔴 Hoch |

### Technical Issues
| # | Titel | Priorität |
|---|-------|-----------|
| [#10](https://github.com/dweigend/vibe-kanban/issues/10) | WebSocket ECONNRESET | TBD |
| [#11](https://github.com/dweigend/vibe-kanban/issues/11) | Outdated browserslist | 🟢 Quick |
| [#12](https://github.com/dweigend/vibe-kanban/issues/12) | Rust num-bigint-dig warning | TBD |
| [#13](https://github.com/dweigend/vibe-kanban/issues/13) | Worktree polling performance | TBD |
| [#14](https://github.com/dweigend/vibe-kanban/issues/14) | npm env config warnings | 🟢 Quick |

---

## 📝 Notes

- **KEINE eigene MCP Server Entwicklung** - Existierende nutzen!
- KISS-Prinzip: Bestehendes nutzen, minimal erweitern
- **Nächste Session = Planung, nicht Implementation**
- Jede Phase = 1-2 Sessions
