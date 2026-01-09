# 🔍 System-Analyse - Phase 6D

> IST vs. SOLL Vergleich, Historischer Ballast, Vereinfachungsstrategie

---

## IST vs. SOLL Übersicht

| Aspekt | IST (aktuell) | SOLL (Mockups) |
|--------|---------------|----------------|
| **Navigation** | Navbar oben (horizontal, komplex) | Minimal-Navbar + **Sidebar RECHTS** |
| **Sidebar** | Keine (Settings hat eigene links) | Kontextabhängig rechts, collapsible |
| **Border-Radius** | `0.5rem` (8px, rund) | `2px` (Brutalist, angular) |
| **Font** | Chivo Mono | Inter + JetBrains Mono |
| **SearchBar** | In Navbar | In Sidebar |
| **Task Cards** | Ohne Type-Border | Farbige Borders links (Blau/Orange/Gelb) |
| **Settings** | Separate Route `/settings/*` | In Haupt-Sidebar rechts als Accordion |

---

## Mockups als Ground Truth

| Mockup | Inhalt |
|--------|--------|
| `design-system-brutalist.png` | 2px Borders, Color Logic, Frame Styles |
| `projects-sidebar.png` | Sidebar rechts mit Projects, Activity |
| `dashboard-style-*.png` | Agents, System Log, Search in Sidebar |
| `task-creation.png` | Task Form mit Classification in Sidebar |
| `settings.png` | Settings Accordion in Sidebar |
| `knowledge-logs.png` | Results Log in Sidebar |

---

## Historischer Ballast

### 1. VSCode-Fallback System ❌ ENTFERNEN

Das 3-Tier CSS Variable System wurde für VSCode-Embedding gebaut, wird aber nicht mehr gebraucht.

**Aktuell (3-Tier):**
```css
/* Layer 1: Private Theme Tokens */
--_background: 48 33% 97%;

/* Layer 2: Public mit VSCode-Fallback */
--background: var(--vscode-editor-background, var(--_background));

/* Layer 3: Tailwind */
hsl(var(--background))
```

**SOLL (2-Tier, vereinfacht):**
```css
/* Layer 1: Theme Tokens (direkt) */
--background: 48 33% 97%;

/* Layer 2: Tailwind */
hsl(var(--background))
```

**Zu entfernen:**
- `frontend/src/vscode/` - Ganzer Ordner
- `frontend/src/styles/index.css` - ~100 Zeilen VSCode-Fallbacks

### 2. Font: Chivo Mono ❌ ERSETZEN

**Aktuell:**
```js
fontFamily: { 'chivo-mono': ['Chivo Mono', 'Noto Emoji', 'monospace'] }
```

**SOLL:**
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 3. Border-Radius ❌ ÄNDERN

**Aktuell:** `--radius: 0.5rem` (8px)
**SOLL:** `--radius: 2px` (Brutalist)

### 4. Navbar-Komplexität ❌ VEREINFACHEN

**Aktuell in Navbar:**
- Logo + Branding
- SearchBar (nur auf Tasks-Route aktiv)
- Shared Tasks Toggle
- Create Task Button
- Open in IDE Button
- Settings Link
- Hamburger Menu (Navigation, OAuth)

**SOLL (minimal):**
- `>|` Collapse Sidebar
- `📁` Projects Icon
- `⚙️` MCP Icon
- `☰` Grid View Icon
- `+` Create Task Icon
- `⚙️` Settings Icon
- `🟣` Profile Icon

### 5. Settings-Route ❌ INTEGRIEREN

**Aktuell:** Separate Route `/settings/*` mit eigener Sidebar links
**SOLL:** Settings im Haupt-Sidebar rechts als Accordion

---

## CSS-Architektur (aktuell)

### 3-Tier Variable System

```
Layer 1: --_variable (private theme defaults)
         → In :root (light) und .dark (dark)

Layer 2: --variable (public, mit VSCode-Fallback)
         → var(--vscode-*, var(--_variable))

Layer 3: Tailwind hsl(var(--color))
         → Wird in Komponenten verwendet
```

### Dateien

| Datei | Inhalt |
|-------|--------|
| `frontend/src/styles/index.css` | CSS Variables, 3-Tier System |
| `frontend/tailwind.config.js` | Tailwind Config, Colors, Fonts |
| `frontend/src/styles/diff-style-overrides.css` | Diff Viewer Styling |

---

## Layout-Architektur (aktuell)

```
App.tsx (Providers)
└── NormalLayout.tsx (flex flex-col)
    ├── DevBanner
    ├── Navbar (h-12, conditional via ?view=)
    └── Outlet (flex-1 min-h-0)
        ├── Projects
        ├── ProjectTasks → TasksLayout (react-resizable-panels)
        ├── KnowledgePage
        └── Settings → SettingsLayout (eigene Sidebar)
```

**Wichtige Patterns:**
- Flex-basiert (kein CSS Grid auf Page-Level)
- `react-resizable-panels` nur in TasksLayout
- XL-Breakpoint (1280px) für Mobile-Detection
- Panel-Größen in localStorage persistiert

---

## Architektur-Entscheidungen ✅

| Frage | Entscheidung | Implikation |
|-------|--------------|-------------|
| VSCode-Integration | ❌ Nicht gebraucht | `/vscode/` löschen, CSS vereinfachen |
| Sidebar collapsible | ✅ Ja | State + Toggle + LocalStorage |
| Settings-Route | ✅ In Sidebar | Route entfernen, Accordion-Pattern |

---

## Vereinfachungs-Strategie

### Phase 7: Quick Wins (CSS Basis)
1. `--radius: 0.5rem` → `--radius: 2px`
2. Font-Family wechseln (Inter + JetBrains Mono)
3. Task-Type Colors hinzufügen (research, coding, notes)

### Phase 8: Medium Effort (Layout)
4. VSCode-System entfernen (CSS + Ordner)
5. Navbar vereinfachen (nur Icons)
6. Neue Sidebar-Komponente erstellen

### Phase 9+: Breaking Changes
7. Settings-Route in Sidebar integrieren
8. TasksLayout refactoren (Sidebar statt Aux-Panel)

---

## Styleguide als Ground Truth

**URL:** http://localhost:3000/styleguide
**Datei:** `frontend/src/pages/StyleGuidePage.tsx`

**Bereits implementiert:**
- ✅ Colors (base + accent) nach STYLE-GUIDE.md
- ✅ Task Cards mit Type-Borders (Blue=Research, Orange=Dev, Yellow=Notes)
- ✅ Badges für Status und Types
- ✅ Alle shadcn/ui Komponenten (Button, Input, Card, etc.)
- ✅ Icons (lucide-react)

**Noch offen:**
- ❌ Layout-Struktur (Sidebar rechts)
- ❌ Fonts noch Chivo Mono
- ❌ Border-Radius noch 0.5rem

---

## Kritische Dateien für Migration

| Datei | Aktion |
|-------|--------|
| `frontend/src/styles/index.css` | CSS vereinfachen (VSCode entfernen) |
| `frontend/tailwind.config.js` | Font + Radius ändern |
| `frontend/src/components/layout/Navbar.tsx` | Sidebar-Toggle hinzufügen |
| `frontend/src/components/layout/NormalLayout.tsx` | Sidebar-Komponente einbinden |
| `frontend/src/vscode/` | LÖSCHEN |
| `frontend/src/pages/settings/` | Später in Sidebar integrieren |
