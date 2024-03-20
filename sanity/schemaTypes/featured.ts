import { defineType } from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured menu categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Featured category name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'restaurants',
      title: 'Restaurants',
      validation: Rule => Rule.required(),
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'restaurant' }] }],
    },
  ],
})
