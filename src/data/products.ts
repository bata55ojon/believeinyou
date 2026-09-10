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
  "CP", "Teens And Pets", "Young teens 9-17", "Rape", "SISTER AND BRO",
  "MOM AND SON", "BLACK CP", "TEENS JAPANESE 7-17", "FULL CO GAY", "INCEST FULL",
  "SNAPGOD", "DARKZADIE", "IVANKA AND BRO", "IZZY AND BROTHER", "BLACKMAIL",
  "HIGH SCHOOL YOUNG", "ANXIOUS PANDA", "OMEGLE", "MONKEY APP", "SAVANNAH",
  "GAY PORN", "FATHER AND SON", "TEENS LATINA", "LIZZY", "GROUP VIP",
];

const prices = [
  35.99, 40.99, 49.99, 55.99, 45.99, 50.99, 60.50, 75.99, 49.49, 24.99,
  50.59, 75.99, 45.99, 50.49, 34.99, 70.99, 39.99, 42.50, 44.99, 47.99,
  49.99, 45.99, 55.99, 64.99, 79.99,
];

const descriptions = names.map((_, i) =>
  i === 0
    ? "CLICK HERE TO SEE A LIST O ALL CP"
    : i === 24
    ? "GROUP VIP FULL VIDEO."
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

// Lista de nomes exclusivos para os subprodutos do primeiro item
const subProductNames = [
  "CP — 1",
  "CP — 2",
  "CP — 3",
  "CP — 4",
  "CP — 5 HD",
  "CP — LESBIAN",
  "CP — BRO AND SIS",
  "CP — SP",
  "CP — MIO PRI",
  "CP — XXX2021",
];

products[0]!.subProducts = Array.from({ length: 10 }, (_, i) => ({
  id: `p1-${i + 1}`,
  code: `p1-${i + 1}`,
  name: subProductNames[i]!,
  price: [35.99, 30.49, 35.99, 30.49, 20.49, 45.99, 15.99, 35.49, 40.99, 30.49][i]!,
  description: `${subProductNames[i]} — item individual ${i + 1} de 10 do Omegle 1.`,
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
