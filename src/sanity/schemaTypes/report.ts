import { defineField, defineType } from "sanity";

export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "relatedCampaign",
      type: "reference",
      to: [{ type: "campaign" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
    },
    prepare: ({ title, date }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString() : undefined,
    }),
  },
});
