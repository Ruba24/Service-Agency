import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas' // ✅ fixed

export default defineConfig({
  name: 'default',
  title: 'Zellverse CMS',

  projectId: '3x76vcl9',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
