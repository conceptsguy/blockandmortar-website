import { defineField, defineType } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials (2 letters — used when photo is missing)',
      type: 'string',
      validation: Rule => Rule.required().max(2),
    }),
    defineField({
      name: 'tint',
      title: 'Accent colour (hex, e.g. #7fd8d1)',
      type: 'string',
      validation: Rule =>
        Rule.required().regex(/^#[0-9a-fA-F]{6}$/, {
          name: 'hex colour',
          invert: false,
        }),
    }),
    defineField({
      name: 'photo',
      title: 'Portrait photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio (1–2 sentences)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order (1 = first card)',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
