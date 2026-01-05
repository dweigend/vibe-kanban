# MCP Server Concepts for Knowledge Orchestrator

> Modular extensions via Model Context Protocol

---

## Overview

Vibe Kanban already supports MCP servers for all executors. Custom MCP servers integrate seamlessly without modifying core code.

**Architecture:**
```
Agent (Claude, Gemini, etc.)
    ↓ MCP Protocol
Custom MCP Server (openalex, arxiv, memory)
    ↓ REST/SDK
External Service (API, Database)
```

---

## 1. OpenALEX MCP Server

### Purpose
Search academic papers, get metadata, citations, and open access links.

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_works` | Search papers by query | `query`, `limit`, `filter` |
| `get_work` | Get paper details | `work_id` |
| `get_citations` | Get citing papers | `work_id`, `limit` |
| `get_references` | Get referenced papers | `work_id`, `limit` |
| `search_authors` | Search for authors | `query`, `limit` |

### Implementation Sketch

```typescript
// packages/openalex-mcp/src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({
  name: "openalex",
  version: "1.0.0",
});

server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "search_works",
      description: "Search academic papers via OpenALEX API",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          limit: { type: "number", default: 10 },
          filter: { type: "string", description: "OpenALEX filter syntax" }
        },
        required: ["query"]
      }
    }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_works") {
    const url = `https://api.openalex.org/works?search=${args.query}&per-page=${args.limit}`;
    const response = await fetch(url, {
      headers: { "User-Agent": "mailto:your@email.com" }
    });
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data.results) }] };
  }
});
```

### Usage in Vibe Kanban

```json
// MCP config
{
  "openalex": {
    "command": "node",
    "args": ["packages/openalex-mcp/dist/index.js"]
  }
}
```

---

## 2. ArXiv MCP Server

### Purpose
Search preprints, get abstracts, download PDFs.

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_arxiv` | Search papers | `query`, `max_results`, `category` |
| `get_paper` | Get paper details | `arxiv_id` |
| `get_pdf_url` | Get PDF download link | `arxiv_id` |

### Implementation Sketch

```typescript
// packages/arxiv-mcp/src/index.ts
import { parseStringPromise } from "xml2js";

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_arxiv") {
    const url = `https://export.arxiv.org/api/query?search_query=${args.query}&max_results=${args.max_results || 10}`;
    const response = await fetch(url);
    const xml = await response.text();
    const parsed = await parseStringPromise(xml);

    const entries = parsed.feed.entry?.map((e: any) => ({
      id: e.id[0],
      title: e.title[0].trim(),
      summary: e.summary[0].trim(),
      authors: e.author?.map((a: any) => a.name[0]),
      published: e.published[0],
      pdf: e.link?.find((l: any) => l.$.type === "application/pdf")?.$.href
    }));

    return { content: [{ type: "text", text: JSON.stringify(entries) }] };
  }
});
```

---

## 3. Memory MCP Server

### Purpose
Persistent knowledge storage for facts, research findings, and cached searches.

### Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `remember` | Store a fact | `key`, `content`, `tags`, `source` |
| `recall` | Retrieve facts | `query`, `tags`, `limit` |
| `forget` | Delete a fact | `key` |
| `list_memories` | List all facts | `tags`, `limit` |

### Storage Options

| Option | Pros | Cons |
|--------|------|------|
| **SQLite** | Simple, no dependencies | No semantic search |
| **Chroma** | Vector search, semantic | Requires embedding API |
| **JSON files** | Simplest | No search capabilities |

### Implementation Sketch (SQLite)

```typescript
// packages/memory-mcp/src/index.ts
import Database from "better-sqlite3";

const db = new Database("memory.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS memories (
    key TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    tags TEXT,
    source TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "remember") {
    db.prepare(`
      INSERT OR REPLACE INTO memories (key, content, tags, source)
      VALUES (?, ?, ?, ?)
    `).run(args.key, args.content, JSON.stringify(args.tags), args.source);
    return { content: [{ type: "text", text: "Remembered!" }] };
  }

  if (name === "recall") {
    const results = db.prepare(`
      SELECT * FROM memories
      WHERE content LIKE ? OR key LIKE ?
      LIMIT ?
    `).all(`%${args.query}%`, `%${args.query}%`, args.limit || 10);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
});
```

### Implementation Sketch (Chroma)

```typescript
// packages/memory-mcp/src/index.ts
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const client = new ChromaClient();
const embedder = new OpenAIEmbeddingFunction({ apiKey: process.env.OPENAI_API_KEY });
const collection = await client.getOrCreateCollection({
  name: "memories",
  embeddingFunction: embedder
});

server.setRequestHandler("tools/call", async (request) => {
  if (name === "remember") {
    await collection.add({
      ids: [args.key],
      documents: [args.content],
      metadatas: [{ tags: args.tags?.join(","), source: args.source }]
    });
    return { content: [{ type: "text", text: "Remembered!" }] };
  }

  if (name === "recall") {
    const results = await collection.query({
      queryTexts: [args.query],
      nResults: args.limit || 10
    });
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
});
```

---

## 4. Integration with Vibe Kanban

### Adding MCP Servers

1. **Create package:**
   ```
   packages/
   ├── openalex-mcp/
   ├── arxiv-mcp/
   └── memory-mcp/
   ```

2. **Configure in agent settings:**
   ```json
   {
     "mcpServers": {
       "openalex": {
         "command": "node",
         "args": ["packages/openalex-mcp/dist/index.js"]
       },
       "arxiv": {
         "command": "node",
         "args": ["packages/arxiv-mcp/dist/index.js"]
       },
       "memory": {
         "command": "node",
         "args": ["packages/memory-mcp/dist/index.js"]
       }
     }
   }
   ```

3. **Use in prompts:**
   ```
   Use the openalex tool to search for papers about "retrieval augmented generation".
   Then use the memory tool to remember the key findings.
   ```

---

## 5. Development Priorities

| MCP Server | Priority | Effort | Value |
|------------|----------|--------|-------|
| **memory-mcp** | High | 1 day | Core feature |
| **openalex-mcp** | Medium | 1 day | Academic research |
| **arxiv-mcp** | Medium | 0.5 day | Preprint access |

### Recommended Order

1. **memory-mcp** (SQLite version first)
   - Enables fact storage
   - Reduces repeated searches
   - Foundation for knowledge building

2. **openalex-mcp**
   - Academic paper search
   - Citation networks
   - Metadata access

3. **arxiv-mcp**
   - Preprint access
   - Full-text PDFs
   - Complements OpenALEX

---

## 6. Package Structure

```
packages/
├── memory-mcp/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts      # MCP server
│       ├── storage.ts    # SQLite/Chroma adapter
│       └── types.ts      # TypeScript types
├── openalex-mcp/
│   ├── package.json
│   └── src/
│       ├── index.ts
│       └── api.ts        # OpenALEX API client
└── arxiv-mcp/
    ├── package.json
    └── src/
        ├── index.ts
        └── parser.ts     # Atom XML parser
```

---

## 7. Testing Strategy

```typescript
// packages/memory-mcp/test/index.test.ts
describe("memory-mcp", () => {
  it("should remember and recall facts", async () => {
    await callTool("remember", {
      key: "test-fact",
      content: "The sky is blue",
      tags: ["test", "fact"]
    });

    const result = await callTool("recall", { query: "sky" });
    expect(result).toContain("blue");
  });
});
```
