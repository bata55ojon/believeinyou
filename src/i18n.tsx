import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "pt" | "ar";

export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

const dict = {
  en: {
    home: "Home",
    products: "Products",
    contact: "Contact",
    viewCollection: "View Collection",
    heroBadge: "25 premium drops available now",
    heroTitle: "Premium Digital Content",
    heroSubtitle:
      "Discover our exclusive collection of premium digital products.",
    secure: "Secure",
    instant: "Instant Access",
    premium: "Premium Content",
    ourProducts: "Our Products",
    ourProductsSub: "Choose your premium digital product — all 25 in one place.",
    searchPlaceholder: "Search products...",
    noResults: "We don't have that pack — but we have better ones:",
    buyNow: "Buy Now",
    ctaTitle: "Ready to get started?",
    ctaText:
      "Choose your favorite premium product and contact us to complete your order.",
    featFastTitle: "Fast",
    featFastText: "Quick access after completing your order.",
    featSecureText: "Secure and private checkout experience.",
    featPremiumTitle: "Premium",
    featPremiumText: "High-quality digital products.",
    featMobileTitle: "Mobile Friendly",
    featMobileText: "Access from any device.",
    language: "Language",
  },
  pt: {
    home: "Início",
    products: "Produtos",
    contact: "Contacto",
    viewCollection: "Ver Coleção",
    heroBadge: "25 lançamentos premium disponíveis agora",
    heroTitle: "Conteúdo Digital Premium",
    heroSubtitle:
      "Descubra a nossa coleção exclusiva de produtos digitais premium.",
    secure: "Seguro",
    instant: "Acesso Imediato",
    premium: "Conteúdo Premium",
    ourProducts: "Os Nossos Produtos",
    ourProductsSub:
      "Escolha o seu produto digital premium — os 25 num só lugar.",
    searchPlaceholder: "Pesquisar produtos...",
    noResults: "Não temos essa pasta — mas temos umas melhores:",
    buyNow: "Comprar",
    ctaTitle: "Pronto para começar?",
    ctaText:
      "Escolha o seu produto premium favorito e fale connosco para concluir o pedido.",
    featFastTitle: "Rápido",
    featFastText: "Acesso rápido após concluir o pedido.",
    featSecureText: "Checkout seguro e privado.",
    featPremiumTitle: "Premium",
    featPremiumText: "Produtos digitais de alta qualidade.",
    featMobileTitle: "Compatível com Telemóvel",
    featMobileText: "Aceda a partir de qualquer dispositivo.",
    language: "Idioma",
  },
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    contact: "اتصل بنا",
    viewCollection: "عرض المجموعة",
    heroBadge: "٢٥ إصدارًا مميزًا متاح الآن",
    heroTitle: "محتوى رقمي مميز",
    heroSubtitle: "اكتشف مجموعتنا الحصرية من المنتجات الرقمية المميزة.",
    secure: "آمن",
    instant: "وصول فوري",
    premium: "محتوى مميز",
    ourProducts: "منتجاتنا",
    ourProductsSub: "اختر منتجك الرقمي المميز — كل الـ ٢٥ في مكان واحد.",
    searchPlaceholder: "ابحث عن المنتجات...",
    noResults: "ليس لدينا هذه الحزمة — لكن لدينا أفضل منها:",
    buyNow: "اشترِ الآن",
    ctaTitle: "هل أنت مستعد للبدء؟",
    ctaText: "اختر منتجك المميز وتواصل معنا لإتمام الطلب.",
    featFastTitle: "سريع",
    featFastText: "وصول سريع بعد إتمام الطلب.",
    featSecureText: "تجربة دفع آمنة وخاصة.",
    featPremiumTitle: "مميز",
    featPremiumText: "منتجات رقمية عالية الجودة.",
    featMobileTitle: "متوافق مع الجوال",
    featMobileText: "الوصول من أي جهاز.",
    language: "اللغة",
  },
} as const;

export type TKey = keyof (typeof dict)["en"];

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => dict.en[k] });

const STORAGE_KEY = "hotshop-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in dict) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (l: Lang) => {
        setLangState(l);
        localStorage.setItem(STORAGE_KEY, l);
      },
      t: (k: TKey) => dict[lang][k] ?? dict.en[k],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
