-- Add knowledge_tag_id to tasks for categorization
ALTER TABLE tasks ADD COLUMN knowledge_tag_id BLOB
    REFERENCES tags(id) ON DELETE SET NULL;

-- Index for filtering tasks by knowledge tag
CREATE INDEX IF NOT EXISTS idx_tasks_knowledge_tag_id ON tasks(knowledge_tag_id);
