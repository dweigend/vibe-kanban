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

## Phase 4: Consolidation & Planning 📋 ✅

**Status:** Abgeschlossen (2026-01-07)

### 4.1 Code-Analyse ✅
- [x] Codebase-Review mit Fokus auf Issues
- [x] Issue #9 Architektur analysiert
- [x] Test-Coverage analysiert (~5-8%, nur Git Services)

### 4.2 Issue-Triage ✅
- [x] 14 GitHub Issues priorisiert
- [x] Abhängigkeitsgraph erstellt (#9 ist Fundament)
- [x] Quick Wins identifiziert (#11, #14)

### 4.3 Test-Strategie ✅
- [x] Bestehende Tests analysiert (104 Tests in Git Services)
- [x] Test-Setup für API auf Phase 6 verschoben

### 4.4 Roadmap-Update ✅
- [x] Phasen 5-14 definiert (1 Phase = 1 Session)
- [x] Review-Sessions eingeplant (Phase 6, 9, 13)

---

## Phase 5: Quick Wins ✅

**Status:** Abgeschlossen (2026-01-07)

- [x] #11 browserslist update
- [x] #14 npm warnings (geschlossen - externes Environment-Problem)
- [ ] API-Test → verschoben auf Phase 6

---

## Phase 6: 🔍 Review & Architektur-Design

**Status:** Nächste Session

**Fokus:** Task-Type System designen, NICHT implementieren

- [ ] Architektur-Dokument erstellen (`dev/architecture/task-types.md`)
- [ ] DB Schema Design finalisieren
- [ ] Frontend Component-Struktur planen
- [ ] Test-Setup für API planen
- [ ] Plan.md für Phase 7-10 detaillieren

---

## Phase 7: Task Type Backend

**Fokus:** Nur Backend, kein Frontend

- [ ] DB Migration: `task_type TEXT NOT NULL DEFAULT 'code'`
- [ ] Rust Enum: `TaskType { Research, Note, Code }`
- [ ] API: CreateTask/UpdateTask erweitern
- [ ] Migration: Bestehende Tasks → type='code'

---

## Phase 8: Task Type Frontend Basis

**Fokus:** Nur UI-Grundlagen

- [ ] TaskFormDialog: Type-Selector (Radio)
- [ ] Type-Badge in Task-Listen
- [ ] Types-API Hook

---

## Phase 9: 🔍 Review & Refactoring

**Fokus:** Architektur prüfen, Code aufräumen

- [ ] Code-Review Task-Type System
- [ ] Refactoring falls nötig
- [ ] Plan.md aktualisieren

---

## Phase 10: Research Type Features

**Fokus:** Research-spezifische UI/UX

- [ ] #5 Git UI → "Research Paths" Terminologie
- [ ] Quellen-Ansicht UI
- [ ] Export-Button (Markdown)

---

## Phase 11: Note Type Features

**Fokus:** Note/Idea-spezifische UI/UX

- [ ] Quick Capture UI
- [ ] Simpler Editor (kein Git)
- [ ] Tag-Integration

---

## Phase 12: Result Export (#8)

**Fokus:** Vollständiges Export-System

- [ ] Markdown Export mit Metadaten
- [ ] Quellen-Zitation für Research
- [ ] Testprotokoll-Templates für Notes

---

## Phase 13: 🔍 Review & UX Polish

**Fokus:** Gesamtbild prüfen, UX verbessern

- [ ] User-Testing
- [ ] #1, #2, #3, #4, #6 UX Issues
- [ ] Finale Architektur-Dokumentation

---

## Phase 14: Technical Debt

**Fokus:** Aufräumen

- [ ] #10 WebSocket ECONNRESET
- [ ] #12 Rust warnings
- [ ] #13 Worktree polling

---

## 📊 GitHub Issues (dweigend/vibe-kanban)

### Architektur (Fundament)
| # | Titel | Phase | Status |
|---|-------|-------|--------|
| [#9](https://github.com/dweigend/vibe-kanban/issues/9) | **Task Type System** | 6-8 | 🔴 Offen |

### UX/Feature Issues
| # | Titel | Phase | Status |
|---|-------|-------|--------|
| [#1](https://github.com/dweigend/vibe-kanban/issues/1) | Task creation flow | 13 | Offen |
| [#2](https://github.com/dweigend/vibe-kanban/issues/2) | Programming dropdown | 13 | Offen |
| [#3](https://github.com/dweigend/vibe-kanban/issues/3) | System messages | 13 | Offen |
| [#4](https://github.com/dweigend/vibe-kanban/issues/4) | Executor names | 13 | Offen |
| [#5](https://github.com/dweigend/vibe-kanban/issues/5) | Git/Branch UI | 10 | Offen |
| [#6](https://github.com/dweigend/vibe-kanban/issues/6) | Input options | 13 | Offen |
| [#8](https://github.com/dweigend/vibe-kanban/issues/8) | Result export | 12 | Offen |

### Technical Issues
| # | Titel | Phase | Status |
|---|-------|-------|--------|
| [#10](https://github.com/dweigend/vibe-kanban/issues/10) | WebSocket ECONNRESET | 14 | Offen |
| [#11](https://github.com/dweigend/vibe-kanban/issues/11) | browserslist | 5 | ✅ Erledigt |
| [#12](https://github.com/dweigend/vibe-kanban/issues/12) | Rust warnings | 14 | Offen |
| [#13](https://github.com/dweigend/vibe-kanban/issues/13) | Worktree polling | 14 | Offen |
| [#14](https://github.com/dweigend/vibe-kanban/issues/14) | npm warnings | 5 | ✅ Geschlossen |

---

## 📅 Session-Übersicht

| Phase | Typ | Fokus |
|-------|-----|-------|
| 5 | Impl | Quick Wins ✅ |
| 6 | 🔍 Review | Architektur-Design |
| 7 | Impl | Backend Task-Types |
| 8 | Impl | Frontend Basis |
| 9 | 🔍 Review | Refactoring |
| 10 | Impl | Research Features |
| 11 | Impl | Note Features |
| 12 | Impl | Export System |
| 13 | 🔍 Review | UX Polish |
| 14 | Impl | Tech Debt |

---

## 📝 Notes

- **1 Phase = 1 Session** (kurz und fokussiert)
- **Review-Sessions** (🔍) nach wichtigen Implementierungen
- **KEINE eigene MCP Server Entwicklung** - Existierende nutzen!
- KISS-Prinzip: Bestehendes nutzen, minimal erweitern
