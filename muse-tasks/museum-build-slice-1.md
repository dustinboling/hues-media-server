# Slice 1 — Worker routing contract + museum shell + Entrance + Park wing

You are building the first slice of **The Media Museum** (media.hues.flowers) in
the `hues-media-server` repo. Read `AGENTS.md` first — its invariants bind this
task. The gated design packet is in `docs/design/`; the documents below are the
spec, and where this brief and a design doc disagree, the design doc wins and
you note the disagreement in your PR description.

## Read (in this order)
1. `docs/design/ux-design-2026-11-25.md` — Nadia's UX as amended: §2 routing
   contract (rules R-1…R-9), §4.3 catalog fields, the Entrance and Park wing
   specs, exhibit view, empty/error states.
2. `docs/design/ui-design-2026-11-25.md` — Mina's UI as amended: tokens
   (theme.park + the single deep-2 dark register), components, the photo stage
   (gold keyline + stage padding — build-mandatory, see below), wing nav.
3. `docs/design/copy-2026-11-26.md` — Wren's copy: entrance statement, About
   strip, Park wing and exhibit copy, all §9.3 slots for the surfaces in scope.
4. `docs/design/art-direction-2026-11-26.md` — Elena's wing entries + Park picks.
5. `docs/design/ada-rulings-2026-11-26.md` — Ada's AF-1/AF-2/AF-3 conditions.
6. `docs/design/catalog-park-pilot.json` — the Park catalog (7 exhibits).

## In scope (this slice only)
1. **Worker routing** in `src/index.ts`, extended — never regressing existing
   media behaviour: a real R2 key always wins and responds exactly as today;
   a missing media-shaped path is a true plain-text 404; the museum's
   enumerated app routes (Nadia §2, incl. R-9) serve the built SPA shell with
   status 200; museum HTML responses carry `X-Robots-Tag: noindex` (and the
   shell document a matching meta) — media responses must NOT carry it.
2. **App scaffold** under `app/`: Vite + React + TypeScript, client-side
   routing, NO PWA (no manifest, no service worker, no PWA metadata beyond
   what Mina specced). Local design tokens from Mina's doc (do not fetch
   external design packages). Build output is committed under `app/dist/` by
   the build script and served by the Worker from the repo (the Worker reads
   the shell + assets via an imported/bundled path you set up and document —
   simplest sound approach wins; state it in the PR).
3. **Shell**: header with the museum name (The Media Museum, eyebrow HUES
   FLORAL PARK), five-wing nav (full names; wraps to three rows at 320–359px
   per Mina Q1/AF-2), footer with Wren's About strip.
4. **Entrance** (`/`): Wren's entrance statement + the five wing entries with
   Elena's lead images (media URLs on media.hues.flowers itself).
5. **Park wing** (`/park` + exhibit view `/park/:slug`): fully working against
   the pilot catalog — seed the app catalog from
   `docs/design/catalog-park-pilot.json` into `app/src/data/catalog.json`.
   Groups, cards, and the exhibit view per Nadia/Mina; photographs on the
   deep-2 stage WITH the gold keyline and stage padding exactly as Mina
   specced (this is FE-1's binding condition); paintings on the paper-0 mat
   stage with `fit=pad`. Exact Back restoration (scroll + state) per Nadia.
6. **Other four wings' landings** (`/dahlias`, `/art`, `/arcade`, `/music`):
   their designed landing states only (entry image, name, Wren's landing
   copy, honest "being hung" note where the design provides one) — galleries
   arrive in later slices. Do not fake gallery content.
7. **Museum 404 view**: unknown app-shaped paths render the designed 404 view
   inside the shell (R-9).

## Out of scope
Galleries/search/player for Dahlias, Art, Arcade, Listening Room; deploy
(Hue deploys after merge); any change to how an existing media URL responds;
`.github/workflows/` (never touch — the run loses its diff if it does).

## Acceptance tests — write FIRST, watch them fail, then build
Worker (vitest, `test/`):
- existing media key (mock R2) → 200, immutable cache header, CORS `*`, byte
  range honoured, and NO `X-Robots-Tag` header;
- missing media-shaped key → 404 plain text;
- each enumerated app route shape → 200 shell + `X-Robots-Tag: noindex`;
- unknown app-shaped path → 200 shell (R-9);
- `/cdn-cgi/image/…` fallback still resolves to the original object.
App (vitest + Testing Library, `app/`):
- Entrance renders all five wing entries with Elena's lead image URLs;
- Park landing renders the pilot's 7 exhibits grouped as catalogued;
- exhibit view for a photograph renders the deep-2 stage with the keyline
  treatment; for a painting, the paper-0 mat stage;
- wing nav shows full names and `aria-current` on the active wing only.
Wire everything into the root gate: `npm run verify` must run root typecheck,
worker tests, app typecheck, app tests, and the app production build.

## Traps already paid for (do not repeat)
- Referenced-but-unwritten handlers/functions failing the gate — grep your own
  diff for every name you reference before finishing.
- Lockfile drift: if you change any package.json, regenerate its lockfile in
  the same change (`npm install`).
- Never weaken or delete an existing assertion to reach green.
- Counts: the pilot is 7 Park exhibits. Do not hardcode "412" anywhere — it
  was a file count, retired by the gate.
