import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote text',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'personTitle',
      title: 'Person title (e.g. CEO, Goebel Mitts Construction)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order (1 = first)',
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
    select: { title: 'personName', subtitle: 'personTitle' },
  },
});
