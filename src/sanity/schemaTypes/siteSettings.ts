import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "localizedText",
    }),
    defineField({
      name: "heroBanner",
      title: "Hero banner",
      type: "object",
      fields: [
        defineField({ name: "badge", type: "localizedString" }),
        defineField({ name: "kicker", type: "localizedString" }),
        defineField({ name: "headline", type: "localizedString" }),
        defineField({ name: "subline", type: "localizedText" }),
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "ctaPrimaryLabel", type: "localizedString" }),
        defineField({ name: "ctaPrimaryUrl", type: "string" }),
        defineField({ name: "ctaSecondaryLabel", type: "localizedString" }),
        defineField({ name: "ctaSecondaryUrl", type: "string" }),
      ],
    }),
    defineField({
      name: "mission",
      title: "Mission text",
      type: "localizedRichText",
    }),
    defineField({
      name: "donateButtons",
      title: "Donate buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localizedString" }),
            defineField({ name: "url", type: "url" }),
            defineField({
              name: "variant",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "label.uk", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "contacts",
      title: "Contacts",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "localizedText" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title ?? "Site settings" }),
  },
});
