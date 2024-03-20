import { defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menu category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image of the category',
      type: 'image',
    },
  ],
})
