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
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "icon",
      title: "Icon (Emoji)",
      type: "string",
      description:
        "Enter the icon name like FaCode, FaPaintBrush, FaMobileAlt etc.",
    }),

    defineField({
      name: "desc",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "gallery",
      title: "Service Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      description: "Upload multiple images for the service",
    }),

    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
