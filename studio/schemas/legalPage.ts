import { defineField, defineType, defineArrayMember } from 'sanity';

/** Portable Text body field reused by every section */
const bodyField = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H3',     value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code',   value: 'code' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: Rule =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
              }),
            ],
          }),
        ],
      },
      lists: [
        { title: 'Bullet',   value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
    }),
  ],
});

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Accessibility Statement', value: 'accessibility' },
          { title: 'Privacy Policy',          value: 'privacy' },
          { title: 'Terms & Conditions',      value: 'terms' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero subtitle (e.g. WCAG 2.2 · Level AA)',
      type: 'string',
    }),
    defineField({
      name: 'leadParagraph',
      title: 'Lead paragraph (shown below the TOC)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'id',
              title: 'Anchor / slug (e.g. commitment)',
              type: 'slug',
              options: { source: 'title', maxLength: 64 },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'num',
              title: 'Section number (e.g. 01)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Section title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            bodyField,
          ],
          preview: {
            select: { title: 'title', subtitle: 'num' },
            prepare: ({ title, subtitle }) => ({
              title: `${subtitle} — ${title}`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'pageKey', subtitle: 'lastUpdated' },
    prepare: ({ title, subtitle }) => ({
      title: title
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : 'Legal page',
      subtitle: subtitle ?? '',
    }),
  },
});
