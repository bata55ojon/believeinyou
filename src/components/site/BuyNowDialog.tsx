import { useState } from "react";
import { Check, Gift, Bitcoin, Wallet, Coins, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { telegramCheckoutUrl, type Product } from "@/data/products";
import { useI18n } from "@/i18n";

const methods = [
  {
    id: "PayPal",
    icon: Wallet,
    label: "PayPal",
    hint: "Pay securely with PayPal",
  },
  { id: "Binance", icon: Coins, label: "Binance", hint: "Pay with Binance" },
  {
    id: "Crypto (BTC / ETH)",
    icon: Bitcoin,
    label: "Crypto",
    hint: "BTC / ETH — pay using cryptocurrency",
  },
  {
    id: "Gift Card",
    icon: Gift,
    label: "Gift Card",
    hint: "Pay with Gift Card",
  },
];

export function BuyNowDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const { lang } = useI18n();

  return (
    <Dialog
      open={!!product}
      onOpenChange={(o) => {
        if (!o) setSelected(null);
        onOpenChange(o);
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-popover sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Choose Your Payment Method
          </DialogTitle>
          <DialogDescription>
            Select how you would like to pay. Payment is completed with our team
            on Telegram.
          </DialogDescription>
        </DialogHeader>

        {product ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((m) => {
                const active = selected === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelected(m.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      active
                        ? "border-primary bg-accent shadow-glow"
                        : "border-border bg-surface hover:border-primary/50"
                    }`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-primary">
                      <m.icon className="size-5 text-primary-foreground" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-semibold">
                        {m.label}
                        {active ? (
                          <Check className="size-4 text-primary" />
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {m.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {selected ? (
              <div className="animate-fade-up space-y-4 rounded-2xl border border-primary/40 bg-gradient-card p-4 shadow-glow">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Payment Method Selected
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us on Telegram to complete your order.
                  </p>
                </div>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Product</dt>
                    <dd className="truncate font-medium">{product.name}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Price</dt>
                    <dd className="font-medium text-primary">
                      ${product.price.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Payment Method</dt>
                    <dd className="font-medium">{selected}</dd>
                  </div>
                </dl>
                <Button asChild size="lg" className="w-full shadow-glow">
                  <a
                    href={telegramCheckoutUrl(product, selected, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="size-4" />
                    Continue on Telegram
                  </a>
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  No payment is processed on this site.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
