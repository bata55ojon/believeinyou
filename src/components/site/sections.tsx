import { Link } from "@tanstack/react-router";
import { Lock, Zap, Gem, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

const featureIcons = [Lock, Zap, Gem, Smartphone];

export function FeaturesSection() {
  const { t } = useI18n();
  const features = [
    { title: t("secure"), text: t("featSecureText") },
    { title: t("featFastTitle"), text: t("featFastText") },
    { title: t("featPremiumTitle"), text: t("featPremiumText") },
    { title: t("featMobileTitle"), text: t("featMobileText") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, index) => {
          const Icon = featureIcons[index]!;
          return (
          <div
            key={f.title}
            className="animate-fade-up rounded-2xl border border-border bg-gradient-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Icon className="size-5 text-primary-foreground" />
            </span>
            <h3 className="mt-4 text-base font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
          );
        })}
      </div>
    </section>
  );
}

export function CtaSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="bg-hero-glow relative overflow-hidden rounded-3xl border border-primary/30 px-6 py-14 text-center shadow-glow">
        <h2 className="font-display text-2xl font-extrabold sm:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          {t("ctaText")}
        </p>
        <Button asChild size="lg" className="mt-7 h-12 px-8 shadow-glow">
          <Link to="/" hash="collection">{t("viewCollection")}</Link>
        </Button>
      </div>
    </section>
  );
}
