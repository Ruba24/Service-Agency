export default {
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Provide keywords for icon i.e. amazon, notion etc.',
    },
    {
      name: 'color',
      title: 'Icon Background Color',
      type: 'string',
      description: 'Optional background color (hex code, e.g. #FF9900)',
    },
    {
      name: 'courses',
      title: 'Related Courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
      description: 'Select which courses this tool belongs to',
    }
  ]
}
