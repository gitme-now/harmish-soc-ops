# Design Spec — Card Deck Shuffle

Overview
- Mode name: Card Deck Shuffle (aka "Card Deck").
- Goal: Let each player open the app, tap once, and receive a single random question card. Quick, social, and mobile-first.

Primary flow
- Entry: user opens app → selects "Card Deck Shuffle" from the start screen.
- Auto-draw option: when entering the mode, a card is drawn immediately (configurable). Default: draw on open.
- Interaction: tap the card (or a "Draw" button) to draw the next card. Swipe left/right can be used to discard or favourite (optional progressive enhancement).
- End condition: deck empties (show "Deck empty — reshuffle"), or user navigates back.

Screens and components
- `CardDeck.tsx` — top-level page for mode. Handles layout, keyboard focus, and accessibility landmarks.
- `Card.tsx` — visual card component showing the question text, subtle drop shadow, large readable typography, and a small metadata row (category, index).
- `DeckControls.tsx` — actions: `Draw`, `Shuffle`, `Reshuffle`, `Settings` (auto-draw toggle), `Close`.
- `ModeButton` update — add a button variant on `StartScreen` that navigates to `/card-deck`.

Interactions & microcopy
- Draw on open: when user arrives, show a microcopy toast: "Drawn for you — tap card to see next".
- Single tap: animate card flip or fade, then replace content with next random card.
- Swipe: drag left to skip, drag right to save/favorite. Also support accessible buttons for these actions.
- Empty deck: show CTA "Reshuffle deck" and an option "Shuffle & start over".

Data and integration
- Questions source: reuse `src/data/questions.ts` as the deck content.
- New hook: `useCardDeck` (in `src/hooks`) to encapsulate deck state, shuffle algorithm, persistence, and storage versioning.
  - Storage key: `card-deck-state`.
  - `STORAGE_VERSION = 1` — follow existing app invariants for stored shape and migrations.
- Shuffle algorithm: use Fisher–Yates for unbiased randomization. Keep deterministic seed option for testing.

Accessibility
- Card is a semantic `article` with `role="region"` and `aria-label` describing the prompt.
- Ensure tap/draw controls are reachable via keyboard and have visible focus states.
- Provide reduced-motion variant for transitions.

Visual / motion
- Mobile-first layout: single centered card with comfortable padding and large tap targets.
- Card shadow, subtle scale on press, and quick fade/slide when drawing next card.
- Use existing Tailwind tokens and design language; avoid heavy gradients — keep neutral palette per project guide.

Acceptance criteria
- `docs/design-spec.md` created and reviewed.
- `CardDeck` UI implemented and reachable from the `StartScreen`.
- `useCardDeck` provides `draw()`, `shuffle()`, `reset()`, `currentCard`, and `remainingCount` and persists state.
- Unit tests cover shuffle correctness and persistence migration stub.

Next tasks (implementation)
1. Implement `useCardDeck` (deck state, shuffle, persistence).
2. Create `CardDeck.tsx`, `Card.tsx`, and `DeckControls.tsx` components.
3. Wire `StartScreen` to show the new mode and route to `/card-deck`.
4. Add unit tests for deck logic in `src/utils/cardDeck.test.ts`.

Notes
- Keep the iteration minimal: implement a simple draw-on-tap experience first, then add swipes/favourites.
- Pause after the first UI is implemented for visual review.
