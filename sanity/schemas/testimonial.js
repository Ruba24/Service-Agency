export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'clientImage',
      title: 'Client Image (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'relatedTo',
      title: 'Related To',
      type: 'reference',
      to: [{ type: 'course' }],//point this to caseStudy or another type
    },
  ],
}