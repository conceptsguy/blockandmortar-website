# Block & Mortar — CMS Guide

The site uses **Sanity** as its CMS. All editable content (home page copy, team members, testimonials, and legal pages) lives in Sanity's database and is fetched at build time. The CEO and any designated editor can make changes through **Sanity Studio** — a browser-based editing tool that requires no coding.

---

## What you can edit

| Content type | Location in Studio | Notes |
|---|---|---|
| Home page copy | **Home Page** singleton | Hero heading/subheading, CTA, steps, verticals |
| Team members | **Team Members** | Name, role, photo, bio, display order |
| Testimonials | **Testimonials** | Quote text, person name & title, display order |
| Legal pages | **Legal Pages** | Accessibility, Privacy, Terms — full rich-text sections |

---

## Accessing the Studio

### Option A — Sanity-hosted Studio (recommended for editors)

Once the Studio is deployed, the CEO and editors visit:
```
https://blockandmortar.sanity.studio
```

Log in with your Sanity account (you must be invited — see *Inviting editors* below).

### Option B — Local Studio (for developers)

Start the Studio locally from the repo:
```bash
npm run cms          # opens the studio on http://localhost:3333
npm run dev          # run the Astro site separately on http://localhost:4321
```

The `npm run cms` command runs `cd studio && npm run dev` — it starts only the Studio, not the website. Run both in separate terminals if you want to preview the site at the same time.

---

## Editing content

### Home Page

1. Studio → **Home Page** (there is only one — it's a singleton document)
2. Edit any field: Hero Heading, Hero Subheading, CTA Heading, CTA Description, Steps, or Verticals
3. Click **Publish** — the change is saved to Sanity

> The live website will update on the next Vercel deploy (triggered automatically if the webhook is configured — see *Deploy workflow* below).

### Team Members

1. Studio → **Team Members**
2. Click a name to edit, or **Create new** to add someone
3. Fields:
   - **Full name** — displayed on the card
   - **Role / title** — shown below the name
   - **Initials** — 2 letters, shown when no photo is uploaded
   - **Accent colour** — hex value for the card tint (e.g. `#7fd8d1`)
   - **Portrait photo** — click the image field → Upload; Sanity handles resizing
   - **Bio** — 1–2 sentence description
   - **Display order** — integer; `1` = first card on the page
4. Click **Publish**

### Testimonials

1. Studio → **Testimonials → Create new** (or click an existing one)
2. Fill in **Quote**, **Person Name**, **Person Title**, and **Display Order**
3. Click **Publish**

### Legal Pages (Accessibility, Privacy, Terms)

1. Studio → **Legal Pages** → click the page you want (filter by Page Key)
2. Edit the **Last Updated** date, **Subtitle**, or **Lead Paragraph** fields at the top
3. To edit a section:
   - Click the section in the **Sections** array
   - Edit the **Title** or the **Body** rich-text field
   - Body supports: paragraphs, H3 headings, bold, italic, inline code, links, bullet lists, numbered lists
4. To add a new section: click **Add item** at the bottom of the Sections array
5. Click **Publish**

---

## Inviting editors

1. Go to [manage.sanity.io](https://manage.sanity.io) → your Block & Mortar project
2. **Members** → **Invite** → enter the editor's email address
3. Set their role to **Editor** (can publish content) or **Viewer** (read-only)
4. They'll receive an email invitation and can log in at `blockandmortar.sanity.studio`

---

## Deploy workflow

Content changes in Sanity don't appear on the live site automatically — the Astro build must run to pull in the latest data.

**Manual:** Trigger a new Vercel deploy from the Vercel dashboard.

**Automatic (recommended):** Set up a Vercel deploy hook connected to a Sanity webhook so every time you click **Publish** in the Studio, a redeploy fires automatically (~60 seconds end-to-end).

To set this up:
1. **Vercel** → Project → Settings → Git → Deploy Hooks → **Add** → name it "Sanity Publish", branch `main` → copy the hook URL
2. **manage.sanity.io** → your project → API → Webhooks → **Create** → paste the URL, set trigger to "publish" for all document types → Save

---

## Deploying the Studio

The Studio must be deployed separately to Sanity's hosting (free):

```bash
cd studio
npm install   # first time only
npm run deploy
```

This publishes the Studio to `blockandmortar.sanity.studio`. Run this once after the initial setup, and again any time you change a schema file in `studio/schemas/`.

---

## Setting up from scratch (developer setup)

These steps only need to happen once when setting up a new environment.

**1. Create a Sanity project**
- Go to [sanity.io/get-started](https://www.sanity.io/get-started) → Create project → name it "Block and Mortar"
- Note the **Project ID** shown on the dashboard

**2. Add your Project ID to the repo**

Update `studio/sanity.cli.ts` and `studio/sanity.config.ts` — replace `REPLACE_ME` with your actual Project ID.

**3. Create `.env.local` in the Astro project root** (not committed to git):
```
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
```

**4. Set Vercel environment variables**
In your Vercel project → Settings → Environment Variables:
| Key | Value |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | your project ID |
| `PUBLIC_SANITY_DATASET` | `production` |

**5. Enter content in the Studio**
Run `npm run cms` → visit `http://localhost:3333` → create and publish:
- The **Home Page** singleton
- All **Team Members** (upload photos from `public/assets/team-*.jpg`)
- All **Testimonials**
- The three **Legal Pages** (Accessibility, Privacy, Terms) with all their sections

**6. Deploy the Studio**
```bash
cd studio && npm run deploy
```

---

## Build scripts reference

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server (site only) |
| `npm run cms` | Sanity Studio dev server on `localhost:3333` |
| `npm run build` | Production Astro build — fetches live data from Sanity |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript check without building |

---

## Troubleshooting

**Site shows placeholder / default content instead of my Sanity content**
→ Make sure `PUBLIC_SANITY_PROJECT_ID` is set in `.env.local` (local) or Vercel Environment Variables (production). The site falls back to hardcoded defaults when no project ID is configured.

**A change I published isn't on the live site**
→ A new Vercel build needs to run. Either trigger one manually from the Vercel dashboard, or configure the Sanity → Vercel webhook (see *Deploy workflow* above).

**Team member photo isn't showing**
→ In Studio, open the team member → make sure a photo is uploaded and the document is **Published** (not just saved as a draft).

**Schema error after editing a `studio/schemas/` file**
→ Restart the Studio dev server (`npm run cms`). After shipping schema changes, re-deploy the Studio with `cd studio && npm run deploy`.

**I accidentally created two Home Page documents**
→ The Home Page schema uses `__experimental_actions: ['update', 'publish']` to prevent new documents. If a duplicate slipped through, delete it in Studio → delete the document that does NOT have the ID `singleton-homePage`.
