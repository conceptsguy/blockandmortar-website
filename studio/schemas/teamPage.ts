import { defineField, defineType } from 'sanity';

export const teamPage = defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  // Singleton — prevent creating a second document via the Studio UI
  __experimental_actions: ['update', 'publish'],
  fields: [
    // -------------------------------------------------------------------------
    // Hero
    // -------------------------------------------------------------------------
    defineField({
      name: 'h1',
      title: 'Hero — H1 heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subheader',
      title: 'Hero — subheader / lede',
      type: 'text',
      rows: 3,
    }),

    // -------------------------------------------------------------------------
    // Our story section
    // -------------------------------------------------------------------------
    defineField({
      name: 'storyHeading',
      title: 'Our story — heading',
      type: 'string',
    }),
    defineField({
      name: 'storyBody',
      title: 'Our story — body',
      type: 'text',
      rows: 5,
      description: 'Separate paragraphs with a blank line (two newlines).',
    }),

    // -------------------------------------------------------------------------
    // Vision section
    // -------------------------------------------------------------------------
    defineField({
      name: 'visionHeading',
      title: 'The vision — heading',
      type: 'string',
    }),
    defineField({
      name: 'visionBody',
      title: 'The vision — body',
      type: 'text',
      rows: 5,
      description: 'Separate paragraphs with a blank line (two newlines).',
    }),

    // -------------------------------------------------------------------------
    // Apply today section
    // -------------------------------------------------------------------------
    defineField({
      name: 'applyHeading',
      title: 'Apply today — heading',
      type: 'string',
    }),
    defineField({
      name: 'applyBody',
      title: 'Apply today — body',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Team Page' }),
  },
});
