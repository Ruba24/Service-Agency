// freeCourse.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'freeCourse',
  title: 'Free Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
    }),
  ],
})
