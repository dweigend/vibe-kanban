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

## Phase 2.5: Testing & Feedback 🧪

**Status:** Aktuelle Phase

### Ziel
Hands-on Testing des Systems, um Anpassungsbedarf zu identifizieren.

### Vorgehen
1. System im Browser testen (http://localhost:3000)
2. Workflows durchspielen:
   - Projekt erstellen/öffnen
   - Tasks anlegen mit verschiedenen Agents
   - Tags nutzen
   - MCP Server testen
3. Feedback sammeln in `dev/FEEDBACK.md`

### Feedback-Kategorien
- 🐛 **Bugs** - Fehler und unerwartetes Verhalten
- 🎨 **UI/UX** - Verbesserungen der Benutzeroberfläche
- ⚡ **Performance** - Geschwindigkeit und Reaktionsfähigkeit
- ✨ **Features** - Gewünschte neue Funktionen
- 🔧 **Config** - Konfigurationsanpassungen

### Deliverable
`dev/FEEDBACK.md` mit priorisierter Liste von Änderungen

---

## Phase 3: Knowledge Features 🚀

**Status:** Geplant

### 3.1 Research Templates
- [ ] Multi-Step Research Template (Tag: `deep-research`)
- [ ] Quick Research Template (Tag: `research`)
- [ ] Idea Capture Template (Tag: `idea`)

### 3.2 Knowledge View (Frontend)
- [ ] Neuer Zustand Store für Knowledge
- [ ] Knowledge-Liste Komponente
- [ ] Tag-Filter UI
- [ ] Search-Funktion

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
