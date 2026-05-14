import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export async function HomeFounder() {
  const t = await getTranslations("home.founder");

  return (
    <section className="border-b border-border bg-card/10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium text-primary">{t("title")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t("name")}</h2>
          <p className="mt-2 text-sm text-muted">{t("role")}</p>
          <blockquote className="mt-6 border-l-2 border-primary/60 pl-5 text-lg leading-relaxed text-foreground/90">
            {t("quote")}
          </blockquote>
          <div className="mt-8">
            <Link className="text-sm font-medium text-primary hover:underline" href="/about/founder">
              {t("link")} →
            </Link>
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.06}>
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-border/60 via-background to-card">
              <Image
                src="/founder-placeholder.svg"
                alt=""
                fill
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-muted">
                MVP: замінити на фото з брифу (frontline / портрет).
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-muted leading-relaxed">
                {t("role")}
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
