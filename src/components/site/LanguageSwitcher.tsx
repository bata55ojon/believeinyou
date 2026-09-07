import { Globe } from "lucide-react";
import { languages, useI18n, type Lang } from "@/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`glass-panel flex items-center gap-1 rounded-full px-2 py-1 ${className}`}
    >
      <Globe className="size-4 shrink-0 text-primary" aria-hidden />
      <label className="sr-only" htmlFor="lang-select">
        {t("language")}
      </label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="cursor-pointer bg-transparent py-1 pe-1 text-xs font-semibold text-foreground outline-none"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code} className="bg-background">
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
