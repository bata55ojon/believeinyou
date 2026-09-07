import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";

// Toasts are always in English, regardless of the selected site language.
const buyers = [
  "Mark Gulo",
  "James Carter",
  "Olivia Bennett",
  "Daniel Foster",
  "Sophia Reed",
  "Liam Walker",
  "Emma Hayes",
  "Noah Brooks",
  "Ava Morgan",
  "Ethan Price",
  "Chloe Turner",
  "Lucas Bailey",
  "Grace Sullivan",
  "Ryan Mitchell",
  "Isabella Ward",
  "Nathan Cole",
];

const locations = [
  "London",
  "New York",
  "Toronto",
  "Dubai",
  "Sydney",
  "Manchester",
  "Chicago",
  "Dublin",
];

const makeMessage = (name: string) => {
  const buyer = buyers[Math.floor(Math.random() * buyers.length)]!;
  const city = locations[Math.floor(Math.random() * locations.length)]!;
  return `${buyer} bought ${name} · ${city}`;
};

export function PurchaseNotifications() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      const product = products[Math.floor(Math.random() * products.length)]!;
      setMessage(makeMessage(product.name));
      // Toast stays visible for a random 10–15 s to feel natural.
      hideTimer = setTimeout(
        () => setMessage(null),
        10000 + Math.floor(Math.random() * 5000)
      );
    };

    const first = setTimeout(show, 3000);
    const interval = setInterval(show, 5000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!message) return null;

  return (
    <div
      aria-live="polite"
      dir="ltr"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm"
    >
      <div className="animate-slide-in-notify glass-panel flex items-start gap-3 rounded-2xl p-3 shadow-glow">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-primary">
          <ShoppingCart className="size-4 text-primary-foreground" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{message}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Verified purchase · just now
          </p>
        </div>
      </div>
    </div>
  );
}
