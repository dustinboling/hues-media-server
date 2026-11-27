# hues-media-server

The Cloudflare Worker behind **media.hues.flowers**. It serves the `hues-media`
R2 bucket (images under `hues/…`, audio under `music/tracks/…`) with byte-range
support, immutable caching, and CORS — and it hosts **The Media Museum**, the
team's media library SPA, on the museum's app routes.

Routing contract (binding): a real media key always wins; a missing media path
is a true 404; only the museum's enumerated app routes fall back to the SPA
shell; museum HTML responses carry `noindex`, media responses never do.

- Worker source: `src/index.ts`
- Museum app: `app/` (React + TypeScript SPA, no PWA — deliberate)
- Build/verify gate: `npm run verify`
- Deploy: `npm run deploy` (wrangler), run by Hue after a gated merge — never by CI.
