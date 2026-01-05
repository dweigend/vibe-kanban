# System Analysis: Vibe Kanban for Knowledge Management

> Deep dive into existing components and how they can be leveraged for Knowledge Orchestrator

---

## 1. Task System (`crates/db/src/models/`)

### Task Model

**File:** `crates/db/src/models/task.rs`

```rust
pub struct Task {
    pub id: Uuid,
    pub project_id: Uuid,
    pub title: String,
    pub description: Option<String>,  // Markdown-capable!
    pub status: TaskStatus,
    pub parent_workspace_id: Option<Uuid>,  // Parent-child hierarchy
    pub shared_task_id: Option<Uuid>,       // Remote sync
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

pub enum TaskStatus {
    Todo,
    InProgress,
    InReview,
    Done,
    Cancelled,
}
```

**Key Insight:** No explicit task types - categorization via Tags!

### Tag System

**File:** `crates/db/src/models/tag.rs`

```rust
pub struct Tag {
    pub id: Uuid,
    pub tag_name: String,   // Category name (snake_case)
    pub content: String,    // Template content/prompt
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
```

**For Knowledge Management:**
- Tags = Categories (research, deep-research, idea, etc.)
- Content = Default template for that category

### Parent-Child Tasks

Via `parent_workspace_id` field:
- Task A creates Workspace A
- Workspace A spawns Sub-Task B
- Sub-Task B has `parent_workspace_id = Workspace A.id`

**For Knowledge Management:** Perfect for research hierarchies!

---

## 2. Executor System (`crates/executors/`)

### Architecture

```
StandardCodingAgentExecutor (trait)
    ├── ClaudeCode
    ├── Amp
    ├── Codex
    ├── Cursor
    ├── Gemini
    ├── QwenCode
    ├── Copilot
    ├── Opencode
    └── Droid
```

### Key Trait

**File:** `crates/executors/src/executors/mod.rs`

```rust
#[async_trait]
pub trait StandardCodingAgentExecutor {
    async fn spawn(
        &self,
        current_dir: &Path,
        prompt: &str,
        env: &ExecutionEnv,
    ) -> Result<SpawnedChild, ExecutorError>;

    async fn spawn_follow_up(
        &self,
        current_dir: &Path,
        prompt: &str,
        session_id: &str,
        env: &ExecutionEnv,
    ) -> Result<SpawnedChild, ExecutorError>;

    fn normalize_logs(&self, msg_store: Arc<MsgStore>, worktree_path: &Path);
    fn default_mcp_config_path(&self) -> Option<PathBuf>;
}
```

### MCP Configuration

**File:** `crates/executors/src/mcp_config.rs`

All executors support MCP servers with format adapters:
- `adapt_passthrough()` - Claude, Amp, Droid
- `adapt_gemini()` - Gemini format
- `adapt_cursor()` - Cursor format
- `adapt_codex()` - TOML-based

**For Knowledge Management:** Add custom MCP servers for research tools!

---

## 3. Frontend (`frontend/src/`)

### State Management

**Zustand Stores:**
- `useDiffViewStore.ts` - Diff viewing state
- `useTaskDetailsUiStore.ts` - Task UI state

**React Contexts:**
- `ProjectContext.tsx` - Current project
- `EntriesContext.tsx` - Log entries

### Data Fetching

**Hooks:**
- `useTask.ts` - Single task data
- `useAttempt.ts` - Workspace/attempt data
- `useProjectTasks.ts` - Task list
- `useJsonPatchWsStream.ts` - WebSocket streaming

### API Client

**File:** `frontend/src/lib/api.ts`

REST API wrapper with typed endpoints for:
- Projects CRUD
- Tasks CRUD
- Workspaces/Attempts
- Execution processes
- Tags

---

## 4. Extension Points Summary

| Layer | Extension Point | Effort |
|-------|-----------------|--------|
| **Database** | Tags for categories | None (exists) |
| **Database** | Parent-child tasks | None (exists) |
| **Executor** | New executor type | Medium |
| **Executor** | MCP servers | Low |
| **Frontend** | New views | Medium |
| **Frontend** | Custom stores | Low |

---

## 5. Recommended Integration Path

### Tier 1: Zero Code (Immediate)

1. **Use Tags as Categories**
   - Create tags: `research`, `deep-research`, `idea`, `request`, `debug`
   - Templates define default prompts

2. **Use Parent-Child for Hierarchies**
   - Main research task → sub-tasks for each step
   - Already supported!

### Tier 2: MCP Extensions (Low Effort)

1. **Create MCP Servers**
   - `openalex-mcp` for academic search
   - `arxiv-mcp` for preprints
   - `memory-mcp` for persistent knowledge

2. **Add to Agent Config**
   - Existing agents can use new tools
   - No executor changes needed

### Tier 3: Custom Service (Medium Effort)

1. **New Rust Service**
   - `crates/services/src/services/knowledge.rs`
   - Handles knowledge-specific logic

2. **New API Routes**
   - `crates/server/src/routes/knowledge.rs`
   - Exposes knowledge operations

3. **Frontend Views**
   - `frontend/src/pages/KnowledgeBase.tsx`
   - Knowledge-specific UI

---

## 6. Key Files for Extension

| Purpose | File |
|---------|------|
| Task model | `crates/db/src/models/task.rs` |
| Tag model | `crates/db/src/models/tag.rs` |
| Executor trait | `crates/executors/src/executors/mod.rs` |
| MCP config | `crates/executors/src/mcp_config.rs` |
| API routes | `crates/server/src/routes/` |
| Frontend API | `frontend/src/lib/api.ts` |
| Task hooks | `frontend/src/hooks/useTask.ts` |
