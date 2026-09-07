import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — HotShop" },
      {
        name: "description",
        content:
          "The terms that apply when you browse HotShop and order premium digital products through Telegram.",
      },
      { property: "og:title", content: "Terms of Service — HotShop" },
      {
        property: "og:description",
        content: "Terms that apply to HotShop orders.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms of Service"
      intro="Last updated: 2026"
      sections={[
        {
          heading: "Digital products",
          body: "All items sold by HotShop are digital files delivered after your order is confirmed. Products are licensed for personal use unless stated otherwise.",
        },
        {
          heading: "Orders",
          body: "This website does not process payments. Selecting a payment method forwards you to our Telegram account, where the order is finalised with our team.",
        },
        {
          heading: "Acceptable use",
          body: "Redistribution, resale or public sharing of purchased files is not permitted and may result in access being revoked.",
        },
      ]}
    />
  ),
});
