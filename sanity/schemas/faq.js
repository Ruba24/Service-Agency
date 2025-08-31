export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'course',
      title: 'Related Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Leave empty for generic FAQs (landing page)',
    }
  ]
}
