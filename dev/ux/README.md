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

## 🖼️ Mockups (To Do)

### Benötigte Mockups für Phase 6

| # | Name | Beschreibung | Status |
|---|------|--------------|--------|
| M1 | Task Creation mit Type | Radio-Buttons für Type-Auswahl | ⏳ Offen |
| M2 | Type-Badges | Badge-Design für Research/Note/Code | ⏳ Offen |
| M3 | Research Result View | Quellen-Ansicht, Export-Button | ⏳ Offen |
| M4 | Note Editor | Simpler Markdown-Editor | ⏳ Offen |
| M5 | Knowledge Page Filter | Type + Tag Filter kombiniert | ⏳ Offen |

---

## 🎨 Design-System

### Farben (Vorschlag für Type-Badges)

| Type | Farbe | Hex | Icon |
|------|-------|-----|------|
| Research | Blau | `#3B82F6` | 🔬 |
| Note | Grün | `#10B981` | 📝 |
| Code | Orange | `#F59E0B` | 💻 |

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
