import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "ru", "en"],
  defaultLocale: "ka", // грузинский — основной язык рынка
  localePrefix: "always", // всегда /ka, /ru, /en в URL — нужно для hreflang/SEO
});

// Отображаемые названия для переключателя языка (Header)
export const localeNames = {
  ka: { code: "KA", label: "ქართული" },
  ru: { code: "RU", label: "Русский" },
  en: { code: "EN", label: "English" },
};
