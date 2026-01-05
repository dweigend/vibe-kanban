# 🛠️ MCP Server Template für Vibe Kanban

> Anleitung zum Erstellen eigener MCP Server für spezielle Wissensquellen

---

## 🎯 Überblick

Vibe Kanban unterstützt MCP Server für alle 9 Agents. Eigene Server können für spezielle Datenquellen erstellt werden:

- 🎮 Game Mechanics Database
- 🔬 Scientific Facts Repository
- 📚 Personal Knowledge Base
- 🎨 Design Pattern Library

---

## 📦 FastMCP Template (TypeScript)

### Installation

```bash
mkdir my-mcp-server && cd my-mcp-server
npm init -y
npm install fastmcp zod better-sqlite3
npm install -D typescript @types/better-sqlite3 tsup
```

### package.json

```json
{
  "name": "my-knowledge-mcp",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "bin": {
    "my-knowledge-mcp": "dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts",
    "dev": "tsup src/index.ts --format esm --watch",
    "start": "node dist/index.js"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src"]
}
```

---

## 🎮 Beispiel: Game Mechanics MCP Server

### src/index.ts

```typescript
#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import Database from 'better-sqlite3';

// Database Setup
const db = new Database('game-mechanics.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS mechanics (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    description TEXT,
    examples TEXT,
    tags TEXT
  )
`);

// MCP Server
const server = new FastMCP({
  name: 'game-mechanics-mcp',
  version: '1.0.0',
});

// Tool 1: Mechanik suchen
server.addTool({
  name: 'search_mechanics',
  description: 'Search game mechanics by name or category',
  parameters: z.object({
    query: z.string().describe('Search query'),
    category: z.string().optional().describe('Filter by category: core, progression, social, economy'),
    limit: z.number().default(10),
  }),
  execute: async (args) => {
    const results = db.prepare(`
      SELECT * FROM mechanics
      WHERE name LIKE ? OR description LIKE ? OR category = ?
      LIMIT ?
    `).all(`%${args.query}%`, `%${args.query}%`, args.category || '', args.limit);

    return JSON.stringify(results, null, 2);
  },
});

// Tool 2: Mechanik abrufen
server.addTool({
  name: 'get_mechanic',
  description: 'Get detailed information about a specific game mechanic',
  parameters: z.object({
    name: z.string().describe('Exact mechanic name'),
  }),
  execute: async (args) => {
    const mechanic = db.prepare('SELECT * FROM mechanics WHERE name = ?').get(args.name);
    if (!mechanic) {
      return JSON.stringify({ error: `Mechanic "${args.name}" not found` });
    }
    return JSON.stringify(mechanic, null, 2);
  },
});

// Tool 3: Mechanik speichern
server.addTool({
  name: 'save_mechanic',
  description: 'Save a new game mechanic to the database',
  parameters: z.object({
    name: z.string(),
    category: z.enum(['core', 'progression', 'social', 'economy', 'combat', 'puzzle']),
    description: z.string(),
    examples: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  execute: async (args) => {
    try {
      db.prepare(`
        INSERT OR REPLACE INTO mechanics (name, category, description, examples, tags)
        VALUES (?, ?, ?, ?, ?)
      `).run(args.name, args.category, args.description, args.examples || '', JSON.stringify(args.tags || []));

      return JSON.stringify({ success: true, message: `Saved mechanic: ${args.name}` });
    } catch (error) {
      return JSON.stringify({ error: String(error) });
    }
  },
});

// Tool 4: Kategorien auflisten
server.addTool({
  name: 'list_categories',
  description: 'List all available mechanic categories with counts',
  parameters: z.object({}),
  execute: async () => {
    const categories = db.prepare(`
      SELECT category, COUNT(*) as count
      FROM mechanics
      GROUP BY category
    `).all();

    return JSON.stringify(categories, null, 2);
  },
});

// Start Server
server.start({ transportType: 'stdio' });
```

---

## 🔬 Beispiel: Scientific Facts MCP Server

### src/index.ts

```typescript
#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import Database from 'better-sqlite3';

const db = new Database('scientific-facts.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS facts (
    id INTEGER PRIMARY KEY,
    claim TEXT NOT NULL,
    evidence TEXT,
    source TEXT,
    confidence TEXT CHECK(confidence IN ('high', 'medium', 'low', 'disputed')),
    domain TEXT,
    tags TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const server = new FastMCP({
  name: 'scientific-facts-mcp',
  version: '1.0.0',
});

// Tool 1: Fakt suchen
server.addTool({
  name: 'search_facts',
  description: 'Search scientific facts by keyword',
  parameters: z.object({
    query: z.string(),
    domain: z.string().optional().describe('Filter by domain: physics, biology, chemistry, etc.'),
    confidence: z.enum(['high', 'medium', 'low', 'disputed']).optional(),
    limit: z.number().default(10),
  }),
  execute: async (args) => {
    let sql = 'SELECT * FROM facts WHERE claim LIKE ?';
    const params: any[] = [`%${args.query}%`];

    if (args.domain) {
      sql += ' AND domain = ?';
      params.push(args.domain);
    }
    if (args.confidence) {
      sql += ' AND confidence = ?';
      params.push(args.confidence);
    }
    sql += ' LIMIT ?';
    params.push(args.limit);

    const results = db.prepare(sql).all(...params);
    return JSON.stringify(results, null, 2);
  },
});

// Tool 2: Fakt speichern
server.addTool({
  name: 'remember_fact',
  description: 'Store a scientific fact with source and confidence level',
  parameters: z.object({
    claim: z.string().describe('The scientific claim or fact'),
    evidence: z.string().describe('Supporting evidence'),
    source: z.string().describe('Citation or source URL'),
    confidence: z.enum(['high', 'medium', 'low', 'disputed']),
    domain: z.string().describe('Scientific domain'),
    tags: z.array(z.string()).optional(),
  }),
  execute: async (args) => {
    db.prepare(`
      INSERT INTO facts (claim, evidence, source, confidence, domain, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(args.claim, args.evidence, args.source, args.confidence, args.domain, JSON.stringify(args.tags || []));

    return JSON.stringify({ success: true, message: 'Fact stored successfully' });
  },
});

// Tool 3: Domains auflisten
server.addTool({
  name: 'list_domains',
  description: 'List all scientific domains with fact counts',
  parameters: z.object({}),
  execute: async () => {
    const domains = db.prepare(`
      SELECT domain, confidence, COUNT(*) as count
      FROM facts
      GROUP BY domain, confidence
      ORDER BY domain, confidence
    `).all();

    return JSON.stringify(domains, null, 2);
  },
});

server.start({ transportType: 'stdio' });
```

---

## 🔧 Integration in Vibe Kanban

### Option 1: Lokaler Server (Development)

In Agent-Einstellungen oder `default_mcp.json`:

```json
{
  "game-mechanics": {
    "command": "node",
    "args": ["/path/to/game-mechanics-mcp/dist/index.js"]
  },
  "scientific-facts": {
    "command": "node",
    "args": ["/path/to/scientific-facts-mcp/dist/index.js"]
  }
}
```

### Option 2: NPM Package (Production)

Nach `npm publish`:

```json
{
  "game-mechanics": {
    "command": "npx",
    "args": ["-y", "@your-scope/game-mechanics-mcp@latest"]
  }
}
```

### Option 3: UV/Python Server

```json
{
  "my-python-mcp": {
    "command": "uv",
    "args": ["tool", "run", "my-python-mcp"]
  }
}
```

---

## 🎯 Intelligente Tool-Auswahl (Konzept)

### Tag-basierte MCP Aktivierung

**Idee:** Task-Tags bestimmen welche MCPs aktiviert werden.

```typescript
// Konzept für tag_mcp_mapping.json
{
  "mappings": {
    "game-dev": {
      "mcps": ["game-mechanics-mcp"],
      "description": "Game development tasks"
    },
    "research": {
      "mcps": ["scientific-papers-mcp", "scientific-facts-mcp"],
      "description": "Research and academic tasks"
    },
    "code": {
      "mcps": ["context7"],
      "description": "Programming tasks"
    }
  },
  "always_active": ["memory-mcp"]
}
```

### Workflow-Integration

```
1. Task wird erstellt mit Tags [game-dev, research]
2. System liest tag_mcp_mapping
3. Aktiviert: game-mechanics-mcp + scientific-papers-mcp
4. Agent startet mit relevantem Toolset
```

**Status:** Konzept - erfordert kleine Änderung in Executor-Logik

---

## 📁 Empfohlene Projektstruktur

```
packages/
├── game-mechanics-mcp/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   └── index.ts
│   ├── data/
│   │   └── game-mechanics.db
│   └── dist/
│       └── index.js
├── scientific-facts-mcp/
│   ├── package.json
│   └── src/
│       └── index.ts
└── shared/
    └── db-utils.ts
```

---

## 🧪 Testen

### Lokaler Test

```bash
# Build
npm run build

# Test mit MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js

# Test direkt
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

### Integration Test

```bash
# In Vibe Kanban Agent-Config einfügen
# Task erstellen und Tool nutzen
```

---

## 📝 Best Practices

1. **Zod für Validierung** - Type-safe Parameter
2. **SQLite für Persistenz** - Einfach, portabel
3. **JSON Responses** - Strukturierte Ausgabe
4. **Error Handling** - Graceful degradation
5. **Modulare Tools** - Ein Tool = Eine Funktion

---

## 🔗 Referenzen

- [FastMCP Documentation](https://github.com/punkpeye/fastmcp)
- [MCP Protocol Spec](https://modelcontextprotocol.io)
- [Vibe Kanban MCP Config](../../../crates/executors/src/mcp_config.rs)
- [Default MCP Servers](../../../crates/executors/default_mcp.json)
