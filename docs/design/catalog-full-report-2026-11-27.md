# Full Catalog Report — The Media Museum

**Date:** 2026-11-27 · **Pass:** full catalog (the Quinn-gate launch condition) · **Catalog file:** `catalog-full.json`
**Standard:** the Park pilot's — keys checked live, dimensions/format from actual bytes, durations from the files, no invented titles, no guessed fields, provenance never upgraded, filenames never pose as titles.

## 1. Headline numbers

| Wing | Records | Exhibits (`in`) | Held out (`out`) |
|---|---|---|---|
| The Park (pilot, carried in unchanged) | 7 | 7 | 0 |
| Dahlias | 216 | 216 | 0 |
| Art & Motifs | 48 | 48 | 0 |
| The Arcade | 20 | 19 | 1 |
| The Listening Room | 38 | 37 | 1 |
| **Total** | **329** | **327** | **2** |

Every `in` record carries every required Nadia §4.3 field (machine-checked: zero missing-field records, zero duplicate slugs). The two `out` records are fully catalogued with a `statusReason` each — they are explicit holds, not silent thinnings (§5).

## 2. Per-wing accounting against the in-scope set

### Dahlias — 216 exhibits (this corrects the gate's 218; evidence in §4)

In-scope keys: 206 game-pool originals (`hues/cultivar-photos/`) + 35 park photographs (`hues/dahlias/<variety>/…`) = 241 keys → **216 exhibits**:

- 23 varieties exist in both sets → one exhibit each, park photograph primary, pool key recorded as `poolKey` + alias.
- 181 pool-only varieties → one exhibit each.
- 12 park-only varieties → one exhibit each (Appleblossom, Gloriosa, Golden Scepter, Orange Sunrise, Penhill Autumn Shade, Pink Pearl, Platinum Blonde, Polka, Seduction, Strawberry Ice, Twiggy, White Wizard — matches the gate's park-only count exactly).
- 2 pool keys are not separate varieties (Naomi duplicate image; Pooh second photograph) → §4.
- The 206 `opt/` renditions are a rendition family, never exhibits (Elena §6 / Nadia §4.3).
- Featured band: Elena's 14, in her order, flagged `featured` + `bandOrder` 1–14, with Wren's §5.2 copy verbatim. Highlights 2, 6, 10 (Sam Hopkins, Totally Tangerine, Strawberry Ice) flagged on the same records.
- The six site close-up keys (Labyrinth, Break Out, Golden Scepter, Penhill Autumn Shade, Strawberry Ice, Thomas Edison) are recorded as aliases of their varieties' exhibits.
- `colourGroup` / `form`: **left empty on all 216**, per Nadia's rule. No variety-data source with colour/form coverage exists — the site's `dahlias.ts` carries all 111 of its `description` fields empty, and no other variety source was found. Captions instead carry colour *as photographed* under Wren's §6.1 pattern, sourced from the order-picker's chromatic photo review (223 cultivars, photo-derived families) — used for caption text only, never written into the data fields. The 12 park-only varieties have no chromatic entry; with the 9 other park-primary pieces whose photographs this pass did not view, and Pooh (§4), 22 records carry Wren's fallback line with the corrected count rendered: "One of the 216 cultivar photographs."

### Art & Motifs — 48 exhibits

- **Botanical plates: 36** (group `Botanical plates`). Canonical keys `hues/m-art/flowers/`; the 36 `hues/seasons/flowers/` mirrors are recorded as aliases. Titles and plant names from the site's own seasons data. Dinnerplate Dahlias carries Wren's authored copy + highlight 5.
- **Site paintings: 11 cards** (group `Site paintings`) — the six season/group paintings, the What's in Season panorama, the Gather and Volunteer heroes, Peak Dahlia (a color-blocked rows painting not referenced in current site source; hangs on its merits per Elena §5), and Music Over the Beds (Wren's copy, highlight 9). Six of them have `hues/seasons/cards/` mirror aliases; **seasons-hero has no mirror key in the bucket** — an alias claimed for it in drafting 404'd in validation and was removed (§3).
- **The Procession: 1 exhibit across 5 keys** — canonical `hues/m-art/painting-1080.webp`; aliases `procession-full.webp`, `procession.png`, `procession-full.png`, and `hues/home/procession.webp` (verified the same image: identical perceptual hash, 1080×720). Wren's §5.1.3 copy verbatim; `cropFocus: 50% 72%` (Elena's low anchor). Highlight 1.
- **Not exhibits:** the motif family (12 images / 17 keys) and the tab-bar family (17 keys) — chrome per Elena §5, excluded at the family level, no records written. `hues/shell/procession.webp` (403×278) is a *cropped derivative* of The Procession used as shell art — perceptual hash distance 75 from the painting, so it is **not** recorded as an alias (the pilot had it as an alias candidate; this pass corrects that on the evidence).

### The Arcade — 19 exhibits + 1 held out

- **More from the Arcade (5):** Dusty, Hue & Cocoa (the trio; featured, highlight 7, Wren §5.1.4 verbatim, `cropFocus 50% 40%`), The Penny-Arcade Flowers Stall, Hue & Cocoa on Stage, and the two host portraits — avatars at `renderWidthCap: 240` (native size, per the pilot's watch-list call).
- **This or That? (2):** the banner and the ribbon banner, both captioned from viewing; alt text transcribes the painted name tags.
- **Season Blooms (12):** group `Season Blooms` per Nadia's F22 assignment, `whereUsed: Season Sort game`. All 12 are natively 480 px wide, so Elena's 480 render cap is their native size and no `renderWidthCap` field was needed.
- **Held out (1 record):** `stage-detail` — a detail crop of the stage scene, recorded `out` per Elena §5 and the pilot watch-list, with its reason on the record.
- **Not exhibits:** Sorting Table components and game pieces — 54 keys (`sort-*` 45, `bloom-*` 6, `hop-*` 3) — chrome per Elena §5, excluded at the family level.

### The Listening Room — 23 songs, 38 recording records (37 in + 1 out)

Pairing verified pair-by-pair from the site's Music page record (`SoundOfHues.tsx`) against the 38 files in `music/tracks/` — see §5 for the full map. Records are one per recording; paired recordings cross-link with `companionSlug` (30 links, all symmetric). Captions follow Wren's §6.3 pattern verbatim, built from title + voice + duration + pairing. The wing's framing assumption of 19 pairs does **not** hold: the data decides, and it decided 15 pairs + 8 single-voice songs.

### The Park — 7 exhibits, carried in unchanged

The pilot records are byte-for-byte the pilot's, including Visitors at Dusk's `highlightOrder: 3` (the pilot already carried it). Pilot validation stands and its keys are inside this pass's 408-key live sweep as well.

## 3. Validation totals

- **Live key checks: 408 unique keys checked, 408 verified** (range GET, browser UA): 407 returned HTTP 206 in the full sweep; the 408th (`hues/cultivar-photos/pooh.jpg`, restored as Pooh's primary after the dedupe fix in §4) was checked separately and also returned 206. One failure was found and fixed during the sweep: an alias claimed for `hues/seasons/cards/seasons-hero.webp` returned **404** — that mirror key does not exist in the bucket; the alias was removed from The Hues Year record and the key set re-verified.
- **Dimensions/format: from actual bytes for 100% of image records** (local source files via PIL; the two Procession derivative keys by download). No sampling. One footnote: American Dawn's park file (`dahlia-american-dawn_2429.jpeg`) is an MPO container — a JPEG variant from the camera; the catalog records its format as `jpeg`, which is how it serves.
- **Durations: ffprobe on 100% of the 38 MP3 files.** All 38 agree with the Music page record's printed durations within 2 seconds (zero mismatches beyond rounding). `durationSec` in the catalog is the file's.
- **Bucket reconciliation: 745 keys total = 408 referenced by the catalog + 337 unreferenced**, every unreferenced key accounted for by family in §6.

## 4. Dahlia dedupe decisions (the 218 → 216 correction)

Quinn's gate arithmetic (206 pool varieties + 12 park-only = 218) assumed one pool key = one variety. Two keys break that assumption, both evidenced from the files:

1. **Karma Naomi — one image under two keys.** `karma-naomi.jpg` and `naomi.jpg` are byte-identical (same MD5, 800×800). One exhibit; canonical key `karma-naomi.jpg`, `naomi.jpg` recorded as alias. A perceptual-hash sweep of all 206 pool files (every pair) found this as the pool's only duplicate image.
2. **Pooh — one variety, two different photographs.** `pooh.jpg` (800×800) and `pooh-swan-island.jpg` (466×700) are different images (hash distance 120/256) of the one variety — the picker's chromatic review and the site's dahlia record each carry a single Pooh. One exhibit per Nadia's one-exhibit-per-variety rule; primary is `pooh.jpg` (Elena's highest-resolution rule); the second photograph is recorded as `additionalPhotoKeys`, not an alias, because it is not the same image. Pooh's caption uses the fallback line: the chromatic family (Red) was derived from one of the two photographs and the record does not say which, so no colour is claimed.

Overlap merges (23): name-level matches between the site's dahlia record and the pool, including the spelling variants **Thomas A. Edison = Thomas Edison** and **breakout = Break Out** (both merges are also stated in the chromatic review's own alias notes), plus **Karma Maarten Zwaan = Karma Maarten de Zwaan** and **Karma Serena** (pool file `serena.webp`) resolved the same way. Belle of Barmera's park file is the site's "Sport" photograph of the variety; per Elena §9c / Wren's note, nothing about the sport appears in any copy.

## 5. Listening Room pairing map (verified)

**15 pairs** (sung + instrumental): Petal Opener · Clippers in Hand · Hummin' with the Bees · Zinnia Sky · Sunflower Smile · The Creek Beside · Butterfly Waltz · Petals on the Breeze · Somewhere in the Rows · Colors I Can't Name · Slow Wanderer · The Quiet Corner · Rain-Kissed Petals · Bloom Where You're Planted · Soft Light Serenade.

**4 sung-only:** Petals Open, Pale and New · September at Hues · Imagine a Place · Pickin' Flowers, Dancin' for Hours.

**4 instrumental-only:** Rows of Color · Dancin' in the Dirt (held out — below) · Thank You Garden · A Little World Apart.

**Held out — Dancin' in the Dirt (instrumental, 1 record, `exhibitStatus: "out"`).** Dustin banned this song on 2026-11-01 ("too country — do not use it for anything") and approved its removal from the park loop on 2026-11-02; it nevertheless still sits in the site's current Music page record. The catalog does not hang a banned song on its own authority: the record is fully written (title, voice, duration, verified key) with the ban as its `statusReason`, and the shortfall is stated here for Hue/Dustin's ruling. If the ruling is to hang it, flipping `exhibitStatus` is the whole change.

**Copy conflict found — A Little World Apart.** Wren's authored `captionLong` (§5.4) says "Both recordings live on this page," written when the song was assumed paired. The verified record shows it is instrumental-only, so the claim would be false on the piece view. The record carries Wren's `captionShort` (true as written) and **omits the captionLong**; the long needs a one-line rewrite from Wren before it can be restored. Zinnia Sky's authored long was checked against the data and stands (paired ✓; its instrumental is the current ad bed ✓) — it rides on the sung record; the instrumental record carries the §6.3 pattern.

## 6. Exclusion register (everything not referenced, by family)

| Keys | Family | Reason |
|---|---|---|
| 206 | `hues/cultivar-photos/opt/` | Rendition family — never exhibits (Elena §6). |
| 54 | `hues/arcade-games/` `sort-*`/`bloom-*`/`hop-*` | Sorting Table components and game pieces — chrome (Elena §5). |
| 17 | `hues/m-art/` motifs | Spot motifs — chrome (Elena §5). |
| 17 | `hues/m-art/` tab-bar art | App chrome, not museum pieces. |
| 9 | `hues/shell/` | Shell/app art, incl. the Procession crop derivative (§2). |
| 19 | `hues/og/`, `hues/m-og/`, `hues/og-*.jpg`, `hues/music/sound-of-hues-og.jpg` | Social-share images — site furniture, not exhibits. |
| 7 | `hues/icons/`, `hues/m-icons/` | Icons — chrome. |
| 3 | `hues/email/` | Email headers — not exhibits. |
| 3 | banner / logo / dahlia mark singles | Brand furniture. |
| 1 | `hues/videos/this-or-that-poster.jpg` | Video poster frame for a chrome-family game. |
| **337** | **Total unreferenced** | 408 referenced + 337 = **745 bucket keys, fully reconciled.** |

In-catalog holds (records written, `exhibitStatus: "out"`): `stage-detail` (Arcade) and Dancin' in the Dirt (Listening Room) — §2 and §5.

## 7. Decisions taken on this pass (for the record)

- **Music record model:** one record per recording (38), not per song — the Listening Room list renders recording rows, and `companionSlug` carries the pairing. Paired instrumental slugs take an `-instrumental` suffix; unpaired songs keep the plain slug.
- **Highlights:** all 10 slots flagged on their records (`highlightOrder` 1–10, incl. the pilot's Visitors at Dusk at 3).
- **Take Off:** Wren's §6.1 worked example treats it as a pool piece, but the variety has a park photograph, which is the exhibit's primary under Elena's rules. Her caption/alt make no origin claim, so they stand verbatim; noted here so the discrepancy is visible rather than buried.
- **Park Seasons group** stays empty (pilot judgment, unchanged): season artwork hangs in Art & Motifs; no double-hanging.
- **Provenance values:** `park-camera` / `game-pool` (Dahlias), `painting` (Art/Arcade/Park paintings), `park-camera` (Park photographs), `recording` (Listening Room) — the last extends the pilot's controlled set for audio and is flagged here as new.

## 8. Unresolved — named, for Hue

1. **Dancin' in the Dirt** — ruling needed (§5). The catalog's only deliberate shortfall against the site's Music record.
2. **A Little World Apart `captionLong`** — needs Wren's one-line rewrite (§5); the record ships without it until then.
3. **`colourGroup` / `form`** — empty across the Dahlias wing for lack of a variety source (§2). If a source with real coverage surfaces, this is a fill-in pass, not a re-catalog.
4. **"19 exhibits" for the Listening Room** in the design packet's framing — superseded by the verified 23 songs / 38 recordings; the build should take its counts from this catalog.

— Catalog/data specialist, 2026-11-27
