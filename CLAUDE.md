# Live City Website — guidance for Claude

Single Astro 5 codebase that deploys to two Cloudflare Pages projects (`livechennai`, `livebengaluru`) from one branch. Reads Appwrite REST at build time; output is static.

## Architecture

- `src/pages/` — Astro routes. `index.astro` is news-led (top story leads, then Events, then Prices). `news/`, `events/` have an index + `[id].astro` detail page. `prices.astro` is a single page with the gold/silver toggle.
- `src/components/` — React islands (`.tsx`) for interactive bits, Astro components (`.astro`) for static markup. `Nav.astro` fetches latest gold/silver + top headline at build time and passes them to the `LiveTicker` React island.
- `src/layouts/` — `BaseLayout` wraps everything in `<Nav>` + `<Footer>` and emits OG/canonical meta. `ArticleLayout` wraps the news detail.
- `src/lib/`
  - `city.ts` — `CITIES` registry + `getActiveCity()`. The active city is selected at build time via `PUBLIC_CITY` env var (default `chennai`).
  - `appwrite.ts` — plain `fetch` against the REST API. All `safeList*` helpers swallow errors and return `[]` so a build never fails when the desk hasn't published yet.
  - `types.ts` — `CitySlug` union, Appwrite document shapes.
  - `format.ts`, `tags.ts`, `images.ts`, `markdown.ts` — display helpers.
- `src/styles/styles.css` — single stylesheet (warm cream / gold accent design system). No Tailwind, no CSS modules.

## Per-city deployment

The same code deploys per city — change `PUBLIC_CITY` env var:

```bash
PUBLIC_CITY=chennai   npm run build && mv dist dist-chennai
PUBLIC_CITY=bengaluru npm run build && mv dist dist-bengaluru
```

The build re-fetches Appwrite at build time, so each `dist/` reflects the database snapshot at that moment. GitHub Actions reruns this every 30 minutes between 08:30–18:30 IST.

## When making changes

- **Editing copy**: Anything city-specific (brand name, gold source, event venues, blurb) must come from `getActiveCity()` — never hardcode "Chennai" / "T. Nagar" / "Bengaluru" in component or page code.
- **Adding a new city**: extend `CITIES` in `src/lib/city.ts` and add the slug to the `CitySlug` union in `types.ts`. Provide every field on `CityConfig` (the type will fail the build if you miss one).
- **Adding interactivity**: prefer Astro static markup; only reach for a React island (`client:visible` / `client:load`) when you need real client-side state.
- **Touching the live ticker**: `LiveTicker` is rendered exclusively inside `.nav-ticker` in `Nav.astro`. The `.nav-ticker .X` CSS provides the pill styling — there is no standalone `.ticker` style.
- **404 / fallback states**: `404.astro` still uses the legacy `h1.display` + `.eyebrow` styles for its empty-state hero. Those styles are deliberately kept for that page.

## Don't

- Don't add a marketing-style hero to any index page (`/`, `/news`, `/events`, `/prices`). The design landed on news-led — top story leads `/`, plain section headings on the rest.
- Don't add eyebrow tags ("• TODAY'S NEWS", "• LIVE RATES", etc.) above section headings. They were explicitly removed.
- Don't reintroduce the newsletter strip, weather widget, or the "All of {city}, in one read" hero block.
- Don't read Appwrite from the browser. All fetches happen at build time inside Astro frontmatter or `Nav.astro`.

## Verifying changes

```bash
npm run typecheck   # astro check
npm run build       # full static build, exercises every Astro fetch
npm run dev         # http://localhost:4321
```

A passing build confirms Appwrite is reachable, every page route renders, and TypeScript is happy. After visual changes, also smoke-test with the dev server — type checking is not visual confirmation.
