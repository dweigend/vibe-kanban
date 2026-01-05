# 🔀 Git-Workflow für Vibe Kanban

## Initial Setup (einmalig)

### 1. Fork erstellen
Gehe zu https://github.com/BloopAI/vibe-kanban → "Fork" Button

### 2. Remotes konfigurieren

```bash
cd /Volumes/SSD_Data/GitBase/vibe-kanban

# Upstream (Original-Repo) hinzufügen
git remote add upstream https://github.com/BloopAI/vibe-kanban.git

# Origin auf deinen Fork ändern
git remote set-url origin https://github.com/dweigend/vibe-kanban.git

# Prüfen
git remote -v
# origin     https://github.com/dweigend/vibe-kanban.git (fetch/push)
# upstream   https://github.com/BloopAI/vibe-kanban.git (fetch)
```

## Daily Workflow

### Feature entwickeln

```bash
# 1. Sync mit upstream
git fetch upstream main
git checkout main
git rebase upstream/main

# 2. Feature-Branch erstellen
git checkout -b feature/knowledge-module

# 3. Arbeiten & committen
git add .
git commit -m "feat: ✨ add knowledge module"

# 4. Pushen
git push -u origin feature/knowledge-module
```

### Mit Upstream synchronisieren

```bash
git checkout main
git fetch upstream main
git rebase upstream/main
git push origin main
```

## Pull Request erstellen

1. GitHub → dweigend/vibe-kanban
2. "Compare & pull request"
3. Base: `BloopAI/vibe-kanban:main`
4. Compare: `dweigend/vibe-kanban:feature/...`

## Quick Reference

| Aufgabe | Command |
|---------|---------|
| Upstream holen | `git fetch upstream main && git rebase upstream/main` |
| Feature starten | `git checkout -b feature/name` |
| Branch löschen | `git branch -d feature/name` |
| Remote löschen | `git push origin --delete feature/name` |

## ⚠️ Wichtig

- Nie direkt auf `main` pushen
- Immer `rebase` statt `merge`
- Force-Push nur auf eigenen Fork
