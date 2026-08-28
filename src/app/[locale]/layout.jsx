import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// SEO: title/description на каждом языке + hreflang alternates на все версии.
const seoByLocale = {
  ka: {
    title: "Cleaning Technology — პროფესიონალური დასუფთავება თბილისში",
    description:
      "პროფესიონალური კლინინგი თბილისში. გამოცდილი გუნდი, Karcher-ის აღჭურვილობა, ფიქსირებული ფასი ხელშეკრულებით.",
  },
  ru: {
    title: "Cleaning Technology — Профессиональная чистота в Тбилиси",
    description:
      "Комплексные решения для идеальной чистоты. Клининговые услуги в Тбилиси.",
  },
  en: {
    title: "Cleaning Technology — professional cleaning in Tbilisi",
    description:
      "Professional cleaning services in Tbilisi. Experienced team, Karcher equipment, fixed price by contract.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const seo = seoByLocale[locale] || seoByLocale.ka;
  const baseUrl = "https://your-domain.ge"; // заменить на реальный домен перед деплоем

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ka: `${baseUrl}/ka`,
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
