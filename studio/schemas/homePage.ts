import { defineField, defineType, defineArrayMember } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton — prevent creating a second document via the Studio UI
  __experimental_actions: ['update', 'publish'],
  fields: [
    // -------------------------------------------------------------------------
    // Hero
    // -------------------------------------------------------------------------
    defineField({
      name: 'heroHeading',
      title: 'Hero — heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero — subheading',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Hero — testimonials',
      type: 'array',
      description: 'Rotating quotes shown in the hero section.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: Rule => Rule.required() }),
            defineField({ name: 'personName', title: 'Person name', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'personTitle', title: 'Person title / company', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'personName', subtitle: 'personTitle' } },
        }),
      ],
    }),
    defineField({
      name: 'logos',
      title: 'Trusted-by logos',
      type: 'array',
      description: 'Scrolling marquee logos in the hero "Trusted by" strip.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logo',
          fields: [
            defineField({ name: 'alt', title: 'Company name / alt text', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'logo', title: 'Logo image', type: 'image', options: { hotspot: false }, validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'alt', media: 'logo' } },
        }),
      ],
    }),

    // -------------------------------------------------------------------------
    // Prompt section ("A sentence becomes a defensible pro forma.")
    // -------------------------------------------------------------------------
    defineField({
      name: 'promptHeading',
      title: 'Prompt section — heading (plain part)',
      type: 'string',
      description: 'e.g. "A sentence becomes"',
    }),
    defineField({
      name: 'promptHeadingEm',
      title: 'Prompt section — heading (italic part)',
      type: 'string',
      description: 'e.g. "a defensible pro forma."',
    }),
    defineField({
      name: 'promptDescription',
      title: 'Prompt section — description',
      type: 'text',
      rows: 3,
    }),

    // -------------------------------------------------------------------------
    // Steps section ("One platform for every stage…")
    // -------------------------------------------------------------------------
    defineField({
      name: 'stepsHeading',
      title: 'Steps section — heading (plain part)',
      type: 'string',
      description: 'e.g. "One platform for"',
    }),
    defineField({
      name: 'stepsHeadingEm',
      title: 'Steps section — heading (italic part)',
      type: 'string',
      description: 'e.g. "every stage of the development lifecycle."',
    }),
    defineField({
      name: 'stepsDescription',
      title: 'Steps section — description',
      type: 'text',
      rows: 3,
    }),
    // Steps — "How it works" (always exactly 4)
    defineField({
      name: 'steps',
      title: 'How it works — steps',
      type: 'array',
      description: 'Exactly 4 steps. The visualisation beside each step is fixed in code.',
      validation: Rule => Rule.required().min(4).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'number',
              title: 'Step number (01, 02, 03, 04)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Step title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Step description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare: ({ title, subtitle }) => ({
              title: `${subtitle} — ${title}`,
            }),
          },
        }),
      ],
    }),

    // -------------------------------------------------------------------------
    // Bento / Platform section
    // -------------------------------------------------------------------------
    defineField({
      name: 'bentoHeading',
      title: 'Platform section — heading (plain part)',
      type: 'string',
      description: 'e.g. "Blocks that stack into"',
    }),
    defineField({
      name: 'bentoHeadingEm',
      title: 'Platform section — heading (italic part)',
      type: 'string',
      description: 'e.g. "a defensible estimate."',
    }),
    defineField({
      name: 'bentoDescription',
      title: 'Platform section — description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bentoBoxes',
      title: 'Platform — bento boxes',
      type: 'array',
      description:
        'Exactly 8 boxes, in layout order: AI Estimator · GIS Map · Pro Forma · P50 · P90 · Integrations · Risk · Benchmarking. Animations stay fixed; only text is editable.',
      validation: Rule => Rule.required().min(8).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bentoBox',
          fields: [
            defineField({ name: 'tag', title: 'Tag label (e.g. AI ESTIMATOR)', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description (optional)', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'tag', subtitle: 'heading' } },
        }),
      ],
    }),

    // -------------------------------------------------------------------------
    // Collab section
    // -------------------------------------------------------------------------
    defineField({
      name: 'collabHeading',
      title: 'Collab section — heading (plain part)',
      type: 'string',
      description: 'e.g. "Every stakeholder,"',
    }),
    defineField({
      name: 'collabHeadingEm',
      title: 'Collab section — heading (italic part)',
      type: 'string',
      description: 'e.g. "in the same model, at the same moment."',
    }),
    defineField({
      name: 'collabDescription',
      title: 'Collab section — description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'collabFeatures',
      title: 'Collab section — feature list',
      type: 'array',
      description: 'Exactly 3 feature bullets.',
      validation: Rule => Rule.min(3).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature title (bold)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature description',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    // -------------------------------------------------------------------------
    // Verticals (always exactly 5)
    // -------------------------------------------------------------------------
    defineField({
      name: 'verticalsHeading',
      title: 'Verticals section — heading (plain part)',
      type: 'string',
      description: 'e.g. "Built for the projects"',
    }),
    defineField({
      name: 'verticalsHeadingEm',
      title: 'Verticals section — heading (italic part)',
      type: 'string',
      description: 'e.g. "you actually build."',
    }),
    defineField({
      name: 'verticalsDescription',
      title: 'Verticals section — description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'verticals',
      title: 'Verticals',
      type: 'array',
      description:
        'Exactly 5 vertical cards. The "key" must match a CSS class (apartments, datacenter, franchise, office, retail).',
      validation: Rule => Rule.required().min(5).max(5),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'vertical',
          fields: [
            defineField({
              name: 'key',
              title: 'CSS key (apartments | datacenter | franchise | office | retail)',
              type: 'string',
              options: {
                list: [
                  'apartments',
                  'datacenter',
                  'franchise',
                  'office',
                  'retail',
                ],
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Vertical title (e.g. Multifamily)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'meta',
              title: 'Meta line (e.g. 24 stories · 312 units · Kansas City)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'meta' },
          },
        }),
      ],
    }),

    // -------------------------------------------------------------------------
    // CTA section
    // -------------------------------------------------------------------------
    defineField({
      name: 'ctaHeading',
      title: 'CTA — heading (plain part)',
      type: 'string',
      description: 'e.g. "Model your next project"',
    }),
    defineField({
      name: 'ctaHeadingEm',
      title: 'CTA — heading (italic part)',
      type: 'string',
      description: 'e.g. "in minutes."',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA — description',
      type: 'text',
      rows: 3,
    }),
  ],
});
