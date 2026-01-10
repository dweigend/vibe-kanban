# Übergabe - Session 2026-01-10 (Phase 8E ✅ → Phase 8F vorbereitet)

## Was wurde gemacht

### Phase 8E: Task-Details in Sidebar ✅

**Implementiert:**
1. **Vitest Testing Setup**
   - `vitest.config.ts` + `src/test/setup.ts`
   - localStorage Mock für Tests
   - Scripts: `test`, `test:ui`, `test:run`

2. **SidebarContext erweitert**
   - `mode: 'dashboard' | 'tasks' | 'task-detail'`
   - `selectedTaskId: string | null`
   - `selectTask(taskId)` / `clearTask()`
   - localStorage Persistence für Mode + TaskId

3. **Neue Komponenten**
   - `SidebarModeToggle.tsx` - Dashboard/Tasks Tabs
   - `SidebarTaskList.tsx` - Kompakte Task-Liste mit Status-Filter
   - `SidebarTaskDetail.tsx` - Task-Details + Attempts

4. **8 Unit Tests passing**

---

## ⚠️ KRITISCH: Phase 8F - Sidebar-Konsolidierung

**Die folgenden Probleme wurden identifiziert und MÜSSEN in Phase 8F behoben werden:**

| # | Problem | IST | SOLL |
|---|---------|-----|------|
| 1 | **Startseite** | Zeigt Projects-Liste | Kanban-Board direkt |
| 2 | **Settings** | Eigene Route `/settings/*` mit Sidebar | In rechte Sidebar integrieren |
| 3 | **Task-Details** | Öffnen im Hauptfenster (TasksLayout) | In rechter Sidebar |
| 4 | **Task-Creation** | Pop-up Modal (TaskFormDialog) | In Sidebar |
| 5 | **Menüstruktur** | Doppelt (Settings-Sidebar + Navbar) | Nur obere Leiste |

**Detaillierter Plan:** `dev/PLAN-PHASE-8F.md`

---

## Architektur-Ziel Phase 8F

```
┌─────────────────────────────────────────────────────────────────┐
│ Navbar [Logo] [Sidebar] [Projects] [MCP] [Grid] [+] [Settings▼] │
├─────────────────────────────────────────┬───────────────────────┤
│                                         │ Sidebar (rechts)      │
│  HAUPTFENSTER                           │ ├── Mode Toggle       │
│  → NUR Kanban-Board                     │ ├── SearchBar         │
│  → Keine Task-Details hier              │ ├── Content:          │
│  → Keine Settings hier                  │ │   - Dashboard       │
│                                         │ │   - Tasks/Details   │
│                                         │ │   - Task-Creation   │
│                                         │ │   - Settings        │
└─────────────────────────────────────────┴───────────────────────┘
```

---

## Implementierungsschritte Phase 8F

### Schritt 1: SidebarMode erweitern
```typescript
// AKTUELL
type SidebarMode = 'dashboard' | 'tasks' | 'task-detail';

// NEU
type SidebarMode =
  | 'dashboard'
  | 'tasks'
  | 'task-detail'
  | 'task-create'  // NEU
  | 'settings';    // NEU
```

### Schritt 2: SidebarSettings.tsx erstellen
- Alle Settings-Sections als Accordion
- Bestehende Komponenten wiederverwenden

### Schritt 3: SidebarTaskCreate.tsx erstellen
- Formular aus TaskFormDialog extrahieren
- Inline-Rendering statt Modal

### Schritt 4: TasksLayout vereinfachen
- Task-Panel ENTFERNEN aus Hauptfenster
- NUR Kanban-Board im Hauptfenster

### Schritt 5: Settings-Route entfernen
- Route `/settings/*` entfernen
- Settings-Link → `setMode('settings')`

### Schritt 6: Default-Route ändern
- `/` → Redirect zu letztem Projekt + Kanban

### Schritt 7: Navbar Settings-Dropdown
- Settings-Icon → Dropdown-Menü

---

## Test-Checkliste Phase 8F

```markdown
## 1. Startseite
- [ ] App öffnen → Kanban-Board sichtbar (nicht Projects-Liste)

## 2. Sidebar-Modi
- [ ] Dashboard-Tab zeigt: Overview, Agents, Log
- [ ] Tasks-Tab zeigt: Task-Liste mit Filter
- [ ] Task anklicken → Task-Detail in Sidebar (NICHT Hauptfenster!)

## 3. Task-Erstellung
- [ ] "+" Button → Sidebar zeigt Formular (KEIN Popup!)
- [ ] Task erstellen → zurück zur Task-Liste
- [ ] Cancel → zurück zur Task-Liste

## 4. Settings
- [ ] Settings-Icon → Sidebar zeigt Settings
- [ ] Alle Settings-Sektionen als Accordion
- [ ] KEINE separate Settings-Seite im Hauptfenster

## 5. Hauptfenster
- [ ] NUR Kanban-Board sichtbar
- [ ] Keine Task-Details im Hauptfenster
- [ ] Keine Settings im Hauptfenster

## 6. Navigation
- [ ] KEIN doppeltes Menü
- [ ] Konsistente Icons
```

---

## Dateien Phase 8F

| Datei | Aktion | Priorität |
|-------|--------|-----------|
| `SidebarContext.tsx` | Mode erweitern | P0 |
| `SidebarContent.tsx` | Neue Modi rendern | P0 |
| `SidebarSettings.tsx` | CREATE | P1 |
| `SidebarTaskCreate.tsx` | CREATE | P1 |
| `TasksLayout.tsx` | Vereinfachen | P1 |
| `Navbar.tsx` | Settings-Dropdown | P1 |
| `App.tsx` | Routes ändern | P2 |

---

## Schnellstart nächste Session

```bash
# 1. Context lesen
cat dev/UEBERGABE.md
cat dev/PLAN-PHASE-8F.md

# 2. Dev-Server starten
pnpm run dev

# 3. Browser: http://localhost:3007

# 4. Tests ausführen
pnpm run test:run
```

---

## Phase-Status

| Phase | Status | Beschreibung |
|-------|--------|--------------|
| 8A | ✅ | VSCode Cleanup |
| 8B | ✅ | Header-Integration |
| 8C | ✅ | Sidebar Content (Mock) |
| 8D | ✅ | Sidebar-Konsolidierung |
| 8E | ✅ | Task-Details in Sidebar |
| **8F** | 📋 | **Sidebar-Konsolidierung VOLLSTÄNDIG** |
| 9 | ⏳ | Task Type Backend |

---

## Bekannte Issues

- Console Warning: "uncontrolled input to controlled" in SidebarSearchBar
- Backend 400 Errors wenn Backend nicht läuft
