import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "3x76vcl9",  // 👈 must match
  dataset: "production",         // 👈 must match
  apiVersion: "2023-01-01",      // safe version
  useCdn: true,                  // set false if you want fresh data
});
