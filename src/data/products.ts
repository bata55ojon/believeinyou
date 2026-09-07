/**
 * HotShop product catalog — 25 generic digital products.
 *
 * Video files are served from public/videos so the app works on Vercel.
 * Put p1.mp4, p2.mp4, ... p24.mp4 in public/videos/.
 */
export type Product = {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string;
  video: string;
  poster: string;
  subProducts?: Product[];
};

const coverModules = import.meta.glob("@/assets/covers/cover-*.jpg.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const covers = Object.keys(coverModules)
  .sort()
  .map((k) => coverModules[k]!);

const productVideo = (i: number): string =>
  i >= 1 && i <= 24 ? `/videos/p${i}.mp4` : "";

const names = [
  "Digital Pack 1", "Digital Pack 2", "Digital Pack 3", "Digital Pack 4", "Digital Pack 5",
  "Digital Pack 6", "Digital Pack 7", "Digital Pack 8", "Digital Pack 9", "Digital Pack 10",
  "Digital Pack 11", "Digital Pack 12", "Digital Pack 13", "Digital Pack 14", "Digital Pack 15",
  "Digital Pack 16", "Digital Pack 17", "Digital Pack 18", "Digital Pack 19", "Digital Pack 20",
  "Digital Pack 21", "Digital Pack 22", "Digital Pack 23", "Digital Pack 24", "VIP Digital Bundle",
];

const prices = [
  75.99, 50.99, 120.99, 55.99, 45.99, 50.99, 60.50, 75.99, 49.49, 24.99,
  80.59, 75.99, 45.99, 50.49, 34.99, 70.99, 39.99, 42.50, 44.99, 47.99,
  49.99, 54.99, 59.99, 64.99, 79.99,
];

const descriptions = names.map((_, i) =>
  i === 24
    ? "A complete VIP digital bundle."
    : "A digital collection with organized content and regular updates."
);

export const products: Product[] = names.map((name, i) => ({
  id: `p${i + 1}`,
  code: `p${i + 1}`,
  name,
  price: prices[i]!,
  description: descriptions[i]!,
  video: productVideo(i + 1),
  poster: covers[i] ?? "",
}));

products[0]!.subProducts = Array.from({ length: 10 }, (_, i) => ({
  id: `p1-${i + 1}`,
  code: `p1-${i + 1}`,
  name: `Digital Pack 1-${i + 1}`,
  price: [35.99, 30.49, 35.99, 30.49, 50.49, 45.99, 45.99, 35.49, 40.99, 90.49][i]!,
  description: `Part of Digital Pack 1 — individual item ${i + 1} of 10.`,
  video: products[0]!.video,
  poster: products[0]!.poster,
}));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const TELEGRAM_USER = "megastuffrs";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USER}`;

export const telegramCheckoutUrl = (
  product: Product,
  method: string,
  lang: "en" | "pt" | "ar" = "en",
): string => {
  const price = `$${product.price.toFixed(2)}`;
  const ref = `[${product.code}] ${product.name}`;
  const texts: Record<"en" | "pt" | "ar", string> = {
    en: `Hello, I want to buy ${ref} for ${price}. Payment method: ${method}.`,
    pt: `Olá, quero comprar ${ref} por ${price}. Método de pagamento: ${method}.`,
    ar: `مرحبًا، أريد شراء ${ref} بسعر ${price}. طريقة الدفع: ${method}.`,
  };
  return `${TELEGRAM_URL}?text=${encodeURIComponent(texts[lang] ?? texts.en)}`;
};
