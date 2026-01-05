# 🧠 Context-Engineering Strategie

> Wie strukturiert man Dokumentation für effiziente AI-Nutzung?

---

## 🎯 Problem

1. **Context-Überladung**: Zu viele Dateien → Agent liest alles → ineffizient
2. **Anti-Pattern "Neu statt Wiederverwenden"**: Claude Code neigt dazu, Dinge neu zu entwickeln
3. **Dev-Ordner überladen**: Unklar welche Datei wann relevant ist

---

## 📐 Lösung: Layered Context Architecture

### Layer 1: IMMER lesen (Minimal)
```
CLAUDE.md          # Repository Guidelines (existiert)
dev/CONTEXT.md     # Was Agent wissen MUSS (NEU)
```

### Layer 2: Session-spezifisch
```
dev/UEBERGABE.md   # Aktuelle Session-Infos
dev/PLAN.md        # Projektplan
```

### Layer 3: Bei Bedarf (Reference)
```
dev/research/      # Detaillierte Analysen
dev/phases/        # Phasen-spezifische Docs
```

---

## 📄 CONTEXT.md Template

```markdown
# 🔑 Knowledge Orchestrator - Context

## MUST USE (Existing Components)

### Tags (für Kategorien)
- Pfad: `crates/db/src/models/tag.rs`
- Nutzung: Tags anlegen via SQL, nicht neue TaskTypes

### Parent-Child Tasks (für Hierarchien)
- Pfad: `crates/db/src/models/task.rs`
- Feld: `parent_workspace_id`
- Nutzung: Research-Strukturen, keine neue Hierarchie-Logik

### MCP System (für Tools)
- Pfad: `crates/executors/src/mcp_config.rs`
- Nutzung: Existierende MCP Server einbinden, KEINE neuen bauen

## DO NOT CREATE

❌ Keine neuen Task-Typen (Tags nutzen!)
❌ Keine neuen DB-Tabellen ohne Diskussion
❌ Keine eigenen MCP Server (existieren bereits!)
❌ Keine Executor-Änderungen ohne Diskussion
❌ Keine neuen Frontend-Stores ohne Diskussion

## EXISTING MCP SERVERS (USE THESE!)

| Bedarf | Server | Installation |
|--------|--------|--------------|
| Academic Papers | Scientific-Papers-MCP | `npx -y @futurelab-studio/latest-science-mcp@latest` |
| Memory | mcp-memory-service | `npx -y @doobidoo/mcp-memory-service` |
| ArXiv | arxiv-mcp-server | `uv tool install arxiv-mcp-server` |

## Current Phase

Siehe `dev/PLAN.md` → Phase 2: Foundation
```

---

## 🛡️ Anti-Pattern Verhinderung

### Problem: Claude baut neu statt wiederzuverwenden

### Lösung: Explizite Constraints in CLAUDE.md

```markdown
## 🚫 Anti-Patterns zu vermeiden

1. **KEINE eigenen MCP Server entwickeln**
   - ArXiv → `arxiv-mcp-server` existiert
   - OpenALEX → `Scientific-Papers-MCP` existiert
   - Memory → `mcp-memory-service` existiert

2. **KEINE neuen Task-Typen**
   - Tags nutzen für Kategorisierung
   - Parent-Child für Hierarchien

3. **VOR jeder Implementierung**
   - `dev/CONTEXT.md` lesen
   - Prüfen ob Feature existiert
   - Bei Zweifel: Fragen!
```

---

## 📁 Dev-Ordner Struktur (Vorschlag)

### Aktuell (überladen)
```
dev/
├── answers.md           # Q&A
├── architecture.md      # Architektur
├── extension-points.md  # Erweiterungen
├── git-workflow.md      # Git
├── PLAN.md              # Plan
├── questions.md         # Fragen
├── README-WORKFLOW.md   # Workflow Doku
├── research/            # Research
├── UEBERGABE.md         # Handover
└── WORKFLOW.md          # Workflow
```

### Vorschlag (konsolidiert)
```
dev/
├── CONTEXT.md           # NEU: Was Agent IMMER lesen soll
├── UEBERGABE.md         # Session-Übergabe (bleibt)
├── PLAN.md              # Projektplan (bleibt)
├── WORKFLOW.md          # Workflow (bleibt)
├── research/            # Detaillierte Analysen (bleibt)
│   ├── system-analysis.md
│   ├── existing-mcp-servers.md
│   ├── testing-deployment.md
│   └── context-engineering.md
└── archive/             # NEU: Alte Dateien
    ├── answers.md
    ├── questions.md
    ├── architecture.md
    ├── extension-points.md
    └── git-workflow.md
```

---

## 🔄 Workflow für Context-Loading

### Session Start (`/start`)
1. Lese `CLAUDE.md` (automatisch)
2. Lese `dev/CONTEXT.md` (essentiell)
3. Lese `dev/UEBERGABE.md` (Session-spezifisch)
4. Lese `dev/PLAN.md` (aktueller Stand)

### Bei Implementation
1. Prüfe `MUST USE` Section in CONTEXT.md
2. Prüfe `DO NOT CREATE` Section
3. Suche existierende Patterns im Code
4. Bei Zweifel: Research-Docs lesen

### Session Ende
1. Update `dev/UEBERGABE.md`
2. Update `dev/PLAN.md` falls nötig

---

## 📊 Context-Größen

| Datei | Zeilen | Priorität |
|-------|--------|-----------|
| CLAUDE.md | ~100 | Immer |
| CONTEXT.md | ~80 | Immer |
| UEBERGABE.md | ~60 | Session Start |
| PLAN.md | ~150 | Bei Bedarf |
| research/* | ~300+ | Nur bei Bedarf |

**Ziel:** Minimaler Context für maximale Effektivität

---

## 💡 Best Practices

### 1. Explicit über Implicit
```markdown
# Gut
MUST USE: `crates/db/src/models/tag.rs` für Kategorien

# Schlecht
"Das Tag-System kann für Kategorien genutzt werden"
```

### 2. Pfade statt Beschreibungen
```markdown
# Gut
Pfad: `crates/executors/src/mcp_config.rs`

# Schlecht
"Die MCP-Konfiguration im Executor-Modul"
```

### 3. Negative Constraints
```markdown
# Gut
DO NOT CREATE: Keine neuen MCP Server

# Schlecht
"Bevorzuge existierende Lösungen"
```

---

## 📝 Nächste Schritte

1. [ ] `dev/CONTEXT.md` erstellen
2. [ ] CLAUDE.md mit Constraints erweitern
3. [ ] Dev-Ordner konsolidieren (archive/)
4. [ ] `/start` Skill anpassen (falls nötig)
