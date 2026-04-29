# Block & Mortar — CMS Guide

The site uses **TinaCMS** to edit content without touching code. Everything you update through the CMS is saved back to the git repository as plain files (YAML for team members, MDX for blog posts), so there's always a version history.

---

## What you can edit

| Content type | Where it lives | How to edit |
|---|---|---|
| Team members | `src/content/team/*.yaml` | CMS → Team Members |
| Blog posts | `src/content/blog/*.mdx` | CMS → Blog Posts |
| Photos & images | `public/assets/` | Upload through the CMS media browser |

> **Legal pages (Terms, Privacy, Accessibility)** and all other copy are currently in React components (`src/components/`). To edit them, open the relevant `.jsx` file directly.

---

## Option A — Edit locally (no account needed)

This is the fastest way to make a quick change. Everything runs on your machine.

**1. Start the CMS + dev server together:**
```bash
npm run cms
```

**2. Open the editor:**
```
http://localhost:4321/admin/index.html
```

**3. Make your changes** in the browser UI → click **Save**.  
The YAML / MDX file on disk is updated immediately.

**4. Commit and push** the changed file to deploy:
```bash
git add src/content/
git commit -m "Update team bios"
git push
```

---

## Option B — Tina Cloud (for editors without code access)

Tina Cloud hosts the CMS backend so anyone with a login can edit content from `https://your-domain.com/admin` — no terminal, no git. Changes are committed back to GitHub automatically.

### One-time setup (done by a developer)

**1. Create a Tina Cloud project:**
- Go to [app.tina.io](https://app.tina.io) → **New project**
- Connect it to the `blockandmortar-website` GitHub repository
- Set the **Site URL** to your Vercel production URL

**2. Get your credentials:**
- In the Tina Cloud dashboard → **Configuration**
- Copy **Client ID** and generate a **Read/Write Token**

**3. Add them as environment variables:**

*For local development* — create a `.env` file (do not commit it):
```bash
cp .env.example .env
# then fill in the values:
TINA_CLIENT_ID=your-client-id-here
TINA_TOKEN=your-token-here
```

*For Vercel* — go to your Vercel project → **Settings → Environment Variables**:
| Key | Value | Environment |
|---|---|---|
| `TINA_CLIENT_ID` | your Client ID | Production, Preview, Development |
| `TINA_TOKEN` | your Read/Write Token | Production, Preview, Development |

**4. Re-deploy** to Vercel — the `/admin` page will now be connected to Tina Cloud.

**5. Invite editors** in Tina Cloud → **Users** → Add by email.

### Day-to-day editing (for editors)

1. Go to `https://blockandmortar.ai/admin`
2. Log in with your Tina Cloud account
3. Click the collection you want to edit (Team Members or Blog Posts)
4. Make changes → **Save**
5. Changes are automatically committed to GitHub and trigger a Vercel redeploy (≈ 60 seconds)

---

## Editing team members

Each team member is a YAML file in `src/content/team/`. In the CMS:

1. **CMS → Team Members**
2. Click a name to edit, or **Create new** to add someone
3. Fields:
   - **Full name** — display name on the card
   - **Role / title** — shown below the name
   - **Initials** — 2 letters, used as fallback if the photo is missing
   - **Accent colour** — hex value for the card border tint (e.g. `#7fd8d1`)
   - **Portrait photo** — upload via the media browser; lands in `public/assets/`
   - **Bio** — 1–2 sentences
   - **Display order** — `1` = first card, `2` = second, etc.
4. **Save** → the file is written; commit (local) or auto-committed (Tina Cloud)

---

## Writing a blog post

Blog posts live in `src/content/blog/` as MDX files.

1. **CMS → Blog Posts → Create new**
2. Fill in:
   - **Title** — the post headline
   - **Publish date** — controls display order when the blog index is built
   - **Excerpt** — 1–2 sentences for listing cards
   - **Author** — optional; defaults to blank
   - **Draft** — tick this to keep the post hidden until you're ready
   - **Body** — rich-text editor with headings, bold, italic, links, images
3. **Save**

> **Note:** The blog index page (`/blog`) doesn't exist yet — it's scaffolded but empty. When you're ready to launch the blog, ask a developer to add the listing and post routes.

---

## Uploading images

In the CMS editor, click any **image field** → **Choose image** → **Upload**.  
Images land in `public/assets/` and are served at `/assets/filename.jpg`.

Recommended sizes:
| Use | Width | Format |
|---|---|---|
| Team portrait | 800 × 800 px | JPG or WebP |
| Blog hero | 1600 × 900 px | WebP |
| General | — | WebP where possible |

---

## Build scripts reference

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server only (no CMS UI) |
| `npm run cms` | TinaCMS + Astro dev server together — use this for local editing |
| `npm run build` | Astro-only build (no admin UI) — fast, works without credentials |
| `npm run build:vercel` | Full build: Tina admin UI + Astro — used by Vercel in production |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript check without building |

---

## Troubleshooting

**Admin page shows "Loading…" forever**  
→ Make sure `npm run cms` is running (not `npm run dev`). The CMS dev server runs on a separate port and proxies Astro.

**"Invalid credentials" on the cloud admin**  
→ Check that `TINA_CLIENT_ID` and `TINA_TOKEN` are set in Vercel → Environment Variables and that a fresh deployment has happened since you added them.

**Changes don't appear after saving**  
→ In local mode, the file is saved but you need to commit and push. In cloud mode, check GitHub for the auto-commit and Vercel for the deploy status.

**A team member is missing from the page**  
→ Check their `order` field is a positive integer. Duplicate order values won't crash the site but the sort order will be unpredictable.
