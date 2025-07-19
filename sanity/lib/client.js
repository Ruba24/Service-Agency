import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '3x76vcl9', 
  dataset: 'production',           // Or your dataset name
  apiVersion: '2023-07-19',        // Use today's date or newer
  useCdn: true,                    // Use CDN for fast, public data
})
