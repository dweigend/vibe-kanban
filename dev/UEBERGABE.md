# Übergabe - Session 2026-01-10 (Phase 8F Planung)

## Was wurde gemacht

### Phase 8E: Task-Details in Sidebar ✅ (vorherige Session)
- Vitest Testing Setup
- SidebarContext erweitert (mode, selectedTaskId)
- SidebarModeToggle, SidebarTaskList, SidebarTaskDetail
- 8 Unit Tests passing

### Diese Session: Phase 8F Planung + Teilimplementierung

**Implementiert:**
1. `SidebarSettings.tsx` - General Settings in Sidebar
2. Settings-Route vereinfacht (nur noch Project, MCP, Agents)
3. Navbar Settings → onClick statt Route

**Geplant (für nächste Session):**
- Komplette **Sidebar-First Architecture**
- Siehe `dev/PLAN-PHASE-8F.md`

---

## Architektur-Entscheidung: Sidebar-First

**KISS-Prinzip:** Ein Menü, keine Doppelstrukturen.

```
┌─────────────────────────────────────────────────────────────────┐
│ Navbar = EINZIGES MENÜ                                          │
├─────────────────────────────────┬───────────────────────────────┤
│  HAUPTFENSTER                   │ Sidebar = Content-Container   │
│  → NUR Kanban-Board             │ → KEINE Tabs                  │
│  → Keine anderen Seiten         │ → Content via Navbar-Klick    │
└─────────────────────────────────┴───────────────────────────────┘
```

**Navbar Icon-Mapping:**
| Icon | Sidebar Content |
|------|-----------------|
| Projects (Folder) | Projekt-Liste |
| Project Config | Repos, Scripts |
| MCP (Robot) | MCP Server Config |
| Agents (Cpu) | Agent-Profile |
| Settings (Gear) | General Settings |

**Aufräumen:**
- OrganizationSettings → ENTFERNEN (Single User)
- SidebarModeToggle → ENTFERNEN (Navbar = einzige Nav)
- Alle `/settings/*` Routes → Redirect

---

## Nächste Session: Implementierung

**Detaillierter Plan:** `dev/PLAN-PHASE-8F.md`

### 11 Steps in 6 Phasen:

1. **Aufräumen:** SidebarModeToggle + OrganizationSettings entfernen
2. **Modes:** SidebarContext erweitern (projects, mcp, agents, project-settings)
3. **Komponenten:** SidebarProjects, SidebarMcp, SidebarAgents, SidebarProjectSettings
4. **Navbar:** Alle Icons → onClick setMode()
5. **Routes:** Default → Kanban, alte Routes entfernen
6. **Cleanup:** Projects.tsx, SettingsLayout.tsx entfernen

---

## Schnellstart nächste Session

```bash
# 1. Context lesen
cat dev/UEBERGABE.md
cat dev/PLAN-PHASE-8F.md

# 2. Dev-Server
pnpm run dev

# 3. Implementierung starten
# → Siehe PLAN-PHASE-8F.md für Steps
```

---

## Aktueller Code-Stand

**Geänderte Dateien (diese Session):**
- `frontend/src/contexts/SidebarContext.tsx` - Mode 'settings' hinzugefügt
- `frontend/src/components/sidebar/SidebarSettings.tsx` - NEU
- `frontend/src/components/sidebar/SidebarContent.tsx` - Settings-Rendering
- `frontend/src/components/sidebar/SidebarModeToggle.tsx` - Settings-Tab (wird entfernt!)
- `frontend/src/components/layout/Navbar.tsx` - Settings onClick
- `frontend/src/App.tsx` - GeneralSettings Route entfernt
- `frontend/src/pages/settings/SettingsLayout.tsx` - General entfernt

---

## Bekannte Issues

- Console Warning: "uncontrolled input to controlled" in SidebarSearchBar
- Backend 400 Errors wenn Backend nicht läuft
- SidebarModeToggle noch vorhanden (wird in nächster Session entfernt)
