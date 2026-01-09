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

## Phase 6: 🎨 Design System Refactoring

**Status:** In Arbeit

**Ziel:** Einheitliche Sidebar, "Brutalist" Style, bessere Nutzbarkeit

### 6A: Design System Dokumentation ✅
**Status:** Abgeschlossen (2026-01-09)

- [x] Mockups importiert (11 Dateien in `dev/ux/mockups/`)
- [x] Design System Specs extrahiert
- [x] Frontend-Analyse durchgeführt (shadcn/ui + Tailwind)
- [x] `dev/ux/STYLE-GUIDE.md` erstellt

### 6B: Stylesheet-Testseite ✅
**Status:** Abgeschlossen (2026-01-09)

- [x] Route `/styleguide` einrichten
- [x] Alle UI-Elemente sammeln (Buttons, Inputs, Cards, etc.)
- [x] Live-Preview für Design-Iterationen
- [x] Screenshot: `dev/ux/screenshots/styleguide-page.png`

### 6C: shadcn/ui Analyse & Mapping ✅
**Status:** Abgeschlossen (2026-01-09)

- [x] shadcn/ui Dokumentation durchgehen
- [x] Bestehende Komponenten katalogisieren (27 Komponenten)
- [x] Mapping: Brutalist → shadcn/ui erstellen
- [x] Custom Variants definieren (Button, Badge, Card)
- [x] Zusätzliche Komponenten aus Mockups dokumentiert
- [x] `dev/ux/SHADCN-THEMING.md` erstellt
- [x] `dev/ux/COMPONENT-MAPPING.md` erstellt

### 6D: Bestehendes System analysieren ✅
**Status:** Abgeschlossen (2026-01-09)

- [x] Aktuelles CSS/Tailwind Config dokumentieren
- [x] Navbar-Komponente analysieren
- [x] Layout-Struktur verstehen
- [x] Abhängigkeiten identifizieren
- [x] IST vs. SOLL Vergleich erstellt
- [x] Historischer Ballast identifiziert (VSCode-System)
- [x] Architektur-Entscheidungen dokumentiert
- [x] `dev/ux/SYSTEM-ANALYSIS.md` erstellt

**Key Decisions:**
- VSCode-Integration entfernen (nicht gebraucht)
- Sidebar collapsible (ja)
- Settings in Sidebar integrieren (keine separate Route)

### 6E: Refactoring-Strategie ✅
**Status:** Abgeschlossen (2026-01-09)

- [x] Migration-Plan erstellt (`dev/ux/MIGRATION-PLAN.md`)
- [x] Breaking Changes identifiziert
- [x] Phasen-weise Umsetzung geplant (Phase 7-9)
- [x] Rollback-Strategie dokumentiert

---

## Phase 7: UI Implementation - Basis ✅

**Status:** Abgeschlossen (2026-01-09)

**Fokus:** CSS Variables & Typography

- [x] Border-Radius auf 2px setzen
- [x] Typography anpassen (Inter + JetBrains Mono)
- [x] Task-Type Colors hinzufügen (research, coding, notes)
- [x] Screenshot: `dev/ux/screenshots/phase7-styleguide.png`

---

## Phase 8: Sidebar & Layout

**Fokus:** Navigation refactoren

- [ ] Navbar → Sidebar Komponente
- [ ] Layout-Grid implementieren
- [ ] Responsive Verhalten
- [ ] Sidebar-Modes (Dashboard, Settings, etc.)

---

## Phase 9: Task Type Backend

**Fokus:** Nur Backend

- [ ] DB Migration: `task_type TEXT NOT NULL DEFAULT 'code'`
- [ ] Rust Enum: `TaskType { Research, Note, Code }`
- [ ] API: CreateTask/UpdateTask erweitern
- [ ] Migration: Bestehende Tasks → type='code'

---

## Phase 10: Task Type Frontend

**Fokus:** UI für Task-Types

- [ ] TaskFormDialog: Type-Selector (Radio)
- [ ] Type-Badge in Task-Listen (Brutalist Style)
- [ ] Task Cards mit Type-spezifischen Borders
- [ ] Types-API Hook

---

## Phase 11: 🔍 Review & Polish

**Fokus:** Integration prüfen

- [ ] Code-Review Design System
- [ ] UX-Testing mit neuem Style
- [ ] Performance prüfen
- [ ] Refactoring falls nötig

---

## Phase 12: Feature Pages

**Fokus:** Verbleibende Sidebar-Modi

- [ ] MCP Servers Page
- [ ] Knowledge/Logs Page
- [ ] Settings Page (neues Layout)
- [ ] Projects Overview

---

## Phase 13: Export & Polish

**Fokus:** Export-System + UX Issues

- [ ] #8 Markdown Export
- [ ] #1, #2, #3, #4, #6 UX Issues
- [ ] Finale Dokumentation

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

| Phase | Typ | Fokus | Status |
|-------|-----|-------|--------|
| 5 | Impl | Quick Wins | ✅ |
| 6A | 📋 Doc | Design System Dokumentation | ✅ |
| 6B | Impl | Stylesheet-Testseite | ✅ |
| 6C | 📋 Doc | shadcn/ui Analyse | ✅ |
| 6D | 📋 Doc | System-Analyse | ✅ |
| 6E | 📋 Doc | Refactoring-Strategie | ✅ |
| 7 | Impl | UI Basis (Colors, Typography) | ✅ |
| 8 | Impl | Sidebar & Layout | Geplant |
| 9 | Impl | Task Type Backend | Geplant |
| 10 | Impl | Task Type Frontend | Geplant |
| 11 | 🔍 Review | Integration & Polish | Geplant |
| 12 | Impl | Feature Pages | Geplant |
| 13 | Impl | Export & UX Issues | Geplant |
| 14 | Impl | Tech Debt | Geplant |

---

## 📝 Notes

- **1 Phase = 1 Session** (kurz und fokussiert)
- **Review-Sessions** (🔍) nach wichtigen Implementierungen
- **KEINE eigene MCP Server Entwicklung** - Existierende nutzen!
- KISS-Prinzip: Bestehendes nutzen, minimal erweitern
