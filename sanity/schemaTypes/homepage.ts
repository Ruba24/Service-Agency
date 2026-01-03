// homepage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroGallery',
      title: 'Hero Background Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
