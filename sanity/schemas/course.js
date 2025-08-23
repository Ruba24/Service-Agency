export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    // {
    //   name: 'image',
    //   title: 'Course Image',
    //   type: 'image',
    //   options: { hotspot: true },
    // },
    {
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      description: 'Show in top 3 on homepage',
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price in USD (e.g. 49.99)'
    }
  ],
};