export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
