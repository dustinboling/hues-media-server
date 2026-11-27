# hues-media-server — repo guidance for the bench

- This repo is the production media server for media.hues.flowers. The existing
  media-serving behaviour in `src/index.ts` (R2 key mapping, byte ranges,
  immutable caching, CORS, the `/cdn-cgi/image/` fallback) is an INVARIANT:
  museum work must not change how any existing media URL responds.
- The museum is a React + TypeScript SPA under `app/`, built to static files the
  Worker serves on app routes only. NO PWA: no manifest, no service worker.
- `noindex` goes on museum HTML responses only — never on media responses, and
  no robots.txt may block media prefixes.
- Gate: `npm run verify` must pass. Write the acceptance tests named in the task
  brief FIRST and watch them fail before implementing.
- Never edit `.github/workflows/` — the bench token cannot push workflow files
  and the whole run's diff is lost if it tries.
- Deploy is Hue's step after merge. Do not run wrangler deploy.
