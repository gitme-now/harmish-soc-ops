# Copilot / AI Agent Instructions — soc-ops

Mandatory development checklist (run before committing):
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test`

Quick guide (essential, actionable):
- Stack & entry: React + Vite + TypeScript + Tailwind v4. Start at `src/hooks/useBingoGame.ts` and `src/utils/bingoLogic.ts`.
- Architecture: UI under `src/components/*`; `useBingoGame` is the single source of truth (actions: `startGame`, `handleSquareClick`, `resetGame`, `dismissModal`).
- Data & rules: questions in `src/data/questions.ts` (24 items), board generation/toggle/bingo in `src/utils/bingoLogic.ts` (5x5, center index `12`).
- Invariants: center is `FREE_SPACE` (pre-marked); storage key `bingo-game-state` and `STORAGE_VERSION = 1` — bump and migrate if you change serialization.
- Workflows: `npm run dev`, `npm run build` (runs `tsc -b`), `npm run test` (vitest), `npm run lint`.
- Editing rules for agents: keep game logic in `bingoLogic` and persistence in `useBingoGame`; when changing storage shape update `validateStoredData` and bump `STORAGE_VERSION`; add/update `src/utils/bingoLogic.test.ts`.
- Troubleshooting: localStorage mismatch triggers a console warning and key removal; free space cannot be toggled (`isFreeSpace`).

Want a storage migration example, further compression, or test results run? Tell me which.

