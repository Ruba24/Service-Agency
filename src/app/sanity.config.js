import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './schemaTypes'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export default defineConfig({
  name: 'default',
  title: 'Client CMS',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
plugins: [deskTool()], // no custom structure

  schema: { types: schema },
})
