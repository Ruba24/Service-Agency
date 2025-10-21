export default {
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Award Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Award Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
