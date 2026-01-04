import { defineType, defineField } from "sanity";

export default defineType({
  name: "blog",
  title: "Blogs",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Blog Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description:
        "A short summary of the blog (used in cards & meta description)",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Blog Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Main content of the blog post",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "url",
      title: "Blog URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
