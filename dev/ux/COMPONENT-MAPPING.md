# Component Mapping: Brutalist → shadcn/ui

> Mapping between Brutalist Design System requirements and existing shadcn/ui components.

---

## Component Overview

| Component | Location | Pattern | Brutalist Changes |
|-----------|----------|---------|-------------------|
| Button | `ui/button.tsx` | CVA | Add `primary` variant |
| Badge | `ui/badge.tsx` | CVA | Add type variants |
| Card | `ui/card.tsx` | Composition | Type-border via className |
| Alert | `ui/alert.tsx` | CVA | ✅ Has `success` |
| Input | `ui/input.tsx` | Standard | Focus border → primary |
| Select | `ui/select.tsx` | Radix | No changes |
| Checkbox | `ui/checkbox.tsx` | Custom | No changes |
| Dialog | `ui/dialog.tsx` | Custom | No changes |
| ToggleGroup | `ui/toggle-group.tsx` | Radix | For Classification selector |
| Tooltip | `ui/tooltip.tsx` | Radix | No changes |

---

## 1. Button

### Current Variants

```typescript
// frontend/src/components/ui/button.tsx
variants: {
  variant: {
    default: 'border border-input bg-transparent text-foreground hover:bg-accent',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    icon: 'bg-transparent hover:bg-accent',
  },
  size: {
    default: 'h-10 px-4 py-2',
    xs: 'h-8 px-2 text-xs',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  },
}
```

### Brutalist Requirements

From mockups:
- **PRIMARY**: Violet filled button (`#a78bfa`)
- **SECONDARY OUTLINE**: Border only, transparent bg
- **DESTRUCTIVE**: Red filled button
- **ICON ONLY**: Square icon buttons
- **LOCKED**: Disabled state with lock icon

### New Variant: `primary`

```typescript
primary: 'bg-primary text-white hover:bg-primary/90 border-none',
```

### Full Updated CVA

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-input bg-transparent text-foreground hover:bg-accent',
        primary: 'bg-primary text-white hover:bg-primary/90 border-none',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'bg-transparent hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-8 px-2 text-xs',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

---

## 2. Badge

### Current Variants

```typescript
// frontend/src/components/ui/badge.tsx
variants: {
  variant: {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    destructive: 'border-transparent bg-destructive text-destructive-foreground',
    outline: 'text-foreground',
  },
}
```

### Brutalist Requirements

From mockups - Status Tags:
- `#RESEARCH` - Blue border/text (`#3b82f6`)
- `#DEV-OPS` - Orange border/text (`#f97316`)
- `#NOTES` - Yellow border/text (`#eab308`)
- `#IDLE` - Gray border/text (`#a1a1aa`)

Style:
```css
background: transparent;
border: 1px solid {color};
color: {color};
padding: 2px 8px;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.05em;
```

### New Variants

```typescript
research: 'border-research bg-transparent text-research',
coding: 'border-coding bg-transparent text-coding',
notes: 'border-notes bg-transparent text-notes',
idle: 'border-muted bg-transparent text-muted',
```

### Full Updated CVA

```typescript
const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        // Task Type variants
        research: 'border-research bg-transparent text-research',
        coding: 'border-coding bg-transparent text-coding',
        notes: 'border-notes bg-transparent text-notes',
        idle: 'border-muted bg-transparent text-muted',
        // Status variants
        active: 'border-success bg-transparent text-success',
        busy: 'border-coding bg-transparent text-coding',
        error: 'border-destructive bg-transparent text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

---

## 3. Card

### Current Structure

```typescript
// frontend/src/components/ui/card.tsx
// Composition-based, no variants

Card           → bg-card text-card-foreground border rounded-lg
CardHeader     → flex flex-col p-6
CardTitle      → text-2xl font-semibold
CardDescription → text-sm text-muted-foreground
CardContent    → p-6 pt-0
CardFooter     → flex items-center p-6 pt-0
```

### Brutalist Requirements

Task Cards need **type-specific left borders**:

| Type | Left Border Color |
|------|-------------------|
| Research | `#3b82f6` (blue) |
| Coding/Dev | `#f97316` (orange) |
| Notes | `#eab308` (yellow) |
| Neutral | `#3f3f46` (border) |

### Implementation: Utility Classes

No CVA changes needed. Use className composition:

```tsx
// Usage Pattern
<Card className="border-l-4 border-l-research">
  <CardHeader>
    <Badge variant="research">#RES-04</Badge>
    <CardTitle>Task Title</CardTitle>
  </CardHeader>
</Card>

// Type-specific classes
const typeClasses = {
  research: 'border-l-4 border-l-research',
  coding: 'border-l-4 border-l-coding',
  notes: 'border-l-4 border-l-notes',
  neutral: 'border-l-4 border-l-border',
};

// Component usage
<Card className={cn(typeClasses[task.type], className)}>
```

### Card Anatomy (from mockups)

```
┌─────────────────────────────────────┐
│ #RES-04                         ... │  ← Badge + Menu
├─────────────────────────────────────┤
│                                     │
│ Marktanalyse KI-Tools 2026          │  ← CardTitle
│                                     │
│ > Analyse der Wettbewerber.         │  ← CardDescription
│ > Fokus: Preismodelle.              │
│                                     │
├─────────────────────────────────────┤
│ 🔬 RESEARCH                         │  ← Type indicator
└─────────────────────────────────────┘
```

---

## 4. Additional Components (from Mockups)

### 4.1 Classification Toggle

**Mockup:** Task creation form with RESEARCH | CODING | NOTE selector

**Base Component:** `ToggleGroup` from `ui/toggle-group.tsx`

```tsx
<ToggleGroup type="single" value={taskType} onValueChange={setTaskType}>
  <ToggleGroupItem value="research" className="data-[state=on]:border-research">
    <span className="mr-1 h-2 w-2 rounded-full bg-research" />
    RESEARCH
  </ToggleGroupItem>
  <ToggleGroupItem value="coding" className="data-[state=on]:border-coding">
    <span className="mr-1 h-2 w-2 rounded-full bg-coding" />
    CODING
  </ToggleGroupItem>
  <ToggleGroupItem value="note" className="data-[state=on]:border-notes">
    <span className="mr-1 h-2 w-2 rounded-full bg-notes" />
    NOTE
  </ToggleGroupItem>
</ToggleGroup>
```

### 4.2 Task Type Badge

**Format:** `#PREFIX-NUMBER` (e.g., `#RES-04`, `#DEV-22`, `#NOTE`)

```tsx
interface TaskBadgeProps {
  type: 'research' | 'coding' | 'notes';
  id: string;
}

function TaskBadge({ type, id }: TaskBadgeProps) {
  const prefix = {
    research: 'RES',
    coding: 'DEV',
    notes: 'NOTE',
  };

  return (
    <Badge variant={type}>
      #{prefix[type]}-{id}
    </Badge>
  );
}
```

### 4.3 Agent Status Card

**Mockup:** Sidebar with Architect, Coder, Researcher agents

```tsx
interface AgentCardProps {
  icon: React.ReactNode;
  name: string;
  status: 'idle' | 'busy' | 'active' | 'error';
  subtitle?: string;
}

function AgentCard({ icon, name, status, subtitle }: AgentCardProps) {
  const statusColors = {
    idle: 'text-muted',
    busy: 'text-coding bg-coding/10',
    active: 'text-success',
    error: 'text-destructive',
  };

  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-sm border', statusColors[status])}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{name}</div>
        {subtitle && <div className="text-xs text-muted truncate">{subtitle}</div>}
      </div>
      <Badge variant={status}>{status.toUpperCase()}</Badge>
    </div>
  );
}
```

### 4.4 System Log

**Mockup:** Terminal-style log with colored levels

```tsx
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

function SystemLog({ entries }: { entries: LogEntry[] }) {
  const levelColors = {
    info: 'text-success',
    warn: 'text-coding',
    error: 'text-destructive',
  };

  return (
    <div className="font-mono text-xs bg-black/50 p-4 rounded-sm border">
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-muted">{entry.timestamp}</span>
          <span className={levelColors[entry.level]}>
            {entry.level.toUpperCase()}
          </span>
          <span className="text-foreground">{entry.message}</span>
        </div>
      ))}
    </div>
  );
}
```

### 4.5 MCP Server Card

**Mockup:** MCP Servers page with status indicators

```tsx
interface MCPServerCardProps {
  icon: React.ReactNode;
  name: string;
  status: 'active' | 'idle' | 'error';
  version?: string;
  description?: string;
}

function MCPServerCard({ icon, name, status, version, description }: MCPServerCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-surface rounded-sm">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            <Badge variant={status}>{status.toUpperCase()}</Badge>
            {version && <span className="text-xs text-muted">{version}</span>}
          </div>
          {description && (
            <p className="text-sm text-muted mt-1">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
```

### 4.6 Thinking Budget Slider

**Mockup:** LOW - MED - HIGH slider

**Base Component:** Could use native range or custom

```tsx
function ThinkingBudgetSlider({ value, onChange }: {
  value: 'low' | 'med' | 'high';
  onChange: (v: 'low' | 'med' | 'high') => void;
}) {
  const values = ['low', 'med', 'high'] as const;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted uppercase">
        <span>LOW</span>
        <span>MED</span>
        <span>HIGH</span>
      </div>
      <input
        type="range"
        min={0}
        max={2}
        value={values.indexOf(value)}
        onChange={(e) => onChange(values[Number(e.target.value)])}
        className="w-full accent-primary"
      />
    </div>
  );
}
```

---

## 5. CSS Variables to Add

### In `frontend/src/styles/index.css`

```css
:root {
  /* Task Type Colors */
  --research: 217 91% 60%;        /* #3b82f6 */
  --research-foreground: 0 0% 100%;
  --coding: 25 95% 53%;           /* #f97316 */
  --coding-foreground: 0 0% 100%;
  --notes: 45 93% 47%;            /* #eab308 */
  --notes-foreground: 0 0% 0%;

  /* Override existing */
  --primary: 263 70% 76%;         /* #a78bfa */
  --radius: 2px;
}

.dark {
  /* Same values for dark mode (high contrast design) */
  --research: 217 91% 60%;
  --coding: 25 95% 53%;
  --notes: 45 93% 47%;
  --primary: 263 70% 76%;
}
```

### In `frontend/tailwind.config.js`

```javascript
colors: {
  // Add to existing colors object
  research: {
    DEFAULT: 'hsl(var(--research))',
    foreground: 'hsl(var(--research-foreground))',
  },
  coding: {
    DEFAULT: 'hsl(var(--coding))',
    foreground: 'hsl(var(--coding-foreground))',
  },
  notes: {
    DEFAULT: 'hsl(var(--notes))',
    foreground: 'hsl(var(--notes-foreground))',
  },
}
```

---

## 6. Typography Updates

### Current

- Font Sans: `system-ui, sans-serif`
- Font Mono: `Chivo Mono`

### Brutalist Target

- Font Sans: `Inter`
- Font Mono: `JetBrains Mono`

### Changes Required

1. **Add Google Fonts import** in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

2. **Update Tailwind config**:
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

---

## 7. Border Radius

### Current

```javascript
// tailwind.config.js
borderRadius: {
  lg: 'var(--radius)',        // 0.5rem
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
}
```

### Brutalist Target

```css
--radius: 2px;
```

**Note:** This single change will cascade to all components using `rounded-lg`, `rounded-md`, `rounded-sm`.

---

## 8. Component Inventory

All 27 components in `frontend/src/components/ui/`:

| # | Component | Type | Brutalist Status |
|---|-----------|------|------------------|
| 1 | `accordion.tsx` | Radix | ✅ No changes |
| 2 | `actions-dropdown.tsx` | Custom | ✅ No changes |
| 3 | `alert.tsx` | CVA | ✅ Has success |
| 4 | `auto-expanding-textarea.tsx` | Custom | ✅ No changes |
| 5 | `badge.tsx` | CVA | 🔄 Add type variants |
| 6 | `breadcrumb.tsx` | Custom | ✅ No changes |
| 7 | `button.tsx` | CVA | 🔄 Add primary |
| 8 | `card.tsx` | Composition | 🔄 Type borders via class |
| 9 | `carousel.tsx` | Custom | ✅ No changes |
| 10 | `checkbox.tsx` | Custom | ✅ No changes |
| 11 | `dialog.tsx` | Custom | ✅ No changes |
| 12 | `dropdown-menu.tsx` | Radix | ✅ No changes |
| 13 | `github-comment-card.tsx` | Custom | ✅ No changes |
| 14 | `input.tsx` | Standard | ✅ No changes |
| 15 | `json-editor.tsx` | Custom | ✅ No changes |
| 16 | `label.tsx` | Radix | ✅ No changes |
| 17 | `loader.tsx` | Custom | ✅ No changes |
| 18 | `multi-file-search-textarea.tsx` | Custom | ✅ No changes |
| 19 | `new-card.tsx` | Custom | ✅ No changes |
| 20 | `select.tsx` | Radix | ✅ No changes |
| 21 | `separator.tsx` | Radix | ✅ No changes |
| 22 | `switch.tsx` | Radix | ✅ No changes |
| 23 | `table/` | Composition | ✅ No changes |
| 24 | `textarea.tsx` | Standard | ✅ No changes |
| 25 | `toggle-group.tsx` | Radix | 🔄 For Classification |
| 26 | `tooltip.tsx` | Radix | ✅ No changes |
| 27 | `wysiwyg/` | Custom | ✅ No changes |

**Summary:** 4 components need modifications, 23 are ready.

---

## 9. Migration Order (Phase 7)

1. **CSS Variables** - Add colors, update radius, fonts
2. **Tailwind Config** - Extend colors, fonts
3. **Button** - Add `primary` variant
4. **Badge** - Add type/status variants
5. **Card** - Document type-border pattern
6. **Test** - Verify on `/styleguide` page

---

## References

- Mockups: `dev/ux/mockups/`
- Style Guide: `dev/ux/STYLE-GUIDE.md`
- Theming Guide: `dev/ux/SHADCN-THEMING.md`
- Styleguide Page: `http://localhost:3000/styleguide`
