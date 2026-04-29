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
      title: 'Hero heading',
      type: 'string',
      description: 'Large h1 in the hero section.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'string',
      description: 'Smaller line beneath the heading.',
    }),
    // -------------------------------------------------------------------------
    // CTA section
    // -------------------------------------------------------------------------
    defineField({
      name: 'ctaHeading',
      title: 'CTA heading',
      type: 'string',
      description: 'Heading in the "Request a demo" section at the bottom.',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA description',
      type: 'text',
      rows: 3,
    }),
    // -------------------------------------------------------------------------
    // Steps — "How it works" (always exactly 4)
    // -------------------------------------------------------------------------
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
    // Verticals (always exactly 5)
    // -------------------------------------------------------------------------
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
  ],
});
