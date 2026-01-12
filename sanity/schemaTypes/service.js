import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Icon (Emoji or FontAwesome)",
      type: "string",
      description:
        "Optional. Enter the icon name like FaCode, FaPaintBrush, FaMobileAlt, or an emoji.",
    }),

    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(350).warning("Keep it under ~50 words"),
      description: "This will appear on the Services list page.",
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab?" },
                ],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
      description: "This will appear on the Service detail page.",
    }),

    defineField({
      name: "gallery",
      title: "Service Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload multiple images for the service.",
    }),

    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tools",
      title: "Tools Used / Related",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tool" }] }],
      description: "Optional: Show tools or technologies used in this service.",
    }),
  ],
});
