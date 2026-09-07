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
  "Gay Porn", "CP Penetration", "Teens", "GAY Babies", "Dad and Son",
  "White Gay", "White Gay Cp E404", "Cp group whith 900 vds", "CP whith 500 vds", "Bro adn Bro",
  "Group Vip", "Darkzadie", "Ivanka and Bro", "Izzy And Bro", "Blackmail",
  "High Shcool Young", "Anxous Panda", "Omgle", "Monkey App", "Savannah",
  "Gay Porno", "Father And Son", "Tens Latina", "Lizzy", "Group vip",
];

const prices = [
  30.99, 30.99, 45.99, 40.99, 45.99, 50.99, 40.50, 45.99, 60.49, 50.99,
  80.59, 75.99, 45.99, 50.49, 34.99, 70.99, 39.99, 42.50, 44.99, 47.99,
  49.99, 54.99, 59.99, 64.99, 79.99,
];

const descriptions = names.map((_, i) =>
  i === 24
    ? "Full forlder."
    : "A complete collection with organized content and regular updates."
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

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const TELEGRAM_USER = "iamhotvendor";
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
