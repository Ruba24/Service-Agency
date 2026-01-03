import { defineConfig } from 'sanity'
import { schemaTypes } from './schemas'

export default defineConfig({
  projectId: '3x76vcl9',
  dataset: 'production',
  title: 'ZELLVERSE Studio',

  schema: {
    types: schemaTypes,
  },
})
