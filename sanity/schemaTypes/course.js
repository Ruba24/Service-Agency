import { defineType, defineField } from "sanity";

export default defineType({
  name: "course",
  title: "Paid Course",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Course Title",
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
      title: "Icon (Emoji)",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "gallery",
      title: "Course Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(350).warning("Keep it under ~50 words"),
    }),

    defineField({
      name: "description",
      title: "Course Description",
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
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),

    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: ["Beginner", "Intermediate", "Advanced"],
      },
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Course",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "tools",
      title: "Tools Covered",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tool" }] }],
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text" }),
          ],
        },
      ],
    }),
  ],
});
