import { client } from "./client";

/**
 * Helper function to fetch data from Sanity
 * @param {Object} options - Object containing query and optional params
 * @param {string} options.query - The Sanity query string
 * @param {Object} options.params - Optional query parameters
 * @returns {Promise<{data: any}>} The fetched data
 */
export async function sanityFetch({ query, params = {} }) {
  try {
    const data = await client.fetch(query, params);
    return { data };
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
