export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroGallery',
      title: 'Hero Background Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}