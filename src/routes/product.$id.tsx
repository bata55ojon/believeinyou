import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Lock, Zap, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuy } from "@/components/site/BuyContext";
import { VideoOverlay } from "@/components/site/VideoOverlay";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — HotShop" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — $${product.price.toFixed(2)} | HotShop`;
    const description = product.description.slice(0, 150);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const buy = useBuy();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        to="/"
        hash="collection"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="animate-fade-up">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
            <video
              src={product.video}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`${product.name} cover video`}
              className="aspect-video w-full bg-surface object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground shadow-glow">
              PREMIUM
            </span>
            <VideoOverlay seed={Number(product.id)} />
          </div>
        </div>


        <div className="animate-fade-up space-y-6">
          <div>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-xs font-semibold tracking-widest text-muted-foreground">
              CODE: {product.code}
            </p>
            <p className="mt-3 text-3xl font-extrabold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {[
              { icon: Lock, label: "Secure" },
              { icon: Zap, label: "Instant Access" },
              { icon: Gem, label: "Premium Content" },
            ].map((t) => (
              <li
                key={t.label}
                className="glass-panel flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
              >
                <t.icon className="size-3.5 text-primary" />
                {t.label}
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="h-13 w-full shadow-glow"
            onClick={() => buy(product)}
          >
            Buy Now
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Orders are completed with our team on Telegram. No payment is
            processed on this site.
          </p>
        </div>
      </div>
    </section>
  );
}
