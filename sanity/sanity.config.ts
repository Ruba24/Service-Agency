// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ZellVerse Studio',
  projectId: '3x76vcl9', // replace with your actual Sanity project ID
  dataset: 'production',  // your dataset
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
  useCdn: false,
})
