# 🔍 Existierende MCP Server - Research Findings

> **KISS-Erkenntnis:** Keine eigene MCP Server Entwicklung nötig!

---

## 🎯 Zusammenfassung

| Bereich | Existierender Server | Stars | Installation |
|---------|---------------------|-------|--------------|
| **Academic Papers** | Scientific-Papers-MCP | 33⭐ | `npx -y @futurelab-studio/latest-science-mcp@latest` |
| **OpenALEX** | alex-mcp | 25⭐ | `uvx --from git+https://github.com/drAbreu/alex-mcp.git alex-mcp` |
| **ArXiv** | arxiv-mcp-server | PyPI | `uv tool install arxiv-mcp-server` |
| **Memory** | mcp-memory-service | 1062⭐ | `npx -y @doobidoo/mcp-memory-service` |
| **Knowledge Graph** | context-portal | 715⭐ | GitHub |

---

## 📚 Academic Papers: Scientific-Papers-MCP

**Repository:** [benedict2310/Scientific-Papers-MCP](https://github.com/benedict2310/Scientific-Papers-MCP)

### Features
- **6 Quellen:** arXiv, OpenAlex, PMC, Europe PMC, bioRxiv/medRxiv, CORE
- 200M+ Papers Zugriff
- Full-Text Extraction (>90% Erfolgsrate)
- Citation Analysis
- DOI Resolution Chain

### Tools
```typescript
list_categories   // Kategorien pro Quelle
fetch_latest      // Neueste Papers (nur Metadata)
fetch_top_cited   // Top zitierte Papers (OpenAlex)
search_papers     // Suche über alle Quellen
fetch_content     // Full-Text für einzelnes Paper
```

### Installation
```json
{
  "mcpServers": {
    "scientific-papers": {
      "command": "npx",
      "args": ["-y", "@futurelab-studio/latest-science-mcp@latest"]
    }
  }
}
```

---

## 🔬 OpenALEX: alex-mcp

**Repository:** [drAbreu/alex-mcp](https://github.com/drAbreu/alex-mcp)

### Features
- Author Disambiguation (Name Variations, Career Transitions)
- Institution Resolution
- Citation Analysis (H-Index, Impact Metrics)
- ORCID Integration
- AI-optimiert (Streamlined Data)

### Tools
```typescript
autocomplete_authors  // Multiple Kandidaten für Disambiguation
search_authors        // Author-Suche mit Filtering
retrieve_author_works // Publications eines Authors
```

### Installation
```json
{
  "mcpServers": {
    "alex-mcp": {
      "command": "uvx",
      "args": [
        "--from", "git+https://github.com/drAbreu/alex-mcp.git@4.1.0",
        "alex-mcp"
      ],
      "env": {
        "OPENALEX_MAILTO": "your-email@domain.com"
      }
    }
  }
}
```

---

## 📄 ArXiv: arxiv-mcp-server

**Repository:** [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server)

### Features
- Paper Search (Date, Categories)
- Paper Download & Storage
- Full-Text Access
- Research Prompts (Deep Analysis Template)

### Tools
```typescript
search_papers    // Query mit Filtern
download_paper   // Paper herunterladen
list_papers      // Alle Downloads
read_paper       // Full-Text lesen
```

### Installation
```json
{
  "mcpServers": {
    "arxiv-mcp-server": {
      "command": "uv",
      "args": ["tool", "run", "arxiv-mcp-server", "--storage-path", "/path/to/storage"]
    }
  }
}
```

---

## 🧠 Memory: mcp-memory-service

**Repository:** [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service)

### Features
- **"Stop re-explaining your project to AI"**
- Persistente Context Memory
- Multi-Tool Support (Claude, VS Code, Cursor, 13+ Tools)
- Automatic Context Management
- 1062⭐ - Sehr aktiv

### Weitere Memory-Optionen

| Server | Stars | Fokus |
|--------|-------|-------|
| **context-portal** | 715⭐ | Knowledge Graph + RAG |
| **MemoryMesh** | 325⭐ | Knowledge Graph |
| **mem0-mcp** | 86⭐ | mem0 Integration |
| **task-orchestrator** | 135⭐ | Task Tracking + Memory |

---

## 🎨 Vector DB: Chroma

**Repository:** [chroma-core/chroma](https://github.com/chroma-core/chroma)

### API (4 Funktionen)
```python
client = chromadb.Client()
collection = client.create_collection("docs")

# Add
collection.add(
    documents=["text1", "text2"],
    metadatas=[{"source": "a"}, {"source": "b"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["search term"],
    n_results=5
)
```

### MCP Integration
Chroma kann als Backend für Memory MCP Server genutzt werden.

---

## 🏗️ Integration in Vibe Kanban

### Empfohlene Konfiguration

```json
{
  "mcpServers": {
    "scientific-papers": {
      "command": "npx",
      "args": ["-y", "@futurelab-studio/latest-science-mcp@latest"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@doobidoo/mcp-memory-service"]
    }
  }
}
```

### Was das bedeutet für Knowledge Orchestrator

1. **KEINE eigenen MCP Server bauen** - Alles existiert bereits!
2. **Scientific-Papers-MCP** deckt ArXiv + OpenALEX + 4 weitere Quellen ab
3. **mcp-memory-service** liefert persistentes Memory out-of-the-box
4. **Fokus auf Integration** statt Neuentwicklung

---

## 📊 Vergleich: Build vs. Use

| Feature | Eigene Entwicklung | Existierende Server |
|---------|-------------------|---------------------|
| ArXiv Search | 1 Tag | ✅ Sofort |
| OpenALEX Search | 1 Tag | ✅ Sofort |
| Memory System | 2 Tage | ✅ Sofort |
| Full-Text Extract | 2 Tage | ✅ Enthalten |
| Citation Analysis | 1 Tag | ✅ Enthalten |
| **Gesamt** | **7 Tage** | **0 Tage** |

---

## 🔗 Weitere Nützliche MCP Server

| Server | Beschreibung |
|--------|--------------|
| `paperclip` | ArXiv + OSF + OpenAlex combined |
| `openalex-mcp` | Simple OpenAlex API |
| `agentset` | RAG Platform mit Citations |
| `MARM-Systems` | Multi-Agent Coordination |

---

## 📝 Nächste Schritte

1. **MCP Config in Vibe Kanban anpassen**
2. **Scientific-Papers-MCP testen**
3. **mcp-memory-service evaluieren**
4. **Tags für Kategorien anlegen** (einzige Code-Arbeit)
