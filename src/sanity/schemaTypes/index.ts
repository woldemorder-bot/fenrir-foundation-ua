import type { SchemaTypeDefinition } from "sanity";

import { campaign } from "./campaign";
import { galleryItem } from "./galleryItem";
import { localizedRichText, localizedString, localizedText } from "./localized";
import { partner } from "./partner";
import { report } from "./report";
import { siteSettings } from "./siteSettings";
import { socialLink } from "./socialLink";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Custom field types
  localizedString,
  localizedText,
  localizedRichText,
  // Documents
  siteSettings,
  campaign,
  report,
  galleryItem,
  teamMember,
  partner,
  socialLink,
];
