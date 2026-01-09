# 🎨 UX Design & Screenshots

> Zentrale Ablage für UI-Screenshots, Mockups und UX-Prototypen

---

## 📁 Ordnerstruktur

```
dev/ux/
├── README.md              ← Diese Datei
├── screenshots/
│   └── current/           ← Aktuelle UI Screenshots
├── mockups/               ← Design-Mockups (Figma, Sketch, etc.)
└── prototypes/            ← Interaktive Prototypen
```

---

## 📸 Screenshots (Aktueller Stand)

### Übersicht

| # | Datei | Beschreibung | Datum |
|---|-------|--------------|-------|
| 1 | `current/01-dashboard.png` | Hauptansicht mit Projekt-Liste | 2026-01-07 |
| 2 | `current/02-task-list.png` | Task-Liste eines Projekts | 2026-01-07 |
| 3 | `current/03-task-form-dialog.png` | Task erstellen/bearbeiten Dialog | 2026-01-07 |
| 4 | `current/04-task-detail.png` | Task-Detail Ansicht | 2026-01-07 |
| 5 | `current/05-knowledge-page.png` | Knowledge Page mit Tag-Filter | 2026-01-07 |
| 6 | `current/06-settings.png` | Settings-Seite | 2026-01-07 |

---

## 🎯 UI-Elemente (Phase 6 relevant)

### TaskFormDialog
**Pfad:** `frontend/src/components/dialogs/tasks/TaskFormDialog.tsx`

**Aktuelle Felder:**
- Title (Text)
- Description (Textarea)
- Status (Dropdown: Todo, InProgress, InReview, Done, Cancelled)
- Executor Profile (Dropdown)
- Auto Start (Checkbox)
- Repo/Branch Selection (wenn Auto Start)
- Knowledge Tags (Multi-Select mit Inline-Creation)

**Geplante Änderungen (Task-Type System):**
- [ ] **NEU:** Type-Selector (Radio: Research, Note, Code)
- [ ] Conditional Rendering basierend auf Type
- [ ] Research: Kein Executor, kein Branch
- [ ] Note: Kein Executor, kein Branch, simpler Editor
- [ ] Code: Wie bisher

---

### Task-Liste
**Pfad:** `frontend/src/pages/ProjectTasks.tsx`

**Aktuelle Elemente:**
- Task-Karten mit Title, Status-Badge
- Drag & Drop zwischen Spalten (Kanban)
- Filter nach Status

**Geplante Änderungen:**
- [ ] **NEU:** Type-Badge (Research 🔬 / Note 📝 / Code 💻)
- [ ] Type-Filter

---

### Knowledge Page
**Pfad:** `frontend/src/pages/KnowledgePage.tsx`

**Aktuelle Elemente:**
- Tag-Filter (Multi-Select)
- Task-Liste gefiltert nach Knowledge-Tags

**Geplante Änderungen:**
- [ ] **NEU:** Type-Filter zusätzlich zu Tag-Filter
- [ ] Type-spezifische Ansichten

---

## 🖼️ Mockups

### Dashboard Style Varianten

Verschiedene Design-Richtungen für das Haupt-Dashboard mit integrierter Sidebar.

| # | Datei | Beschreibung | Farbschema |
|---|-------|--------------|------------|
| 1 | [`dashboard-style-01-orange.png`](mockups/dashboard-style-01-orange.png) | Kanban + Project Overview, Active Agents, System Log | 🟠 Orange |
| 2 | [`dashboard-style-02-cyan.png`](mockups/dashboard-style-02-cyan.png) | Terminal/Hacker-Style mit Active_Nodes | 🔵 Cyan |
| 3 | [`dashboard-style-03-green.png`](mockups/dashboard-style-03-green.png) | Matrix-Style mit TODO_LIST, PROJECT_INFO | 🟢 Grün |
| 4 | [`dashboard-style-04-magenta.png`](mockups/dashboard-style-04-magenta.png) | Clean Modern mit Icons | 🟣 Magenta |

### Feature Pages

Sidebar-Mockups für verschiedene Funktionsbereiche.

| # | Datei | Beschreibung |
|---|-------|--------------|
| 1 | [`task-creation.png`](mockups/task-creation.png) | Task Creation mit Classification (Research/Coding/Note), Thinking Budget Slider, Active MCPs |
| 2 | [`mcp-servers.png`](mockups/mcp-servers.png) | MCP Server Management (Python, Web Search, Filesystem, PostgreSQL) |
| 3 | [`projects-sidebar.png`](mockups/projects-sidebar.png) | Projekt-Übersicht mit Activity-Graph |
| 4 | [`knowledge-logs.png`](mockups/knowledge-logs.png) | Knowledge/Results Log (Ingest, Success, Error) |
| 5 | [`settings.png`](mockups/settings.png) | Application Settings (Appearance, Editor, Git, Notifications) |

### Geplante Mockups (To Do)

| # | Name | Beschreibung | Status |
|---|------|--------------|--------|
| M1 | Type-Badges Detail | Badge-Design für Research/Note/Code | ⏳ Offen |
| M2 | Research Result View | Quellen-Ansicht, Export-Button | ⏳ Offen |
| M3 | Note Editor | Simpler Markdown-Editor | ⏳ Offen |
| M4 | Knowledge Page Filter | Type + Tag Filter kombiniert | ⏳ Offen |

---

## 🎨 Design-System

### Design System Referenzen

| # | Datei | Beschreibung |
|---|-------|--------------|
| 1 | [`design-system-brutalist.png`](mockups/design-system-brutalist.png) | Brutalist System: Layout Grid, Buttons, Input States, Card Anatomy, Color Logic, Frame Styles |
| 2 | [`design-system-stylesheet.png`](mockups/design-system-stylesheet.png) | Style Sheet: Typography, Input Components, Interactive Elements, Color Palette, Sliders |

### Color Palette (aus Stylesheet)

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| BG | `#09090b` | Hintergrund |
| Surface | `#18181b` | Cards, Container |
| Border | `#3f3f46` | Rahmen |
| Primary | `#a78bfa` | Primäre Aktionen (Lila) |
| Research | `#3b82f6` | Research Tasks (Blau) |
| Coding | `#f97316` | Dev Tasks (Orange) |
| Notes | `#eab308` | Note Tasks (Gelb) |

### Typography

| Style | Font | Größe | Verwendung |
|-------|------|-------|------------|
| Headline | Inter Bold | 32px | Hauptüberschriften |
| Subheadline | Inter Semibold | 18px | Unterüberschriften |
| Code | JetBrains Mono | 14px | Code, Terminal |
| Body | Inter Regular | 12px | Fließtext |

### Layout Grid

- **Spalten:** 12
- **Margin:** 24px fluid
- **Gutter:** 16px fixed
- **Border:** 1px solid Zinc-700

### Bestehende Status-Farben

| Status | Farbe |
|--------|-------|
| Todo | Gray |
| InProgress | Blue |
| InReview | Yellow |
| Done | Green |
| Cancelled | Red |

---

## 📝 Notizen

- **Use Case:** VR/OBE-Forschungsprojekt als Leitbild
- **Prinzip:** Type bestimmt verfügbare Optionen im Form
- **Ziel:** Weniger Clutter für Research/Note Tasks

---

## 🔗 Relevante Dateien

| Komponente | Pfad |
|------------|------|
| TaskFormDialog | `frontend/src/components/dialogs/tasks/TaskFormDialog.tsx` |
| Task Model | `crates/db/src/models/task.rs` |
| Task API | `crates/server/src/routes/tasks.rs` |
| Knowledge Page | `frontend/src/pages/KnowledgePage.tsx` |
| Project Tasks | `frontend/src/pages/ProjectTasks.tsx` |
| Types | `shared/types.ts` |
