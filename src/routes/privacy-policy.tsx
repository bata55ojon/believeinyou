import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — HotShop" },
      {
        name: "description",
        content:
          "How HotShop handles your information when you browse products and complete orders on Telegram.",
      },
      { property: "og:title", content: "Privacy Policy — HotShop" },
      {
        property: "og:description",
        content: "How HotShop handles your information.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      intro="Last updated: 2026"
      sections={[
        {
          heading: "Information we collect",
          body: "HotShop does not require an account and does not collect personal data through this website. No payment information is entered or stored here.",
        },
        {
          heading: "Telegram communication",
          body: "When you contact us on Telegram, the messages you send are handled according to Telegram's own privacy policy. We only use what you share to fulfil your order.",
        },
        {
          heading: "Analytics",
          body: "We may collect anonymous usage statistics to improve the store experience. This data is never linked to an individual.",
        },
      ]}
    />
  ),
});
