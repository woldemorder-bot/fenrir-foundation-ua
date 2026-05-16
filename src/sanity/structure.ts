import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("campaign").title("Campaigns"),
      S.documentTypeListItem("report").title("Reports"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("socialLink").title("Social links"),
    ]);
