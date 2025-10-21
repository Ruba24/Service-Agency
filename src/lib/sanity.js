import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

console.log("🧪 SANITY_PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log("🧪 SANITY_DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET)

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

// ✅ Export urlFor so you can use it anywhere
export function urlFor(source) {
  return builder.image(source)
}
