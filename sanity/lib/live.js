// // Querying with "sanityFetch" will keep content automatically updated
// // Before using it, import and render "<SanityLive />" in your layout, see
// // https://github.com/sanity-io/next-sanity#live-content-api for more information.
// import { defineLive } from "next-sanity/live";
// import { client } from './client'

// export const { sanityFetch, SanityLive } = defineLive({
//   client,
// });
// sanity/lib/live.js
import { createClient } from 'next-sanity'

// Sanity client configuration
export const sanityClient = createClient({
  projectId: '3x76vcl9', // replace with your actual Sanity project ID
  dataset: 'production',  // your dataset
  apiVersion: '2026-01-01',
  useCdn: false,           // set to true for faster response in production
})

// Helper to fetch data
export const sanityFetch = async (query, params = {}) => {
  try {
    const data = await sanityClient.fetch(query, params)
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
