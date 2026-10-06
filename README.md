# Shankha by ISKCON — Storefront (Next.js)

Luxury storefront for sacred conch shells, cowries and collector sea shells, sold from India worldwide.
Design language follows a Maison-style luxury layout: full-screen hero with a header that blends into it
and turns solid on scroll, generous white space, geometric display type and pill buttons.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- CSS Modules + design tokens in `src/app/globals.css` (no UI framework, no runtime CSS-in-JS)
- Fonts: **Intrepid** (self-hosted, subset to 12 KB woff2) for the wordmark and display headings, **Jost** (self-hosted via `next/font`) for text

## Run

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL; API_URL optional
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Without `API_URL` the store runs on the sample catalog in `src/lib/data/catalog.ts`.
With `API_URL` set, `src/lib/catalog.ts` fetches `GET /collections` and `GET /products` from the Node/Sequelize backend (ISR, revalidated every `CATALOG_REVALIDATE` seconds). Response shapes are defined in `src/lib/types.ts`.

## Structure

```
src/app/                 routes (home, collections, products, search, info pages)
  sitemap.ts robots.ts manifest.ts llms.txt/   SEO + GEO endpoints
  api/search  api/newsletter                   route handlers (proxy to backend when API_URL is set)
src/components/layout    Header (scroll-aware), drawers (menu/search/bag), Footer
src/components/home      Hero (art-directed <picture>), editorial sections, FAQ
src/components/product   ProductCard, Price (multi-currency), AddToBag
src/lib                  catalog data access, JSON-LD builders, currency, client stores
```

## Performance

- Every catalog page is statically generated (SSG + ISR); only `/search` and APIs are dynamic.
- Hero image is the only high-priority image: eager, `fetchpriority=high`, AVIF/WebP, art-directed landscape/portrait sources.
- Menu, search and bag drawers are code-split and load on first open.
- CSS (~7 KB) is inlined (`experimental.inlineCss`) — no render-blocking requests.
- Cart/currency state uses `useSyncExternalStore` stores — no context providers, no hydration mismatch.

Lighthouse (production build, local):

| Page | Desktop perf / a11y / BP / SEO | Mobile LCP (devtools throttling) |
| --- | --- | --- |
| Home | 100 / 100 / 100 / 100 — LCP 0.8 s | 1.6 s |
| Product | 100 / 100 / 100 / 100 — LCP 0.7 s | 2.0 s |
| Collection | 100 / 100 / 100 / 100 — LCP 0.7 s | — |

## SEO · AEO · GEO

- Per-page metadata, canonical URLs, Open Graph/Twitter cards
- JSON-LD: Organization + WebSite (SearchAction), BreadcrumbList, Product with Offer/shipping/returns, ItemList, FAQPage
- Answer-first copy and Q&A blocks (home, product, `/faq`) written to be quoted by answer engines
- `/llms.txt` — plain-language catalog map for AI assistants; AI crawlers explicitly allowed in `robots.txt`
- `sitemap.xml` with image entries

## Before launch

- Replace placeholder images (see `docs/IMAGE_CREDITS.md`) with product photography
- Replace contact details in `src/lib/site.ts`, and verify every product claim, price and spec
- Wire checkout (`src/app/checkout`) and live currency rates to the backend
