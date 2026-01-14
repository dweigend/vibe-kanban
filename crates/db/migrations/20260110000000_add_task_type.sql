-- Add task_type column to tasks table
-- Types: code (default), research, note

ALTER TABLE tasks ADD COLUMN task_type TEXT NOT NULL DEFAULT 'code';

-- Index for filtering by type
CREATE INDEX idx_tasks_task_type ON tasks(task_type);
