// ./schemas/service.js
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Enter the icon name like FaCode, FaPaintBrush, FaMobileAlt etc.',
    },
    {
      name: 'desc',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'gallery',
      title: 'Service Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Upload multiple images for the service',
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
