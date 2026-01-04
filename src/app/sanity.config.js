import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "../../sanity/schemaTypes";
import { structure } from "../../sanity/structure";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01";

export default defineConfig({
  name: "default",
  title: "Client CMS",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [deskTool({ structure })],
  schema: { types: schemaTypes },
});
