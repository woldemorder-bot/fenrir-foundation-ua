import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      type: "url",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower = shown first",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
