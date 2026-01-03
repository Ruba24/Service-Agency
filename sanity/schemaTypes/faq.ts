// faq.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'course',
      title: 'Related Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Leave empty for generic FAQs (landing page)',
    }),
  ],
})
