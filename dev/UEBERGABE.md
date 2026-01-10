# 🔄 ÜBERGABE - Session 2026-01-10

## 🎯 Nächste Session: Phase 9 - Task Type Backend

- [ ] DB Migration: `task_type TEXT NOT NULL DEFAULT 'code'`
- [ ] Rust Enum: `TaskType { Research, Note, Code }`
- [ ] API: CreateTask/UpdateTask erweitern
- [ ] Migration: Bestehende Tasks → type='code'

---

## ✅ Erledigt

### CLAUDE.md aktualisiert
- Git Repository Regel hinzugefügt: **Immer `origin` (dweigend/vibe-kanban) verwenden**

### GitHub Issue erstellt
- **Issue #15:** [Unified Sidebar-First Layout](https://github.com/dweigend/vibe-kanban/issues/15)
- Problem: Panel + Sidebar zeigen redundante Task-Infos
- Lösung später implementieren

---

## ⚠️ Nicht erledigt (siehe Git Issues)

### Layout-Doppelung (Issue #15)
- Karten-Klick öffnet Panel UND Sidebar mit gleichen Infos
- Gewünschtes Verhalten: Klare Trennung oder Sidebar-First
- **Versuch gemacht, aber rückgängig:** Panel-Entfernung führte zu fehlendem Execution-View

---

## 📁 Geänderte Dateien

```
CLAUDE.md  # +Git Repository Regel
```

---

## 🔧 Development

```bash
# Start
pnpm run dev

# TypeScript Check
pnpm run check

# Frontend: http://localhost:3007
```

---

## 📌 Wichtige Hinweise

1. **Git Remote:** Immer `origin` (dweigend/vibe-kanban) verwenden, nie `upstream`
2. **Panel ist wichtig:** Enthält Execution-Logs, FollowUp-Eingabe, Diffs - nicht entfernen
3. **Sidebar-First funktioniert:** Task-Create über Sidebar funktioniert bereits

---

## 🏗️ Architektur (unverändert)

```
┌─────────────────────────────────────────────────────────┐
│                       NAVBAR                            │
└─────────────────────────────────────────────────────────┘
┌───────────────────────────────┬─────────────────────────┐
│                               │                         │
│       KANBAN BOARD            │     SIDEBAR             │
│      + PANEL (Execution)      │   (Task-Overview)       │
│                               │                         │
└───────────────────────────────┴─────────────────────────┘
```
