import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "X / Twitter", value: "x" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Telegram", value: "telegram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      description: "Display label (e.g. @fenrir.foundation)",
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
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
    select: { title: "platform", subtitle: "url" },
  },
});
