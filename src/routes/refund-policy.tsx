import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — HotShop" },
      {
        name: "description",
        content:
          "HotShop refund conditions for premium digital products and how to request support on Telegram.",
      },
      { property: "og:title", content: "Refund Policy — HotShop" },
      {
        property: "og:description",
        content: "Refund conditions for HotShop digital products.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      title="Refund Policy"
      intro="Last updated: 2026"
      sections={[
        {
          heading: "Digital delivery",
          body: "Because products are delivered digitally and instantly, orders are generally final once the files have been sent.",
        },
        {
          heading: "When we can help",
          body: "If a file is corrupted, incomplete or does not match its description, contact us on Telegram and we will replace it or arrange a refund.",
        },
        {
          heading: "How to request",
          body: "Message our Telegram account with your product name and order details within 7 days of delivery.",
        },
      ]}
    />
  ),
});
