"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    /* ВЕРНУЛИ ЛИНИЮ: border-t аккуратно отделяет футер от формы бронирования */
    /* Адаптивные отступы py-8 sm:py-12 создают правильный баланс воздуха со всех сторон */
    <footer className="relative bg-[#0D0D0D] border-t border-neutral-900 font-sans py-8 sm:py-12">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Блок логотипа и названия */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Cleaning Technology Logo"
              width={36}
              height={36}
              className="rounded-xl w-9 h-9 object-contain"
            />
            <div className="leading-tight text-center sm:text-left">
              <p className="font-black text-sm tracking-wide text-white">
                {t("brand")}
              </p>
              <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-1">
                {t("tagline")}
              </p>
            </div>
          </div>

          {/* Блок контактов */}
          <div className="flex flex-col sm:items-end items-center gap-1.5">
            <a
              href="tel:+995595779997"
              className="flex items-center gap-2 text-sm md:text-base font-black text-white hover:text-accent transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-accent transition-transform duration-200 group-hover:scale-110"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t("phone")}</span>
            </a>
          </div>
        </div>

        {/* Нижняя строчка с копирайтом */}
        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-600 font-medium tracking-wide">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
            {t("location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
