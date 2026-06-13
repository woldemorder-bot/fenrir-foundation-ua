import { defineField, defineType } from "sanity";

export const SUPPORTED_LOCALES = ["uk", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українська",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
  ],
  options: { columns: 2 },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українська",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
    }),
  ],
});

export const localizedRichText = defineType({
  name: "localizedRichText",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українська",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});
