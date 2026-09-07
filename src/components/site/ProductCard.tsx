import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoOverlay } from "@/components/site/VideoOverlay";
import { BundleDialog } from "@/components/site/BundleDialog";
import { useI18n } from "@/i18n";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: (product: Product) => void;
}) {
  const { t } = useI18n();
  const [bundleOpen, setBundleOpen] = useState(false);
  const hasBundle = (product.subProducts?.length ?? 0) > 0;

  const handleClick = () => {
    if (hasBundle) setBundleOpen(true);
    else onBuy(product);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow">
      <button
        type="button"
        onClick={handleClick}
        className="relative block aspect-4/3 w-full overflow-hidden"
        aria-label={`${product.name} — buy`}
      >
        <video
          src={product.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${product.name} cover video`}
          className="size-full bg-black object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground shadow-glow">
          PREMIUM
        </span>
        <VideoOverlay seed={Number(product.id.replace(/\D/g, "")) || 1} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button type="button" onClick={handleClick} className="min-w-0 text-left">
          <h3 className="truncate text-base font-bold">{product.name}</h3>
        </button>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-xl font-extrabold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button size="sm" onClick={handleClick}>
            {t("buyNow")}
          </Button>
        </div>
      </div>

      <BundleDialog
        product={bundleOpen ? product : null}
        onOpenChange={setBundleOpen}
        onBuy={(item) => {
          setBundleOpen(false);
          onBuy(item);
        }}
      />
    </article>
  );
}
