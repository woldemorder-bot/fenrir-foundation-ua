import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title,
    description,
    heroBanner{
      badge,
      kicker,
      headline,
      subline,
      ctaPrimaryLabel,
      ctaPrimaryUrl,
      ctaSecondaryLabel,
      ctaSecondaryUrl
    },
    mission,
    donateButtons[]{
      label,
      url,
      variant
    },
    contacts{
      email,
      phone,
      address
    }
  }
`;
