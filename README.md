# Block & Mortar — Marketing Website

Static marketing site for [blockandmortar.ai](https://blockandmortar.ai), built with Astro + React and deployed to Vercel.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro 6](https://astro.build) — static output, React islands |
| UI components | React 18 (`client:only="react"`) |
| Content | [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (YAML + MDX) |
| CMS | [TinaCMS](https://tina.io) — git-backed, visual editing |
| Styling | Vanilla CSS (`global.css` + `legal.css`) — no Tailwind |
| Fonts | Figtree + JetBrains Mono via Google Fonts |
| Hosting | [Vercel](https://vercel.com) |
| Analytics | Vercel Web Analytics (auto-injected by adapter) |

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Local development

```bash
# Install dependencies
npm install

# Start the Astro dev server (no CMS UI)
npm run dev
# → http://localhost:4321

# Start TinaCMS + Astro together (with CMS editor)
npm run cms
# → site:  http://localhost:4321
# → admin: http://localhost:4321/admin/index.html
```

See **[CMS.md](./CMS.md)** for the full guide on editing content, setting up Tina Cloud, and managing team members and blog posts.

---

## Project structure

```
.
├── public/
│   ├── assets/          # Images, fonts, static files
│   ├── favicon.svg
│   ├── robots.txt
│   └── llms.txt         # AI engine optimisation (AEO)
│
├── src/
│   ├── components/      # React components (App, Nav, Footer, page sections…)
│   │   └── SEO.astro    # Shared SEO/OG/Twitter meta component
│   ├── content/
│   │   ├── team/        # One YAML file per team member
│   │   └── blog/        # MDX blog posts (empty at launch)
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Home + team pages
│   │   └── LegalLayout.astro  # Legal pages (cream background)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── team.astro
│   │   ├── accessibility.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   └── styles/
│       ├── global.css   # Site-wide styles
│       └── legal.css    # Legal page styles
│
├── tina/
│   └── config.ts        # TinaCMS schema (team + blog collections)
│
├── astro.config.mjs
├── content.config.ts    # Astro Content Layer schemas
├── vercel.json          # Redirects for legacy .html paths
├── .env.example         # Required environment variable keys
├── CMS.md               # CMS user guide ← start here for content editing
└── README.md
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server only |
| `npm run cms` | TinaCMS + Astro dev server (use for content editing) |
| `npm run build` | Astro-only build — fast, no credentials needed |
| `npm run build:vercel` | Full build: Tina admin UI + Astro (used by Vercel CI) |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript check without building |

---

## Deploying to Vercel

### First deploy

1. Push the `feature/astro-migration` branch to GitHub (or merge to `main`)
2. In the [Vercel dashboard](https://vercel.com/new), import the `blockandmortar-website` repo
3. Vercel auto-detects Astro — accept the defaults
4. **Override the build command** to: `npm run build:vercel`
5. Set environment variables (see below)
6. Deploy

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Where to get it | Required |
|---|---|---|
| `TINA_CLIENT_ID` | [app.tina.io](https://app.tina.io) → your project → Configuration | For CMS cloud editing |
| `TINA_TOKEN` | Same location — generate a Read/Write Token | For CMS cloud editing |

Without `TINA_CLIENT_ID` / `TINA_TOKEN`, the `/admin` UI won't connect to Tina Cloud. The public site builds and deploys fine without them.

### Subsequent deploys

Pushing to `main` triggers an automatic Vercel deployment. Pull requests get Preview URLs automatically.

### Legacy URL redirects

`vercel.json` 301-redirects old `.html` paths to clean URLs:

| Old URL | New URL |
|---|---|
| `/index.html` | `/` |
| `/team.html` | `/team` |
| `/accessibility.html` | `/accessibility` |
| `/privacy.html` | `/privacy` |
| `/terms.html` | `/terms` |

---

## Editing content

See **[CMS.md](./CMS.md)** for the full guide. Quick reference:

- **Team members** → edit `src/content/team/*.yaml` directly, or use the CMS at `/admin`
- **Legal pages** → edit `src/components/AccessibilityPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`
- **Home page copy** → edit `src/components/Sections.jsx` and `src/components/App.jsx`
- **Images** → drop files into `public/assets/`, reference as `/assets/filename.ext`

---

## SEO

Each page includes:
- `<meta name="description">` tailored per page
- `<link rel="canonical">` pointing to the production URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card (`summary_large_image`)
- JSON-LD structured data:
  - `Organization` schema on the home page
  - `ItemList` of `Person` entries on the team page
- XML sitemap at `/sitemap-index.xml` (auto-generated by `@astrojs/sitemap`)
- `robots.txt` allowing all crawlers
- `llms.txt` for AI engine context

The OG image defaults to `/assets/og-image.jpg` — replace that file with a 1200 × 630 px image before launch.

---

## Adding a blog post

1. Run `npm run cms`
2. Go to `http://localhost:4321/admin/index.html`
3. CMS → Blog Posts → Create new
4. Fill in title, date, excerpt, body → Save
5. The new `.mdx` file appears in `src/content/blog/`
6. Commit and push — Vercel deploys automatically

> The blog index page (`/blog`) is not built yet. Ask a developer to add the listing route when you're ready to launch the blog.
