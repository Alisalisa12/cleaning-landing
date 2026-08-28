"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames } from "@/i18n/routing";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Переключение языка: остаёмся на том же пути, меняем только префикс локали
  function switchLocale(nextLocale) {
    router.replace(pathname, { locale: nextLocale });
    setIsLangOpen(false);
  }

  return (
    <header className="w-full font-sans selection:bg-accent selection:text-black">
      {/* 1. Верхний информационный тапбар */}
      <div className="bg-accent text-black text-[11px] md:text-xs w-full font-bold tracking-wide relative z-50 uppercase">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-center gap-2 text-center">
          <Image
            src="/images/at-icons--lightning-bolt.svg"
            alt=""
            width={14}
            height={14}
          />
          <span>{t("topBar")}</span>
        </div>
      </div>

      {/* 2. Основная шапка */}
      <div className="bg-[#0D0D0D] border-b border-neutral-900 w-full sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* ЛОГОТИП */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/logo.svg"
              alt="Cleaning Technology"
              width={40}
              height={40}
              className="w-9 h-9 md:w-11 md:h-11 object-cover rounded-xl"
            />
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-black text-sm md:text-base tracking-tight text-white transition-colors group-hover:text-accent">
                {t("brand")}
              </span>
              <span className="text-[9px] md:text-[10px] text-neutral-500 font-bold tracking-widest uppercase hidden sm:block mt-0.5">
                {t("tagline")}
              </span>
            </div>
          </a>

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="flex items-center gap-6 md:gap-8 shrink-0">
            {/* ТЕЛЕФОН */}
            <a
              href="tel:+995595779997"
              className="hidden md:flex items-center gap-2 text-sm font-extrabold tracking-wide text-white hover:text-accent transition-colors duration-150 h-12 group/phone"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-accent transition-transform duration-200 group-hover/phone:scale-110"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t("phone")}</span>
            </a>

            {/* ЯЗЫК: переключатель, ведущий на /ka, /ru, /en */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                aria-label={t("langLabel")}
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-transparent h-12 transition-all duration-150 cursor-pointer text-white hover:text-accent text-xs font-black tracking-wider group/lang select-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-accent transition-transform duration-200 group-hover/lang:scale-110"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>{localeNames[locale].code}</span>
                <span
                  className={`text-neutral-500 transition-transform duration-200 ${
                    isLangOpen ? "rotate-180 text-accent" : ""
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#0D0D0D] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[140px] animate-fadeIn">
                  {routing.locales.map((code) => (
                    <div
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`px-4 py-3 text-xs font-bold cursor-pointer transition-colors select-none flex items-center justify-between gap-3 ${
                        code === locale
                          ? "text-accent bg-neutral-900/60"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      }`}
                    >
                      <span>{localeNames[code].label}</span>
                      <span className="text-neutral-600 font-mono text-[10px]">
                        {localeNames[code].code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
