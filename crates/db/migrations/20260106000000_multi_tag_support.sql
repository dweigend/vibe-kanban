PRAGMA foreign_keys = ON;

-- Multi-tag support: Junction table for task-tag associations
-- Pattern: Same as task_images junction table

-- Create junction table for task-knowledge-tag associations
CREATE TABLE task_knowledge_tags (
    id         BLOB PRIMARY KEY,
    task_id    BLOB NOT NULL,
    tag_id     BLOB NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'subsec')),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(task_id, tag_id)  -- Prevent duplicate associations
);

-- Migrate existing single-tag data to junction table
INSERT INTO task_knowledge_tags (id, task_id, tag_id)
SELECT
    LOWER(HEX(RANDOMBLOB(16))) as id,
    id as task_id,
    knowledge_tag_id as tag_id
FROM tasks
WHERE knowledge_tag_id IS NOT NULL;

-- Create indexes for efficient querying
CREATE INDEX idx_task_knowledge_tags_task_id ON task_knowledge_tags(task_id);
CREATE INDEX idx_task_knowledge_tags_tag_id ON task_knowledge_tags(tag_id);

-- Cleanup: Remove old single-tag column and index
DROP INDEX IF EXISTS idx_tasks_knowledge_tag_id;
ALTER TABLE tasks DROP COLUMN knowledge_tag_id;
