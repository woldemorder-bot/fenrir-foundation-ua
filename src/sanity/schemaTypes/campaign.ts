import { defineField, defineType } from "sanity";

export const campaign = defineType({
  name: "campaign",
  title: "Campaign",
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
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Paused", value: "paused" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "goalAmount",
      type: "number",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "currentAmount",
      type: "number",
      validation: (r) => r.min(0),
      initialValue: 0,
    }),
    defineField({
      name: "currency",
      type: "string",
      options: {
        list: ["UAH", "USD", "EUR"],
      },
      initialValue: "UAH",
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "donationLink",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      media: "coverImage",
    },
    prepare: ({ title, status, media }) => ({
      title,
      subtitle: status ? `Status: ${status}` : undefined,
      media,
    }),
  },
});
