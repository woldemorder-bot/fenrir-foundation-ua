export const newsArticles = [
  {
    slug: "kviten-zvit-postavok",
    date: "2026-05-02",
    coverTone: "from-sky-500/30 to-indigo-500/10",
  },
  {
    slug: "novi-fpv-komplekty",
    date: "2026-04-18",
    coverTone: "from-amber-500/25 to-orange-600/10",
  },
  {
    slug: "podaka-vid-brigady",
    date: "2026-04-03",
    coverTone: "from-emerald-500/25 to-teal-600/10",
  },
] as const;

export const newsTitles = {
  "kviten-zvit-postavok": {
    uk: "Квітень: звіт про поставки та логістику",
    en: "April: logistics and deliveries report",
  },
  "novi-fpv-komplekty": {
    uk: "Нові FPV-комплекти для ударної роти",
    en: "New FPV kits for an assault company",
  },
  "podaka-vid-brigady": {
    uk: "Подяка від бригади за медичні набори",
    en: "A brigade’s thank-you for medical kits",
  },
} as const;

export type NewsSlug = (typeof newsArticles)[number]["slug"];
