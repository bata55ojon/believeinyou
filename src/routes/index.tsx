import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Zap, Gem, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { useBuy } from "@/components/site/BuyContext";
import { FeaturesSection, CtaSection } from "@/components/site/sections";
import { useI18n } from "@/i18n";
import { products } from "@/data/products";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HotShop — Premium Digital Content Store" },
      {
        name: "description",
        content:
          "Discover HotShop's exclusive collection of 25 premium digital products. Secure checkout, instant access, orders completed on Telegram.",
      },
      { property: "og:title", content: "HotShop — Premium Digital Content" },
      {
        property: "og:description",
        content:
          "Exclusive collection of premium digital products with instant access.",
      },
    ],
  }),
  component: Home,
});

const trustIcons = [Lock, Zap, Gem];

function Home() {
  const buy = useBuy();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const trust = [t("secure"), t("instant"), t("premium")];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [query]);

  const suggestions = useMemo(
    () => [...products].sort((a, b) => b.price - a.price).slice(0, 4),
    [],
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="bg-hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="animate-fade-up glass-panel inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
            {t("heroBadge")}
          </span>
          <h1 className="animate-fade-up text-gradient-primary mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="animate-fade-up mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="animate-fade-up mt-8 flex justify-center">
            <Button asChild size="lg" className="h-12 px-8 shadow-glow">
              <Link to="/" hash="collection">
                {t("viewCollection")}
              </Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {trust.map((label, index) => {
              const Icon = trustIcons[index];
              if (!Icon) return null;
              return (
                <li
                  key={label}
                  className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:text-sm"
                >
                  <Icon className="size-4 text-primary" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-4xl">
            {t("ourProducts")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t("ourProductsSub")}
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="glass-panel h-12 w-full rounded-full pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:shadow-glow focus:ring-1 focus:ring-primary"
          />
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onBuy={buy} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-center text-sm text-muted-foreground sm:text-base">
              {t("noResults")}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} onBuy={buy} />
              ))}
            </div>
          </div>
        )}
      </section>

      <FeaturesSection />
      <CtaSection />
    </>
  );
}
