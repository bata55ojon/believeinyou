import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export function BundleDialog({
  product,
  onOpenChange,
  onBuy,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
  onBuy: (product: Product) => void;
}) {
  const items = product?.subProducts ?? [];

  return (
    <Dialog open={!!product && items.length > 0} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-popover sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product?.name}
          </DialogTitle>
          <DialogDescription>
            This pack includes {items.length} products. Choose one to continue.
          </DialogDescription>
        </DialogHeader>

        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                  CODE: {item.code}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-base font-extrabold text-primary">
                  ${item.price.toFixed(2)}
                </span>
                <Button size="sm" onClick={() => onBuy(item)}>
                  Buy Now
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
