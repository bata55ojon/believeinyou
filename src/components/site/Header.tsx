import { Link } from "@tanstack/react-router";
import { Menu, X, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const links = [
    { to: "/", label: t("home") },
    { to: "/", hash: "collection", label: t("products") },
    { to: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-panel border-x-0 border-t-0">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Flame className="size-5 text-primary-foreground" />
          </span>
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            Hot<span className="text-primary">Shop</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.label}`}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                activeOptions={{ exact: l.to === "/" && !("hash" in l) }}
                activeProps={{ className: "text-primary" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="ml-2 shadow-glow">
              <Link to="/" hash="collection">{t("viewCollection")}</Link>
            </Button>
          </nav>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:border-primary md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="animate-fade-up border-t border-border bg-background/95 px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.label}`}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-2 w-full shadow-glow">
              <Link to="/" hash="collection" onClick={() => setOpen(false)}>
                {t("viewCollection")}
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
