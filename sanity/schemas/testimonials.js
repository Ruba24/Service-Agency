export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Manual Role/Title (optional)',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Client Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating (1 to 5)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: 'relatedTo',
      title: 'Related Service or Course',
      type: 'reference',
      to: [
        { type: 'service' },
        { type: 'course' },
      ],
      description: 'Select the service or course this testimonial is about',
      validation: Rule => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
