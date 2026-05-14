import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeAbout } from "@/components/home/home-about";
import { HomeDonate } from "@/components/home/home-donate";
import { HomeFounder } from "@/components/home/home-founder";
import { HomeHero } from "@/components/home/home-hero";
import { HomeImpact } from "@/components/home/home-impact";
import { HomeNews } from "@/components/home/home-news";
import { HomePartners } from "@/components/home/home-partners";
import { HomeProjects } from "@/components/home/home-projects";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      locale,
    },
  };
}

export default async function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fenrir Foundation UA",
    url: "https://fenrir.foundation",
    areaServed: { "@type": "Country", name: "Ukraine" },
    knowsAbout: ["Humanitarian aid", "Defense procurement transparency"],
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <HomeHero />
      <HomeFounder />
      <HomeProjects />
      <HomeImpact />
      <HomeAbout />
      <HomeNews />
      <HomePartners />
      <HomeDonate />
    </>
  );
}
