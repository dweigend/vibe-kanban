# 🔄 ÜBERGABE - Sidebar-First Task Integration Complete

## ✅ Abgeschlossen (Session 2026-01-10)

### Pre-Phase 9: Sidebar-First Task Integration
**Ziel:** Task-Erstellung und Task-Details vollständig in Sidebar integrieren

**Problem (von David identifiziert):**
1. Task-Erstellung passierte über Popup (TaskFormDialog) statt Sidebar
2. Task-Details waren nicht vollständig in Sidebar integriert

**Implementiert:**
- ✅ `SidebarContext.tsx` erweitert: +`task-create`, +`task-edit` Modes
- ✅ `SidebarTaskCreate.tsx` NEU erstellt:
  - TanStack Form Integration
  - Titel, Description (WYSIWYG), Knowledge Tags
  - Executor Profile Selector, Branch Selector
  - AutoStart Toggle
  - "Create & Start" Button
- ✅ `SidebarTaskDetail.tsx` erweitert:
  - Edit-Button (✏️) → öffnet task-edit Mode
  - Start Attempt Button mit Profile/Branch Selection
  - Knowledge Tags Anzeige
- ✅ `Navbar.tsx` - Plus-Button → öffnet Sidebar mit task-create
- ✅ `ProjectTasks.tsx` - 'c' Keyboard Shortcut → öffnet Sidebar

**Commit:** `98cd458d` - feat: ✨ implement Sidebar-First task creation and details

---

## 📁 Wichtige Dateien

**Geändert:**
```
frontend/src/contexts/SidebarContext.tsx     # +task-create, +task-edit Modes
frontend/src/components/sidebar/SidebarContent.tsx  # Router für neue Modes
frontend/src/components/sidebar/SidebarTaskDetail.tsx  # +Edit, +Start, +Tags
frontend/src/components/layout/Navbar.tsx    # Plus → Sidebar statt Popup
frontend/src/pages/ProjectTasks.tsx          # 'c' Key → Sidebar
```

**Neu:**
```
frontend/src/components/sidebar/SidebarTaskCreate.tsx  # Komplett neues Form
```

**Nicht entfernt (noch verwendet für Edit/Duplicate):**
```
frontend/src/components/dialogs/tasks/TaskFormDialog.tsx
frontend/src/lib/openTaskForm.ts
```

---

## 🎯 Nächste Schritte (Phase 9)

### Option A: Task Type Backend (wie im PLAN.md)
- DB Migration: `task_type TEXT NOT NULL DEFAULT 'code'`
- Rust Enum: `TaskType { Research, Note, Code }`
- API: CreateTask/UpdateTask erweitern

### Option B: TaskFormDialog Migration abschließen
- Edit/Duplicate auch in Sidebar verschieben
- TaskFormDialog.tsx und openTaskForm.ts entfernen

### Option C: Knowledge Tags in Task-Cards
- Tags als Badges in Kanban-Cards anzeigen
- Quick-Filter nach Tags

---

## 🔧 Development

```bash
# Start
pnpm run dev

# TypeScript Check
pnpm run check

# Lint
pnpm run lint

# Frontend: http://localhost:3007
```

---

## ⚠️ Bekannte Issues

1. **i18n Missing Key:** `settings.general.title` wird nicht übersetzt
2. **API 400 Errors:** Treten auf wenn kein Projekt ausgewählt ist (bekanntes Verhalten)

---

## 🏗️ Architektur nach dieser Session

```
┌─────────────────────────────────────────────────────────┐
│                       NAVBAR                            │
│  [≡] [📁] [⚙️] [📖] [🤖] [⚙] [◻] │ [📝] [+] [⚙] [◻]  │
│   ↓    ↓    ↓    ↓    ↓    ↓    ↓      ↓    ↓         │
│  toggle proj p-set know mcp agents    IDE  CREATE set  │
└─────────────────────────────────────────────────────────┘
                                              ↓
┌───────────────────────────────┬─────────────────────────┐
│                               │                         │
│                               │     SIDEBAR             │
│       KANBAN BOARD            │   (Content-Container)   │
│     (Hauptfenster)            │                         │
│                               │   Mode-abhängig:        │
│    ProjectTasks               │   - Dashboard           │
│    (immer sichtbar)           │   - Tasks (Liste)       │
│                               │   - Task-Detail ✏️▶️    │
│                               │   - Task-Create ⭐ NEU  │
│                               │   - Task-Edit ⭐ NEU    │
│                               │   - Settings            │
│                               │   - Projects            │
│                               │   - Project-Settings    │
│                               │   - MCP                 │
│                               │   - Agents              │
│                               │   - Knowledge           │
│                               │                         │
└───────────────────────────────┴─────────────────────────┘
```
