// schemas/freeCourse.js
export default {
  name: 'freeCourse',
  title: 'Free Course',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'videoId', type: 'string', title: 'YouTube Video ID' }
  ]
}
