# Phase 8F: Sidebar-First Architecture

> **Ziel:** Hauptfenster = NUR Kanban-Board. Navbar = einziges Menü. Sidebar = Content-Container.
>
> **Prinzip:** KISS - Ein Menü, keine Doppelstrukturen, alles vereinfachen.

---

## Architektur-Ziel

```
┌─────────────────────────────────────────────────────────────────┐
│ Navbar [Sidebar] [Projects] [ProjectCfg] [MCP] [Agents] [+] [Settings] │
├─────────────────────────────────┬───────────────────────────────┤
│                                 │ Sidebar (rechts)              │
│  HAUPTFENSTER                   │                               │
│  → NUR Kanban-Board             │  Content je nach Navbar-Klick:│
│  → KEINE Projects-Liste         │  - Projects → Projekt-Liste   │
│  → KEINE Settings               │  - MCP → MCP Server Config    │
│  → KEINE Task-Details           │  - Settings → General Settings│
│                                 │  - Agents → Agent-Profile     │
│                                 │                               │
│                                 │  KEINE TABS IN SIDEBAR!       │
└─────────────────────────────────┴───────────────────────────────┘
```

**Key Principles:**
1. Hauptfenster zeigt IMMER NUR das Kanban-Board
2. Navbar-Icons sind die EINZIGE Navigation
3. Sidebar hat KEINE eigenen Tabs - nur Content
4. SidebarModeToggle.tsx wird ENTFERNT

---

## Navbar Icon-Mapping

| Icon | Mode | Sidebar Content |
|------|------|-----------------|
| Sidebar Toggle | - | Collapse/Expand |
| Projects (Folder) | `projects` | Projekt-Liste + Create |
| Project Config | `project-settings` | Repos, Scripts |
| MCP (Robot) | `mcp` | MCP Server Config |
| Agents (Cpu) | `agents` | Agent-Profile |
| + | - | Task erstellen |
| Settings (Gear) | `settings` | General Settings |

**Aufräumen:**
- MCP, Agents, Project-Config = eigene Features, NICHT Teil von Settings
- OrganizationSettings = ENTFERNT (Single User System)
- Settings = nur persönliche Einstellungen

---

## SidebarModes

```typescript
type SidebarMode =
  | 'dashboard'        // Project Overview (Grid-Icon)
  | 'tasks'            // Task-Liste (via Task-Klick)
  | 'task-detail'      // Task-Details
  | 'projects'         // Projekt-Auswahl
  | 'project-settings' // Projekt-Config
  | 'settings'         // General Settings ✅ bereits
  | 'mcp'              // MCP Server Config
  | 'agents';          // Agent-Profile
```

---

## Implementierungsschritte

### Phase 1: Aufräumen
1. **SidebarModeToggle.tsx** - ENTFERNEN
2. **OrganizationSettings** - Route + Komponente ENTFERNEN

### Phase 2: Modes erweitern
3. **SidebarContext** - Modes erweitern

### Phase 3: Sidebar-Komponenten
4. **SidebarProjects.tsx** - CREATE
5. **SidebarProjectSettings.tsx** - CREATE
6. **SidebarMcp.tsx** - CREATE
7. **SidebarAgents.tsx** - CREATE
8. **SidebarContent.tsx** - Router für alle Modes

### Phase 4: Navbar
9. **Navbar.tsx** - ALLE Icons → onClick setMode()

### Phase 5: Routes
10. **App.tsx** - Default → Kanban, alte Routes entfernen

### Phase 6: Cleanup
11. Entfernen: Projects.tsx, SettingsLayout.tsx, OrganizationSettings.tsx

---

## Verification Checklist

- [ ] `localhost:3007/` → Kanban-Board sichtbar
- [ ] Sidebar hat KEINE Tabs (Dashboard/Tasks/Settings weg)
- [ ] Navbar-Icons → Sidebar-Content
- [ ] `/projects`, `/settings/*` → Redirect
- [ ] Hauptfenster = IMMER NUR Kanban-Board
