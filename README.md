# Vercel Daily News

A modern news publication built on Next.js 16, demonstrating the new "cacheComponents" caching model, the React Compiler, and a fully type‑safe data layer generated from an OpenAPI spec.

The app reads from an external content API and renders breaking news, featured and trending articles, full article pages, search, and a cookie‑based newsletter subscription.

## Features

- **Breaking news banner** with short‑lived cache and click‑through to the article.
- **Featured articles** grid on the home page.
- **Trending articles** sidebar that excludes what the reader is currently viewing.
- **Article pages** with markdown content blocks and a metered paywall (non‑subscribers see the first two blocks).
- **Search** with URL‑synchronised filters via `nuqs`.
- **Newsletter subscription** managed through server actions and an `httpOnly` cookie.
- **On‑demand revalidation** webhook (`POST /api/cache/revalidate`) protected by an API key.
- **SEO** with dynamic `generateMetadata`, OpenGraph image, and remote publication config.
- **Analytics** via `@vercel/analytics` and `@vercel/speed-insights`.

## Tech stack

| Area              | Choice                                                               |
| ----------------- |----------------------------------------------------------------------|
| Framework         | Next.js 16 (App Router, `cacheComponents`, React Compiler)           |
| UI                | React 19, Tailwind CSS v4, shadcn/ui, Radix primitives, lucide-react |
| State / URL       | `nuqs` for typed search params                                       |
| Data layer        | `@hey-api/openapi-ts` generated client                               |
| Validation        | Zod                                                                  |
| Tooling           | TypeScript 5, ESLint 9, pnpm                                         |

## Getting started

### Prerequisites

- Node.js 22+
- pnpm

### Install

```bash
pnpm install
```

### Environment variables

Create a `.env.local` at the project root:

```dotenv
# Required — API key for the revalidation webhook
API_KEY=your-api-key

# Required — token used to bypass Vercel protection on the upstream API
VERCEL_PROTECTION_BYPASS_TOKEN=your-bypass-token
```

`VERCEL_URL` and `VERCEL_PROJECT_PRODUCTION_URL` are injected automatically by Vercel and only need to be set in local environments if you want to mimic production behaviour. The schema is defined in [`src/lib/env.ts`](src/lib/env.ts).

### Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                                                    |
| ------------------- |----------------------------------------------------------------|
| `pnpm dev`          | Start the Next.js dev server                                   |
| `pnpm build`        | Production build                                               |
| `pnpm start`        | Run the built app                                              |
| `pnpm lint`         | Lint with ESLint                                               |
| `pnpm typegen`      | Generate Next.js types without running the build               |
| `pnpm openapi-ts`   | Regenerate the API client from `src/lib/api/spec/openapi.json` |

## Project structure

```
src/
├── app/                       # App Router routes
│   ├── api/cache/revalidate/  # POST webhook for tag revalidation
│   ├── articles/[slug]/       # Article detail page
│   ├── search/                # Search page
│   ├── layout.tsx             # Root layout, metadata, providers
│   ├── opengraph-image.tsx    # Dynamic OG image
│   └── page.tsx               # Home page
├── components/
│   ├── article/               # Article detail UI
│   ├── home/                  # Breaking news, hero, featured
│   ├── search/                # Search UI
│   ├── shared/                # Header, footer, etc.
│   └── ui/                    # shadcn/ui primitives
└── lib/
    ├── actions/               # Server actions (e.g. subscription)
    ├── api/                   # Generated client + spec + runtime config
    ├── data-access/           # Cached server-only fetchers
    ├── search-params/         # nuqs search-param parsers
    ├── env.ts                 # Zod-validated environment
    └── utils.ts
```

## Caching

Cache profiles are declared centrally in [`next.config.ts`](next.config.ts) and applied per fetcher inside `src/lib/data-access/*` via `cacheLife()` and `cacheTag()`.
When upstream fetches fail, the data layer downgrades to a `seconds` cache life so the next request retries quickly instead of serving a stale error.

### Revalidation webhook

The upstream CMS (or any operator) can purge a tag by calling:

```bash
curl -X POST https://<website-url>/api/cache/revalidate \
  -H "x-api-key: $API_KEY" \
  -H "content-type: application/json" \
  -d '{ "tag": "featured-articles", "profile": "max" }'
```

See [`src/app/api/cache/revalidate/route.ts`](src/app/api/cache/revalidate/route.ts).

## API client generation

The typed client under `src/lib/api/client` is generated from `src/lib/api/spec/openapi.json` by [`@hey-api/openapi-ts`](https://heyapi.dev/). After updating the spec, regenerate with:

```bash
pnpm openapi-ts
```

Generated files are marked with `import 'server-only'` do prevent their import from a client component.

## Deployment

The project is designed for deployment to Vercel. Push the repository, set `API_KEY` and `VERCEL_PROTECTION_BYPASS_TOKEN` in the project's environment variables, and deploy.
