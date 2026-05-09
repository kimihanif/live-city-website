# Live City Website

Public website for `Live Chennai` and `Live Bengaluru` — a city's news, events, and gold/silver rates, in one quiet daily.

Reads the same Appwrite database as the [Android app](../live-city-android), via plain REST (no real-time, no SDK). One codebase deploys to two Cloudflare Pages projects, one per city.

## Stack

- **Astro 5** with React islands for the few interactive bits (chart toggle, chip filter, nav ticker).
- **Plain `fetch`** against Appwrite REST — collections have `read("any")`, no auth needed in the browser.
- **Static output**, deployed via `wrangler pages deploy` (Direct Upload), refreshed on a 30-minute editorial-window cron from GitHub Actions.

## Project layout

```
src/
├── components/      React + Astro components (1:1 port of the design)
├── layouts/         BaseLayout, ArticleLayout
├── lib/             appwrite.ts, city.ts, types.ts, format.ts, markdown.ts, tags.ts, images.ts
├── pages/           Astro routes — index, news/[id], events/[id], prices, 404
└── styles/          styles.css (verbatim port of the design)
public/              Favicons, robots.txt, OG defaults, future category fallback images
.github/workflows/   scheduled-build.yml — the cron + deploy pipeline
```

## Local dev

```bash
nvm use 20
npm install
cp .env.example .env

# Chennai (default port 4321)
npm run dev:chennai

# Bengaluru (port 4322)
npm run dev:bengaluru
```

The `.env.example` ships the production Appwrite project ID — it's public-by-design and identical in both Android APKs.

## Per-city build

```bash
PUBLIC_CITY=chennai   npm run build && mv dist dist-chennai
PUBLIC_CITY=bengaluru npm run build && mv dist dist-bengaluru
```

Each `dist/` is a static site ready for any host. The build re-fetches Appwrite at build time, so the HTML you ship reflects the database snapshot at that moment.

## Cloudflare Pages deployment

Two **Direct Upload** Pages projects (NOT "Connect to Git"):

1. `livechennai` — custom domain, e.g. `chennai.livecity.app`
2. `livebengaluru` — custom domain, e.g. `bengaluru.livecity.app`

GitHub Actions builds and uploads to both on:

- Every push to `main`
- Every 30 minutes between 08:30–18:30 IST (matches the backend's news/events/prices publish windows)
- Manual `workflow_dispatch`

### One-time setup

In the GitHub repo (Settings → Secrets and variables → Actions):

| Secret | Source |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | CF dashboard → My Profile → API Tokens → "Account → Cloudflare Pages → Edit" |
| `CLOUDFLARE_ACCOUNT_ID` | CF dashboard sidebar |

Optional repo **variables** (not secrets) for canonical URLs in OG tags + sitemap:

| Variable | Default |
| --- | --- |
| `CHENNAI_SITE_URL` | `https://chennai.livecity.app` |
| `BENGALURU_SITE_URL` | `https://bengaluru.livecity.app` |

### Cost / quota

| Resource | Used | Limit | Status |
| --- | --- | --- | --- |
| GitHub Actions minutes | ~900/month (22 ticks × 1.32 min × 30 days, measured) | 2000/month private, unlimited public | Free (~45% of cap) |
| CF Pages Direct Upload deployments | ~1320/month | Unlimited | Free |
| CF Pages Git-build minutes | 0 | 500/month | Untouched |
| CF Pages bandwidth | (depends on traffic) | Unlimited | Free |

## Adding a third city

1. Append a new entry to `CITIES` in `src/lib/city.ts` (`name`, `state`, `brandName`, `goldSource`, `venues`, `eventsBlurb`, `playStoreId`, etc. — see the `CityConfig` interface for the full list).
2. Add `'<slug>'` to the `CitySlug` union in `src/lib/types.ts`.
3. Create a new CF Pages project in Direct Upload mode.
4. Add a third `Build` + `Deploy` block to `.github/workflows/scheduled-build.yml`.

## Verification checklist

For each city, after `npm run dev:<city>`:

1. `/` leads with the top news story; Events and Prices sections render below.
2. The nav shows the live ticker (gold, silver, breaking headline, top venue) scrolling between the links and the "Get the app" button.
3. `/news` chip filter toggles row visibility instantly; featured story sits above the list.
4. `/news/<id>` renders headline, hero photo, markdown body, related grid.
5. `/events` chip filter works, featured split card renders.
6. `/events/<id>` shows hero, info rows, sticky CTA — "Book tickets" opens `events.source_url`.
7. `/prices` toggle gold ↔ silver re-draws chart and table.
8. View-source on `/news` shows actual headline text (SEO).
9. Footer brand reflects city; "Get the app" links to the city's Play Store id.
10. On a Bengaluru build, `grep -i chennai dist/index.html` returns nothing.
