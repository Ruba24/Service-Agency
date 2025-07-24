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
      title: 'Course Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'thumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
