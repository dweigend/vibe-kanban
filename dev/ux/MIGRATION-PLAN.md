# Migration Plan - Brutalist Design System

> Schritt-für-Schritt Anleitung für die UI-Migration von Phase 7-9.

---

## Status (2026-01-10)

| Phase | Status |
|-------|--------|
| **7** | ✅ Abgeschlossen |
| **8A-C** | ✅ Abgeschlossen |
| **8D** | 📋 Geplant (Sidebar-Konsolidierung) |
| **9** | 📋 Wartet auf 8D |

---

## Zusammenfassung

| Phase | Fokus | Risiko | Aufwand |
|-------|-------|--------|---------|
| **7** | CSS Basis (Quick Wins) | Niedrig | ~1h |
| **8** | Layout & VSCode Cleanup | Mittel | ~2-3h |
| **9** | Settings Migration | Hoch | ~3-4h |

---

## Phase 7: CSS Basis (Quick Wins)

### 7.1 Border-Radius ändern

**Datei:** `frontend/src/styles/index.css:27`

```css
/* IST */
--_radius: 0.5rem;

/* SOLL */
--_radius: 2px;
```

**Impact:** Alle Komponenten mit `rounded-*` Klassen

---

### 7.2 Font-Family wechseln

**Dateien:**
- `frontend/src/styles/index.css:1` - Google Fonts Import
- `frontend/tailwind.config.js:126-128` - Font-Family Definition

**Schritt 1: Google Fonts Import ändern**

```css
/* IST */
@import url('https://fonts.googleapis.com/css2?family=Chivo+Mono...');

/* SOLL */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

**Schritt 2: Tailwind Config ändern**

```js
// IST
fontFamily: {
  'chivo-mono': ['Chivo Mono', 'Noto Emoji', 'monospace'],
}

// SOLL
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

**Schritt 3: Body-Klasse anpassen**

```css
/* IST (index.css:210) */
body {
  @apply bg-background text-foreground font-chivo-mono;
}

/* SOLL */
body {
  @apply bg-background text-foreground font-sans;
}
```

**Impact:** Gesamte App - visueller Unterschied sofort sichtbar

---

### 7.3 Task-Type Colors hinzufügen

**Datei:** `frontend/src/styles/index.css` (in :root und .dark)

```css
/* Neue Colors (nach --_neutral in beiden :root und .dark) */
--_research: 217 91% 60%;    /* #3b82f6 - Blau */
--_coding: 25 95% 53%;       /* #f97316 - Orange */
--_notes: 45 93% 47%;        /* #eab308 - Gelb */
```

**Datei:** `frontend/tailwind.config.js` (colors erweitern)

```js
colors: {
  // ... existing colors
  research: {
    DEFAULT: 'hsl(var(--research))',
    foreground: 'hsl(var(--research-foreground, 0 0% 100%))',
  },
  coding: {
    DEFAULT: 'hsl(var(--coding))',
    foreground: 'hsl(var(--coding-foreground, 0 0% 100%))',
  },
  notes: {
    DEFAULT: 'hsl(var(--notes))',
    foreground: 'hsl(var(--notes-foreground, 0 0% 0%))',
  },
}
```

**Impact:** Neue Utility-Klassen verfügbar: `bg-research`, `border-coding`, etc.

---

### Phase 7 Checklist

- [ ] Checkpoint: `git commit -m "checkpoint: before Phase 7"`
- [ ] `--_radius: 2px` setzen
- [ ] Google Fonts Import ändern
- [ ] Tailwind fontFamily ändern
- [ ] Body-Klasse auf `font-sans` ändern
- [ ] Task-Type Colors hinzufügen (CSS + Tailwind)
- [ ] Verify: `pnpm run check && pnpm run lint`
- [ ] Verify: DevTools Screenshot
- [ ] Commit: `style: 🎨 update design tokens to brutalist style`

---

## Phase 8: Layout & VSCode Cleanup

### 8.1 VSCode-System entfernen

#### 8.1.1 CSS vereinfachen

**Datei:** `frontend/src/styles/index.css`

**Zeilen 106-194 ERSETZEN** (3-Tier → 2-Tier):

```css
/* VORHER: 3-Tier mit VSCode-Fallbacks */
--background: var(--vscode-editor-background, var(--_background));

/* NACHHER: 2-Tier direkt */
--background: var(--_background);
```

**Vollständige Ersetzung:**

```css
/* 2) PUBLIC TOKENS: Direkt von Theme-Tokens */
@layer base {
  :root {
    --background: var(--_background);
    --foreground: var(--_foreground);
    --card: var(--muted);
    --card-foreground: var(--muted-foreground);
    --popover: var(--background);
    --popover-foreground: var(--foreground);
    --primary: var(--_primary);
    --primary-foreground: var(--_primary-foreground);
    --secondary: var(--_secondary);
    --secondary-foreground: var(--_secondary-foreground);
    --muted: var(--_muted);
    --muted-foreground: var(--_muted-foreground);
    --accent: var(--_accent);
    --accent-foreground: var(--_accent-foreground);
    --destructive: var(--_destructive);
    --destructive-foreground: var(--_destructive-foreground);
    --border: var(--_border);
    --input: var(--_input);
    --ring: var(--_ring);
    --radius: var(--_radius);

    /* Status */
    --success: var(--_success);
    --success-foreground: var(--_success-foreground);
    --warning: var(--_warning);
    --warning-foreground: var(--_warning-foreground);
    --info: var(--_info);
    --info-foreground: var(--_info-foreground);
    --neutral: var(--_neutral);
    --neutral-foreground: var(--_neutral-foreground);

    /* Console/terminal */
    --console-background: var(--_console-background);
    --console-foreground: var(--_console-foreground);
    --console-success: var(--_console-success);
    --console-error: var(--_console-error);

    /* Syntax highlighting */
    --syntax-keyword: var(--_syntax-keyword);
    --syntax-function: var(--_syntax-function);
    --syntax-constant: var(--_syntax-constant);
    --syntax-string: var(--_syntax-string);
    --syntax-variable: var(--_syntax-variable);
    --syntax-comment: var(--_syntax-comment);
    --syntax-tag: var(--_syntax-tag);
    --syntax-punctuation: var(--_syntax-punctuation);
    --syntax-deleted: var(--_syntax-deleted);
  }
}
```

**Ersparnis:** ~45 Zeilen, keine VSCode-Abhängigkeiten

---

#### 8.1.2 VSCode-Ordner löschen

**Aktion:** `rm -rf frontend/src/vscode/`

**Enthält:**
- `bridge.ts` - VSCode-Kommunikation (nicht verwendet)
- `ContextMenu.tsx` - VSCode-spezifisches Kontextmenü (nicht verwendet)

**Prüfen vor Löschung:**

```bash
grep -r "vscode" frontend/src --include="*.tsx" --include="*.ts" | grep -v "vscode/"
```

Falls Referenzen gefunden werden → zuerst entfernen.

---

### 8.2 Sidebar-Komponente erstellen

**Neue Datei:** `frontend/src/components/layout/Sidebar.tsx`

```tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function Sidebar({ children, defaultCollapsed = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : defaultCollapsed;
  });

  const toggle = () => {
    const newValue = !collapsed;
    setCollapsed(newValue);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newValue));
  };

  return (
    <aside
      className={cn(
        'h-full border-l border-border bg-background transition-all duration-200',
        collapsed ? 'w-12' : 'w-80'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        )}
      </div>
    </aside>
  );
}
```

---

### 8.3 NormalLayout anpassen

**Datei:** `frontend/src/components/layout/NormalLayout.tsx`

```tsx
import { Outlet, useSearchParams } from 'react-router-dom';
import { DevBanner } from '@/components/DevBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export function NormalLayout() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const shouldHideNavbar = view === 'preview' || view === 'diffs';

  return (
    <div className="flex h-screen flex-col">
      <DevBanner />
      {!shouldHideNavbar && <Navbar />}
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <Sidebar>
          {/* Placeholder für Sidebar-Content */}
          <div className="text-sm text-muted-foreground">
            Sidebar Content
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
```

---

### Phase 8 Checklist

- [ ] Checkpoint: `git commit -m "checkpoint: before Phase 8"`
- [ ] CSS: VSCode-Fallbacks entfernen (Zeilen 106-194)
- [ ] Prüfen: Keine vscode-Referenzen in Components
- [ ] Löschen: `frontend/src/vscode/`
- [ ] Erstellen: `frontend/src/components/layout/Sidebar.tsx`
- [ ] Ändern: `NormalLayout.tsx` - Sidebar einbinden
- [ ] Verify: `pnpm run check && pnpm run lint`
- [ ] Verify: DevTools Screenshot
- [ ] Commit: `refactor: ♻️ remove VSCode system and add sidebar`

---

## Phase 9: Settings Migration (Breaking)

### 9.1 Sidebar-Context erstellen

**Neue Datei:** `frontend/src/contexts/SidebarContext.tsx`

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarMode = 'dashboard' | 'settings' | 'mcp' | 'projects';

interface SidebarContextType {
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SidebarMode>('dashboard');
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ mode, setMode, isCollapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
}
```

---

### 9.2 Settings-Sections in Sidebar integrieren

**Änderung:** Settings-Sections aus `frontend/src/pages/settings/sections/` wiederverwenden.

**Sidebar-Content für Settings-Mode:**

```tsx
// In Sidebar.tsx oder neuem SidebarSettings.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  AppearanceSection,
  DisplaySection,
  EditorSection,
  FilesSection,
  GitSection,
  PullRequestsSection,
  SystemSection,
  AboutSection,
} from '@/pages/settings/sections';

export function SidebarSettings() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="appearance">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent>
          <AppearanceSection />
        </AccordionContent>
      </AccordionItem>
      {/* ... weitere Sections */}
    </Accordion>
  );
}
```

---

### 9.3 Settings-Route entfernen

**Datei:** `frontend/src/App.tsx`

**Entfernen:**
- Import von `SettingsLayout`
- Route `/settings/*`

**Navbar anpassen:**
- Settings-Link → Sidebar-Mode Toggle

---

### Phase 9 Checklist

- [ ] Checkpoint: `git commit -m "checkpoint: before Phase 9"`
- [ ] Erstellen: `SidebarContext.tsx`
- [ ] Erstellen: `SidebarSettings.tsx`
- [ ] Ändern: `Sidebar.tsx` - Mode-basierter Content
- [ ] Ändern: `App.tsx` - Settings-Route entfernen
- [ ] Ändern: `Navbar.tsx` - Settings → Sidebar-Toggle
- [ ] Verify: `pnpm run check && pnpm run lint`
- [ ] Verify: DevTools - Settings in Sidebar testen
- [ ] Commit: `feat: ✨ integrate settings into sidebar`

---

## Breaking Changes

| Änderung | Impact | Rollback |
|----------|--------|----------|
| Font-Family | Visual (alle Texte) | CSS revert |
| Border-Radius | Visual (alle Komponenten) | CSS revert |
| VSCode-Ordner | Keine Runtime-Auswirkung | Git restore |
| Settings-Route | URL `/settings/*` nicht mehr erreichbar | Route wieder hinzufügen |

---

## Rollback-Strategie

### Quick Rollback (Visual)
```bash
# CSS-Änderungen rückgängig
git checkout HEAD~1 -- frontend/src/styles/index.css
git checkout HEAD~1 -- frontend/tailwind.config.js
```

### Full Rollback (Phase)
```bash
# Zur letzten stabilen Version
git log --oneline | grep "checkpoint:"
git reset --hard <checkpoint-hash>
```

### VSCode wiederherstellen
```bash
git checkout HEAD~1 -- frontend/src/vscode/
```

---

## Referenzen

| Dokument | Inhalt |
|----------|--------|
| `dev/ux/STYLE-GUIDE.md` | Brutalist Design Spezifikation |
| `dev/ux/SYSTEM-ANALYSIS.md` | IST vs. SOLL Analyse |
| `dev/ux/SHADCN-THEMING.md` | shadcn/ui Theming Guide |
| `dev/ux/mockups/` | Referenz-Screenshots |
