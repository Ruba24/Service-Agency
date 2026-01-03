// course.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Paid Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Enter the icon name like FaCode, FaPaintBrush, FaMobileAlt etc.',
    }),
    defineField({
      name: 'gallery',
      title: 'Course Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload multiple images for the course carousel',
    }),
    defineField({
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Course',
      type: 'boolean',
      description: 'Enable this to feature the course on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    }),
    defineField({
      name: 'tools',
      title: 'Tools Covered',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
        },
      ],
    }),
  ],
})
