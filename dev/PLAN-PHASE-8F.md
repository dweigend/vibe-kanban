# Phase 8F: Sidebar-Konsolidierung - VOLLSTÄNDIG

> **Single Point of Truth**: Dieser Plan ist die einzige Quelle für Phase 8F.
> Keine externen Pläne, keine Doppelstrukturen.

---

## Erkannte Probleme

| Problem | IST | SOLL |
|---------|-----|------|
| **1. Startseite** | Zeigt Projects-Liste | Kanban-Board direkt zeigen |
| **2. Settings** | Eigene Route `/settings/*` mit eigener Sidebar links | In rechte Sidebar integrieren |
| **3. Task-Details** | Öffnen im Hauptfenster (TasksLayout 3-Panel) | In rechter Sidebar anzeigen |
| **4. Task-Creation** | Pop-up Modal (TaskFormDialog) | In Sidebar integrieren |
| **5. Menüstruktur** | Doppelt (Settings-Sidebar + Navbar) | Alles in oberer Leiste |

---

## Architektur-Ziel

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
│                                         │ │   - MCP Config      │
└─────────────────────────────────────────┴───────────────────────┘
```

---

## Implementierungsschritte

### Schritt 1: SidebarMode erweitern

**Datei:** `frontend/src/contexts/SidebarContext.tsx`

```typescript
// AKTUELL
type SidebarMode = 'dashboard' | 'tasks' | 'task-detail';

// NEU
type SidebarMode =
  | 'dashboard'
  | 'tasks'
  | 'task-detail'
  | 'task-create'    // NEU
  | 'settings'       // NEU
  | 'mcp';           // NEU
```

---

### Schritt 2: Settings in Sidebar integrieren

**Neue Datei:** `frontend/src/components/sidebar/SidebarSettings.tsx`

- Accordion-basierte Settings (wie in MIGRATION-PLAN.md beschrieben)
- Alle bestehenden Settings-Sections wiederverwenden
- Kein eigenes Routing mehr

**Änderung:** `frontend/src/components/sidebar/SidebarContent.tsx`

```typescript
{mode === 'settings' && <SidebarSettings />}
```

---

### Schritt 3: Task-Creation in Sidebar

**Neue Datei:** `frontend/src/components/sidebar/SidebarTaskCreate.tsx`

- Formular aus TaskFormDialog extrahieren
- Inline-Rendering in Sidebar statt Modal
- Cancel → zurück zu Tasks-Mode

**Änderung:** Navbar "+" Button → `setMode('task-create')`

---

### Schritt 4: TasksLayout vereinfachen

**Datei:** `frontend/src/components/layout/TasksLayout.tsx`

- Task-Panel/TaskAttemptPanel ENTFERNEN aus Hauptfenster
- NUR Kanban-Board im Hauptfenster
- Task-Details → Sidebar (SidebarTaskDetail)

**Routing:** Task-Auswahl per URL-Parameter beibehalten
- `/projects/:projectId/tasks/:taskId` → Sidebar zeigt Task-Details

---

### Schritt 5: Settings-Route entfernen

**Datei:** `frontend/src/App.tsx`

- Route `/settings/*` entfernen
- Settings-Link in Navbar → `setMode('settings')`

---

### Schritt 6: Default-Route ändern

**Datei:** `frontend/src/App.tsx`

- `/` → Redirect zu letztem Projekt + Tasks
- Oder: Modal für Projekt-Auswahl wenn keins gespeichert

---

### Schritt 7: Navbar Settings-Dropdown

**Datei:** `frontend/src/components/layout/Navbar.tsx`

- Settings-Icon → Dropdown mit:
  - General
  - Projects
  - MCP Servers
  - Agents
- Click → `setMode('settings')` + entsprechende Sub-Section

---

## Dateien zu ändern

| Datei | Aktion | Priorität |
|-------|--------|-----------|
| `SidebarContext.tsx` | Mode erweitern | P0 |
| `SidebarContent.tsx` | Neue Modi rendern | P0 |
| `SidebarSettings.tsx` | CREATE | P1 |
| `SidebarTaskCreate.tsx` | CREATE | P1 |
| `TasksLayout.tsx` | Vereinfachen (nur Kanban) | P1 |
| `Navbar.tsx` | Settings-Dropdown | P1 |
| `App.tsx` | Settings-Route entfernen | P2 |
| `App.tsx` | Default-Route ändern | P2 |

---

## Test-Checkliste

```markdown
## 1. Startseite
- [ ] App öffnen → Kanban-Board sichtbar (nicht Projects-Liste)
- [ ] Falls kein Projekt: Auswahl-Dialog/Redirect

## 2. Sidebar-Modi
- [ ] Dashboard-Tab zeigt: Overview, Agents, Log
- [ ] Tasks-Tab zeigt: Task-Liste mit Filter
- [ ] Task anklicken → Task-Detail in Sidebar (NICHT im Hauptfenster!)

## 3. Task-Erstellung
- [ ] "+" Button klicken → Sidebar zeigt Formular (KEIN Popup!)
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
- [ ] KEIN doppeltes Menü (nur obere Leiste + Sidebar)
- [ ] Konsistente Icons
```

---

## Risiken & Mitigation

| Risiko | Mitigation |
|--------|------------|
| TasksLayout hat komplexe Panel-Logik | Schrittweise refactoren, Tests |
| Settings-Sections haben eigene Routen | Sections extrahieren, Routing entfernen |
| TaskFormDialog ist komplex | Formular-Logik extrahieren, Modal-Wrapper behalten für Legacy |

---

## Session-Aufteilung (Empfehlung)

**Session A: Sidebar-Modi + Settings**
1. SidebarContext erweitern
2. SidebarSettings erstellen
3. Settings-Route entfernen
4. Navbar Settings-Dropdown

**Session B: Task-Handling**
1. SidebarTaskCreate erstellen
2. TasksLayout vereinfachen
3. Task-Details nur in Sidebar
4. Default-Route ändern

---

## Checkliste vor Start

- [ ] `dev/UEBERGABE.md` lesen
- [ ] Diesen Plan (`dev/PLAN-PHASE-8F.md`) lesen
- [ ] `pnpm run dev` starten
- [ ] Checkpoint erstellen
