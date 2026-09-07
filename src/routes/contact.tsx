import { createFileRoute } from "@tanstack/react-router";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TELEGRAM_URL, TELEGRAM_USER } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HotShop — Support on Telegram" },
      {
        name: "description",
        content:
          "Need help with a HotShop order? Contact our team on Telegram for fast support and checkout assistance.",
      },
      { property: "og:title", content: "Contact HotShop" },
      {
        property: "og:description",
        content: "Contact the HotShop team on Telegram for support.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
        <MessageCircle className="size-7 text-primary-foreground" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
        Need Help?
      </h1>
      <p className="mt-3 text-muted-foreground">Contact us on Telegram.</p>
      <Button asChild size="lg" className="mt-8 h-12 w-full px-8 shadow-glow sm:w-auto">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
          <Send className="size-4" />
          Contact on Telegram
        </a>
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">@{TELEGRAM_USER}</p>
    </section>
  );
}
