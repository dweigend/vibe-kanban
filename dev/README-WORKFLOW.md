# 🔄 Development Workflow Guide

> **Note:** This file explains the workflow for humans.
> The machine-readable version for Claude Code is in `WORKFLOW.md`.

---

## 📊 Overview

```
┌─────────────┐    ┌──────────┐    ┌──────────┐    ┌─────────────┐
│ Checkpoint  │───▶│ Research │───▶│   Plan   │───▶│  Implement  │
└─────────────┘    └──────────┘    └──────────┘    └──────┬──────┘
                        │               │                  │
                   (optional)      (optional)              ▼
                                               ┌───────────────────┐
                                               │      Verify       │
                                               │  ┌─────────────┐  │
                                               │  │ Lint/Check  │  │
                                               │  └──────┬──────┘  │
                                               │         ▼         │
                                               │  ┌─────────────┐  │
                                               │  │   DevTools  │  │
                                               │  └──────┬──────┘  │
                                               │         ▼         │
                                               │  ┌─────────────┐  │
                                               │  │Review Agent │◀─┼──┐
                                               │  └──────┬──────┘  │  │
                                               │         │         │  │
                                               │    PASS │ REFACTOR│  │
                                               │         ▼         │  │
                                               └─────────┼─────────┘  │
                                                         │            │
                                               ┌─────────▼─────────┐  │
                                               │      Commit       │  │
                                               └───────────────────┘  │
                                                         │            │
                                                    (on error)────────┘
```

---

## 🚀 Steps in Detail

### 1. 📌 Checkpoint

**Why?** Safety net before risky changes. Allows easy rollback.

```bash
git add -A && git commit -m "checkpoint: before feature-xyz"
```

**Tip:** Make checkpoints generously. Better one too many than too few.

---

### 2. 🔍 Research (optional)

**When?** Unclear requirements or unknown code areas.

**What happens?** The Explore agent searches the codebase and identifies relevant files and patterns.

**Example scenarios:**
- "Where are tasks stored?"
- "How does the API authentication work?"
- "Which endpoints exist?"

**Tool priority:**
1. `mcp__context7__` → Library documentation
2. `WebSearch` → General questions
3. `mcp__perplexity__` → Code/research questions

---

### 3. 📋 Plan (optional)

**When?** Complex tasks with multiple files or architectural decisions.

**What happens?** The Plan agent creates a structured implementation plan with:
- Affected files
- Order of changes
- Dependencies and risks

**Skip for:** Typo fixes, single-line changes, isolated functions.

---

### 4. ⚙️ Implement

**What?** Write code following patterns from `CLAUDE.md`:
- Small, focused changes
- One feature/fix per commit
- Max 20 lines per function
- Early returns
- Explicit TypeScript types
- React: Proper hooks, memoization where needed
- Zustand: Proper store patterns

---

### 5. ✅ Verify (Self-Verification Loop)

**The heart of the workflow!** An iterative loop ensuring quality.

#### Phase 1: Automated Checks
```bash
pnpm run check    # TypeScript
pnpm run lint     # ESLint + Prettier
```
→ On errors: Fix and repeat

#### Phase 2: Browser Testing
Chrome DevTools MCP checks:
- Does the UI render correctly?
- Console errors?
- Network requests okay?

→ On problems: Fix and back to Phase 1

#### Phase 3: Review Agent
An independent agent reviews critically:
- Clean Code principles
- TypeScript best practices
- React patterns (hooks, re-renders)
- Security (XSS, injection)

**Possible responses:**
- `PASS` → Continue to Commit
- `REFACTOR: [list]` → Apply changes, back to Phase 1

**Safety:** Max 3 iterations, then manual review.

---

### 6. 📝 Commit

```bash
git add -A
git commit -m "feat: ✨ add task editor component"
```

**Commit types:**

| Type | Emoji | When? |
|------|-------|-------|
| `feat:` | ✨ | New feature |
| `fix:` | 🐛 | Bugfix |
| `refactor:` | ♻️ | Code restructure |
| `style:` | 🎨 | Formatting |
| `docs:` | 📝 | Documentation |
| `chore:` | 🔧 | Build, deps |

**Don't forget:** Update `dev/UEBERGABE.md`!

---

## ⚡ Quick Reference

```bash
# Start session
pnpm run dev

# Checkpoint before changes
git add -A && git commit -m "checkpoint: before xyz"

# After implementation
pnpm run check && pnpm run lint

# Commit
git add -A && git commit -m "feat: ✨ description"

# End session
# → Update UEBERGABE.md
```

---

## 🚫 Golden Rules

1. **Never mention AI tools in commits** - Never "Claude", "AI", "LLM" in commit messages
2. **Small, atomic commits** - One commit = one logical change
3. **Always test before commit** - `pnpm run check && pnpm run lint` is mandatory
4. **Keep docs current** - UEBERGABE.md at session end
5. **When unsure: Research first** - Better to check once more

---

## 💡 Tips

- **Skip verification loop?** Only for trivial changes (typos, config tweaks)
- **Agent says REFACTOR but you're unsure?** Ask for concrete justifications
- **Too many iterations?** After 3 rounds, decide manually
- **Research vs. code directly?** When in doubt: Research. 5 minutes research saves 30 minutes debugging
