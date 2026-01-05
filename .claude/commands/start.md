---
allowed-tools: Read, Glob, Grep
description: Start new session - reads Workflow, Handover, Plan
---

# Session Start

Prepare a new development session for Knowledge Orchestrator.

## Steps

1. **Understand Workflow** - Read `dev/WORKFLOW.md`
   - Understand the process (STEPS, SUBAGENT_RULES, CONSTRAINTS)
   - Remember the Verification Loop and integrate it into the plan

2. **Load Context** - Read these files:
   - `dev/UEBERGABE.md` - State from last session
   - `dev/PLAN.md` - Current phase, open tasks, priorities

3. **Create Plan**
   - Use plan mode and ULTRATHINK to create the plan for the next session
   - Focus on the next uncompleted phase/task from PLAN.md

4. **Summary** - Present to David:
   - What was done last session (from UEBERGABE.md)
   - What's next (from PLAN.md)
   - Proposed tasks for this session

### Workflow Settings
- Verification Loop: [active/inactive]
- Subagent Strategy: [Plan + Verify]

5. **Wait for Confirmation** - Do NOT start implementation without explicit OK from David.

## Notes

- If $ARGUMENTS is provided, focus on that specific task
- When priority is unclear: Ask
- First step after confirmation: Create checkpoint
- At session end: Update UEBERGABE.md
