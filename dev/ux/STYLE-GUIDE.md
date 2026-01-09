# 🎨 Brutalist Design System

> High-contrast UI framework for data-dense applications.
> Strictly angular geometry, 2px borders, and direct manipulation controls.

---

## Design-Prinzipien

### 1. High Contrast
- Dunkler Hintergrund (`#09090b`) mit hellen Akzenten
- Klare visuelle Hierarchie durch Farbkontrast
- Optimiert für Low-Light Environments

### 2. Angular Geometry
- Keine abgerundeten Ecken (oder minimal: 2-4px)
- Scharfe Kanten und klare Linien
- Grid-basiertes Layout

### 3. Data-Dense
- Kompakte Informationsdarstellung
- Terminal/IDE-inspirierte Ästhetik
- Monospace-Fonts für technische Daten

### 4. Direct Manipulation
- Sichtbare Borders und Frames
- Klare Interaktionszustände
- Sofortiges visuelles Feedback

---

## Color Palette

### Base Colors

| Token | Hex | HSL | Verwendung |
|-------|-----|-----|------------|
| `bg` | `#09090b` | 240 10% 4% | Hintergrund |
| `surface` | `#18181b` | 240 6% 10% | Cards, Container |
| `border` | `#3f3f46` | 240 4% 26% | Rahmen, Trenner |
| `foreground` | `#fafafa` | 0 0% 98% | Text |
| `muted` | `#a1a1aa` | 240 4% 65% | Sekundärer Text |

### Accent Colors

| Token | Hex | Verwendung |
|-------|-----|------------|
| `primary` | `#a78bfa` | Primäre Aktionen, Links |
| `research` | `#3b82f6` | Research Tasks, Info |
| `coding` | `#f97316` | Dev Tasks, Warnings |
| `notes` | `#eab308` | Notes, Highlights |
| `destructive` | `#ef4444` | Errors, Delete |
| `success` | `#22c55e` | Success, Active |

### Status Colors

| Status | Color | Badge |
|--------|-------|-------|
| IDLE | `#a1a1aa` | Grau |
| ACTIVE | `#22c55e` | Grün |
| BUSY | `#f97316` | Orange |
| ERROR | `#ef4444` | Rot |

---

## Typography

### Font Families

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `h1` | Inter | 32px | Bold (700) | 1.2 |
| `h2` | Inter | 24px | Semibold (600) | 1.3 |
| `h3` | Inter | 18px | Semibold (600) | 1.4 |
| `body` | Inter | 14px | Regular (400) | 1.5 |
| `small` | Inter | 12px | Regular (400) | 1.5 |
| `code` | JetBrains Mono | 14px | Regular (400) | 1.6 |
| `label` | Inter | 11px | Medium (500) | 1.4 |

### Text Transforms

- Labels: `UPPERCASE`, letter-spacing: `0.05em`
- Code: Normal case, keine Transformation
- Headings: Normal case

---

## Layout Grid

### Specifications

| Property | Value |
|----------|-------|
| Columns | 12 |
| Margin | 24px (fluid) |
| Gutter | 16px (fixed) |
| Border | 1px solid `border` |

### Breakpoints

| Name | Width | Columns |
|------|-------|---------|
| `sm` | 640px | 4 |
| `md` | 768px | 8 |
| `lg` | 1024px | 12 |
| `xl` | 1280px | 12 |

---

## Components

### Buttons

#### Variants

| Variant | Background | Border | Text |
|---------|------------|--------|------|
| `primary` | `primary` | none | white |
| `secondary` | transparent | `border` | `foreground` |
| `destructive` | `destructive` | none | white |
| `ghost` | transparent | none | `muted` |
| `icon` | `surface` | `border` | `foreground` |

#### States

```
Default  → Hover (+10% brightness)  → Active (-5% brightness)  → Disabled (50% opacity)
```

#### Sizing

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 28px | 8px 12px | 12px |
| `md` | 36px | 10px 16px | 14px |
| `lg` | 44px | 12px 20px | 16px |

### Inputs

#### States

| State | Border | Background |
|-------|--------|------------|
| Default | `border` | `surface` |
| Focus | `primary` | `surface` |
| Error | `destructive` | `surface` |
| Disabled | `border` 50% | `bg` |

#### Placeholder

```css
color: var(--muted);
font-style: italic;
```

### Cards

#### Task Card Anatomy

```
┌─────────────────────────────────────┐
│ #ID-TAG                         ... │  ← Header (ID + Menu)
├─────────────────────────────────────┤
│                                     │
│ Task Title                          │  ← Title (h3)
│                                     │
│ > Description preview...            │  ← Description (muted)
│                                     │
├─────────────────────────────────────┤
│ 🔬 RESEARCH                         │  ← Type Badge
└─────────────────────────────────────┘
```

#### Type-specific Borders

| Type | Left Border Color |
|------|-------------------|
| Research | `research` (#3b82f6) |
| Coding | `coding` (#f97316) |
| Notes | `notes` (#eab308) |
| Neutral | `border` |

### Tags / Badges

#### Status Tags

```css
background: transparent;
border: 1px solid {color};
color: {color};
padding: 2px 8px;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.05em;
```

#### Type Tags

| Type | Color | Label |
|------|-------|-------|
| Research | `research` | #RESEARCH |
| Dev-Ops | `coding` | #DEV-OPS |
| Notes | `notes` | #NOTES |
| Idle | `muted` | #IDLE |

---

## Sidebar Structure

### Layout

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Knowledge Orchestrator  │  [>|] [📁] [⚙️] [≡]  │
├─────────────────────────────────┼────────────────────────┤
│                                 │                        │
│   KANBAN BOARD                  │   SIDEBAR CONTENT      │
│                                 │                        │
│   ┌─────┐ ┌─────┐ ┌─────┐      │   ┌──────────────────┐ │
│   │ TO  │ │ IN  │ │DONE │      │   │ Search...        │ │
│   │ DO  │ │PROG │ │     │      │   ├──────────────────┤ │
│   │     │ │     │ │     │      │   │ PROJECT_INFO     │ │
│   │     │ │     │ │     │      │   │                  │ │
│   │     │ │     │ │     │      │   │ ACTIVE_AGENTS    │ │
│   │     │ │     │ │     │      │   │                  │ │
│   │     │ │     │ │     │      │   │ SYSTEM_LOG       │ │
│   └─────┘ └─────┘ └─────┘      │   └──────────────────┘ │
│                                 │                        │
└─────────────────────────────────┴────────────────────────┘
```

### Sidebar Sections

| Section | Icon | Content |
|---------|------|---------|
| Search | 🔍 | Knowledge Base Query |
| Project Info | 📁 | Title, Description, Tags |
| Active Agents | ⚙️ | Architect, Coder, Researcher |
| System Log | 📋 | Terminal-style Output |

### Sidebar Modes

| Mode | Content |
|------|---------|
| Dashboard | Project Overview + Agents + Log |
| Task Creation | Form + Classification + MCPs |
| MCP Servers | Server List + Status + Activity |
| Projects | Project List + Activity Graph |
| Settings | Appearance, Editor, Git, etc. |

---

## Frame Styles

### Container Types

| Type | Border | Background | Use Case |
|------|--------|------------|----------|
| Default | 1px `border` | `surface` | Cards, Panels |
| Interactive | 1px `border` | `surface` | Hover: border → `primary` |
| Alert | 1px dashed `border` | transparent | Status, Empty States |
| Terminal | 1px `border` | `#000000` | Logs, Console |

### Corner Treatments

```css
/* Brutalist: Sharp corners */
border-radius: 0;

/* Optional: Minimal rounding */
border-radius: 2px;
```

---

## Animations

### Principles

- **Minimal** - Keine überflüssigen Animationen
- **Functional** - Nur zur Verdeutlichung von State-Changes
- **Fast** - Max 200ms Dauer

### Transitions

```css
/* Default transition */
transition: all 150ms ease-out;

/* Color transitions */
transition: background-color 100ms, border-color 100ms;
```

### Keyframes

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `fade-in` | 150ms | Dialogs, Tooltips |
| `slide-in` | 200ms | Sidebar, Panels |
| `pulse` | 1000ms | Loading, Active States |

---

## Spacing

### Scale (4px base)

| Token | Value |
|-------|-------|
| `0` | 0 |
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `5` | 20px |
| `6` | 24px |
| `8` | 32px |
| `10` | 40px |
| `12` | 48px |

### Component Spacing

| Element | Padding |
|---------|---------|
| Card | 16px |
| Button | 10px 16px |
| Input | 8px 12px |
| Badge | 2px 8px |
| Section | 24px |

---

## Implementation Notes

### Migration Strategy

1. **Phase 1:** CSS Variables aktualisieren (Color Tokens)
2. **Phase 2:** Typography anpassen (Font Family, Sizes)
3. **Phase 3:** Component Variants erweitern (Buttons, Inputs)
4. **Phase 4:** Layout refactoren (Navbar → Sidebar)
5. **Phase 5:** Cards und Tags stylen

### shadcn/ui Mapping

| Brutalist | shadcn/ui Component |
|-----------|---------------------|
| Primary Button | `Button variant="default"` |
| Secondary Button | `Button variant="outline"` |
| Ghost Button | `Button variant="ghost"` |
| Task Card | `Card` + custom styling |
| Type Badge | `Badge` + custom variants |
| Input | `Input` + focus states |
| Sidebar | New Component (nicht vorhanden) |

### CSS Custom Properties

```css
:root {
  /* Colors */
  --bg: 240 10% 4%;
  --surface: 240 6% 10%;
  --border: 240 4% 26%;
  --foreground: 0 0% 98%;
  --muted: 240 4% 65%;
  --primary: 263 70% 76%;
  --research: 217 91% 60%;
  --coding: 25 95% 53%;
  --notes: 45 93% 47%;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --radius: 2px;
}
```

---

## Referenz-Mockups

| Datei | Inhalt |
|-------|--------|
| `design-system-brutalist.png` | Layout, Buttons, Inputs, Cards, Colors, Frames |
| `design-system-stylesheet.png` | Typography, Palette, Controls, Container |
| `dashboard-style-*.png` | Dashboard Varianten (4 Stück) |
| `task-creation.png` | Task Form mit Classification |
| `mcp-servers.png` | MCP Server Management |
| `settings.png` | Application Settings |
