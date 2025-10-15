// schemas/course.js
export default {
  name: 'course',
  title: 'Paid Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Enter the icon name like FaCode, FaPaintBrush, FaMobileAlt etc.',
    },
    {
      name: 'gallery',
      title: 'Course Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Upload multiple images for the course carousel',
    },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
     {
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      description: 'Enable this to feature the course on the homepage.',
      initialValue: false,
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    },
    {
      name: 'tools',
      title: 'Tools Covered',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    },
  ],
}
