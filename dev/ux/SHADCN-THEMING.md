# shadcn/ui Theming Guide

> Reference documentation for customizing shadcn/ui components in this project.

---

## 1. Architecture Overview

shadcn/ui uses a **three-layer theming system**:

```
CSS Variables (--primary) → Tailwind Config → Component Classes
```

### Layer 1: CSS Variables

Defined in `frontend/src/styles/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Dark mode overrides */
}
```

**Format:** HSL values without `hsl()` wrapper: `H S% L%`

### Layer 2: Tailwind Integration

In `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
}
```

### Layer 3: Component Usage

Components use Tailwind classes that reference CSS variables:

```tsx
<Button className="bg-primary text-primary-foreground" />
```

---

## 2. CVA Pattern (class-variance-authority)

CVA provides type-safe variant management for components.

### Basic Structure

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes (always applied)
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      // Named variant groups
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    // Default values if not specified
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    // Compound variants (combinations)
    compoundVariants: [
      {
        variant: 'icon',
        size: 'icon',
        className: 'p-0',
      },
    ],
  }
);

// Type extraction for props
type ButtonProps = VariantProps<typeof buttonVariants>;
```

### Using CVA in Components

```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

---

## 3. cn() Utility

The `cn()` function merges Tailwind classes safely, handling conflicts.

### Location

`frontend/src/lib/utils.ts`

### Implementation

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### How It Works

1. **clsx**: Handles conditional classes
2. **tailwind-merge**: Resolves Tailwind conflicts (last wins)

### Usage Examples

```tsx
// Basic
cn('px-4 py-2', 'bg-blue-500')
// → 'px-4 py-2 bg-blue-500'

// Conditional
cn('base-class', isActive && 'active-class')
// → 'base-class' or 'base-class active-class'

// Override conflicts
cn('px-4', 'px-8')
// → 'px-8' (tailwind-merge resolves conflict)

// With variants
cn(buttonVariants({ variant: 'primary' }), className)
// → merged variant classes + custom className
```

### Best Practices

```tsx
// ✅ Good: Pass className last to allow overrides
<Button className={cn(buttonVariants({ variant }), className)} />

// ❌ Bad: className before variants blocks overrides
<Button className={cn(className, buttonVariants({ variant }))} />
```

---

## 4. Adding Custom Variants

### Step 1: Add CSS Variables (if new colors needed)

In `frontend/src/styles/index.css`:

```css
:root {
  /* Existing variables... */
  --research: 217 91% 60%;
  --research-foreground: 0 0% 100%;
}

.dark {
  --research: 217 91% 60%;
  --research-foreground: 0 0% 100%;
}
```

### Step 2: Extend Tailwind Config

In `frontend/tailwind.config.js`:

```javascript
colors: {
  // Existing colors...
  research: {
    DEFAULT: 'hsl(var(--research))',
    foreground: 'hsl(var(--research-foreground))',
  },
}
```

### Step 3: Add Variant to Component

In `frontend/src/components/ui/badge.tsx`:

```typescript
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: '...',
        secondary: '...',
        destructive: '...',
        outline: '...',
        // New variant
        research: 'border-research bg-research/10 text-research',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

### Step 4: Use the New Variant

```tsx
<Badge variant="research">#RESEARCH</Badge>
```

---

## 5. CSS Variables Reference

### Current Project Variables

| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--background` | `48 33% 97%` | `48 4% 16%` | Page background |
| `--foreground` | `222.2 84% 4.9%` | `48 7% 85%` | Text color |
| `--primary` | VSCode fallback | VSCode fallback | Primary actions |
| `--muted` | `0 0% 100%` | `60 2% 18%` | Disabled/secondary |
| `--border` | `214.3 31.8% 91.4%` | `60 2% 25%` | Borders |
| `--destructive` | `0 84.2% 60.2%` | `0 45% 55%` | Error/delete |

### Brutalist Design System Variables (Target)

```css
:root {
  /* Base */
  --bg: 240 10% 4%;          /* #09090b */
  --surface: 240 6% 10%;     /* #18181b */
  --border: 240 4% 26%;      /* #3f3f46 */
  --foreground: 0 0% 98%;    /* #fafafa */
  --muted: 240 4% 65%;       /* #a1a1aa */

  /* Accent */
  --primary: 263 70% 76%;    /* #a78bfa */
  --research: 217 91% 60%;   /* #3b82f6 */
  --coding: 25 95% 53%;      /* #f97316 */
  --notes: 45 93% 47%;       /* #eab308 */
  --destructive: 0 72% 51%;  /* #ef4444 */
  --success: 142 71% 45%;    /* #22c55e */

  /* Radius */
  --radius: 2px;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 6. Dark Mode Implementation

### Current Method: Class-based

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  // ...
}
```

### Toggle Logic

```tsx
// Add/remove .dark class on document root
document.documentElement.classList.toggle('dark');
```

### CSS Variable Cascade

```css
/* Base variables for light mode */
:root {
  --background: 0 0% 100%;
}

/* Override for dark mode */
.dark {
  --background: 222.2 84% 4.9%;
}
```

All components automatically use dark mode colors when `.dark` class is present.

---

## 7. Quick Reference

### Add a New Color

1. `index.css`: Add `--color-name: H S% L%;` in `:root` and `.dark`
2. `tailwind.config.js`: Add `colorName: 'hsl(var(--color-name))'`
3. Use: `bg-colorName`, `text-colorName`, `border-colorName`

### Add a New Variant

1. Find component file in `frontend/src/components/ui/`
2. Locate `cva()` definition
3. Add new variant to `variants` object
4. Use: `<Component variant="newVariant" />`

### Override Component Styles

```tsx
// Use cn() to merge custom classes
<Button className={cn('custom-class', props.className)} />

// Or override via Tailwind
<Button className="bg-red-500 hover:bg-red-600" />
```

---

## References

- [shadcn/ui Theming Docs](https://ui.shadcn.com/docs/theming)
- [CVA Documentation](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
