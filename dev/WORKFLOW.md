# WORKFLOW

## STEPS

### STEP: checkpoint

TRIGGER: Before risky changes OR start of new feature implementation
ACTION: `git add -A && git commit -m "checkpoint: before [description]"`
EXIT: Commit created

---

### STEP: research

TRIGGER: Unclear requirements OR new technology OR unknown codebase areas
ACTIONS:
1. Tool priority: mcp__context7__ > WebSearch > mcp__perplexity__
2. Grep/Read for local codebase search
EXIT: Relevant files and patterns identified
SKIP_IF: Requirements clear AND codebase known

---

### STEP: plan

TRIGGER: Complex tasks (multiple files OR architectural decisions)
SKIP_IF: Trivial changes (typos, single-line fixes, isolated functions)

SUBAGENT_STRATEGY:
```
IF scope_unclear OR multiple_areas_affected:
  # Parallel Exploration (max 3 Agents)
  Task(subagent_type="Explore", prompt="Find files for [AREA_1]", run_in_background=true)
  Task(subagent_type="Explore", prompt="Find files for [AREA_2]", run_in_background=true)
  Task(subagent_type="Explore", prompt="Find patterns for [AREA_3]", run_in_background=true)
  # Wait for all results
  TaskOutput(task_id=..., block=true)

THEN:
  # Plan Agent with collected context
  Task(
    subagent_type="Plan",
    prompt="""
    Plan implementation for: [TASK]

    Context from exploration:
    [EXPLORE_RESULTS]

    Create:
    1. List of files to change (with paths)
    2. Order of changes
    3. Critical dependencies
    4. Potential risks
    """
  )
```

EXIT: Implementation plan with file list available

---

### STEP: implement

TRIGGER: After plan OR after research (for simple tasks)
ACTIONS:
1. Small, focused changes
2. One feature/fix per iteration
3. Follow patterns from CLAUDE.md
EXIT: Code written

---

### STEP: verify

TRIGGER: After implement

PHASE_1_AUTOMATED:
```
1. RUN: pnpm run check && pnpm run lint
2. IF errors → fix → GOTO 1
```

PHASE_2_BROWSER:
```
3. RUN: Chrome DevTools
   - mcp__chrome-devtools__navigate_page(url)
   - mcp__chrome-devtools__take_snapshot()
   - mcp__chrome-devtools__list_console_messages()
4. IF console errors → fix → GOTO PHASE_1
```

PHASE_3_REVIEW_AGENT:
```
5. IF significant_changes (new features, refactoring, API changes):

   Task(
     subagent_type="general-purpose",
     prompt="""
     Review the changed files critically.

     CHANGED FILES:
     [FILE_LIST]

     CRITERIA:
     1. Single Responsibility (max 20 lines/function)
     2. Early Returns instead of Deep Nesting
     3. Explicit TypeScript types (no any)
     4. React: Proper hooks usage, no unnecessary re-renders
     5. Zustand: Proper store patterns
     6. No XSS/Injection vulnerabilities
     7. Self-documenting names

     RESPONSE:
     - "PASS" if all criteria met
     - "REFACTOR: [file:line - concrete change]" if improvements needed
     """
   )

6. IF response contains "REFACTOR:" → apply changes → GOTO PHASE_1
7. IF response contains "PASS" → EXIT
```

MAX_ITERATIONS: 3
ON_MAX: Log warning, continue to commit
EXIT: All checks passed AND (PASS OR max_iterations)

---

### STEP: commit

TRIGGER: After verify
ACTIONS:
1. `git add -A`
2. `git commit -m "type: emoji description"`
3. Update Docs:
   - `dev/UEBERGABE.md` - Current state for next session
   - `dev/PLAN.md` - Mark progress (check off tasks)
EXIT: Commit created, all docs current

---

## SUBAGENT_RULES

WHEN_TO_USE:
- plan: Explore Agents (parallel) for scope analysis, then Plan Agent
- verify: Review Agent after significant changes

WHEN_NOT_TO_USE:
- research: Direct tool calls are faster
- implement: Main agent implements itself
- commit: No subagents needed

PARALLELIZATION:
- Explore Agents: Up to 3 parallel with run_in_background=true
- Plan/Review Agents: Sequential (need prior context)

MODEL_SELECTION:
- Explore: model="haiku" (fast, read-only)
- Plan: model="sonnet" (balanced)
- Review: model="sonnet" (needs reasoning)

---

## COMMIT_TYPES

| Type | Emoji | Description |
|------|-------|-------------|
| feat | ✨ | New feature |
| fix | 🐛 | Bugfix |
| refactor | ♻️ | Code restructure without behavior change |
| style | 🎨 | Formatting, CSS |
| docs | 📝 | Documentation |
| chore | 🔧 | Build, dependencies |

---

## CONSTRAINTS

- NEVER: Mention AI tools in commits
- NEVER: Use subagents for trivial tasks
- ALWAYS: Test before commit
- ALWAYS: Update docs at session end (UEBERGABE.md, PLAN.md)
- PREFER: Small, atomic commits
- PREFER: Parallel Explore agents when scope unclear
