import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/", hash: "collection", label: "Products" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" },
  { to: "/refund-policy", label: "Refund Policy" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Flame className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Hot<span className="text-primary">Shop</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium Digital Products
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        © 2026 HotShop. All rights reserved.
      </div>
    </footer>
  );
}
