import { defineConfig } from 'tinacms';

// ---------------------------------------------------------------------------
// Branch — prefer the environment variable injected by Vercel or GitHub CI,
// fall back to "main" for local development.
// ---------------------------------------------------------------------------
const branch =
  process.env.GITHUB_BRANCH ??
  process.env.VERCEL_GIT_COMMIT_REF ??
  process.env.HEAD ??
  'main';

export default defineConfig({
  // -------------------------------------------------------------------------
  // Tina Cloud credentials
  // Set these in .env (see .env.example).  Leave blank for local-only mode.
  // -------------------------------------------------------------------------
  clientId: process.env.TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
  branch,

  // -------------------------------------------------------------------------
  // Build — output the /admin SPA to public/admin so Vercel serves it
  // -------------------------------------------------------------------------
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  // -------------------------------------------------------------------------
  // Media — images land in public/assets, served as /assets/*
  // -------------------------------------------------------------------------
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },

  // -------------------------------------------------------------------------
  // Schema — one collection per content type
  // -------------------------------------------------------------------------
  schema: {
    collections: [
      // -----------------------------------------------------------------------
      // Team members  →  src/content/team/*.yaml
      // -----------------------------------------------------------------------
      {
        name: 'team',
        label: 'Team Members',
        path: 'src/content/team',
        format: 'yaml',
        ui: {
          // Slug is generated from the person's name (lowercased, hyphenated)
          filename: {
            slugify: (values: Record<string, string>) =>
              values.name
                ? values.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                : 'team-member',
          },
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Full name',
            required: true,
          },
          {
            type: 'string',
            name: 'role',
            label: 'Role / title',
            required: true,
          },
          {
            type: 'string',
            name: 'initials',
            label: 'Initials (2 letters — used when photo is missing)',
            required: true,
          },
          {
            type: 'string',
            name: 'tint',
            label: 'Accent colour (hex, e.g. #7fd8d1)',
            required: true,
          },
          {
            type: 'image',
            name: 'photo',
            label: 'Portrait photo',
            required: true,
          },
          {
            type: 'string',
            name: 'bio',
            label: 'Bio (1–2 sentences)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display order (1 = first)',
            required: true,
          },
        ],
      },

      // -----------------------------------------------------------------------
      // Blog posts  →  src/content/blog/*.mdx
      // -----------------------------------------------------------------------
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
            isTitle: true,
          },
          {
            type: 'datetime',
            name: 'publishedAt',
            label: 'Publish date',
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt (shown in listings)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft (hide from site)',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
