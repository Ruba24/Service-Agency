// testimonial.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Manual Role/Title (optional)',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Client Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'relatedTo',
      title: 'Related Service or Course',
      type: 'reference',
      to: [{ type: 'service' }, { type: 'course' }],
      description: 'Select the service or course this testimonial is about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
