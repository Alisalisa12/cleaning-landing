"use client";

import { useEffect, useRef, useState } from "react";
// Импортируем хук переводов для динамического чтения названий тарифов из JSON
import { useTranslations } from "next-intl";

export default function PackageSelect({ packages, value, onChange }) {
  // Инициализируем словарь с пространством имен для тарифов клининга
  const tPackages = useTranslations("pricing.packages");

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    // Добавили touchstart для мгновенного закрытия по тапу мимо на смартфонах
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const current = packages.find((p) => p.id === value) || packages[0];

  return (
    <div className="relative w-full" ref={ref}>
      {/* Кнопка открытия */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        /* text-base на мобильных убирает зум в iOS, md:text-sm возвращает исходный размер на ПК */
        className={`w-full h-12 bg-[#0D0D0D] border ${
          isOpen
            ? "border-accent shadow-md shadow-accent/5"
            : "border-neutral-800"
        } text-white rounded-xl px-4 text-base md:text-sm font-medium flex items-center justify-between cursor-pointer transition-all duration-200 select-none active:bg-neutral-900/40`}
      >
        {/* ФИКС: Читаем переведенное название активного тарифа по его ID в верхнем регистре */}
        <span>{tPackages(`${current.id.toUpperCase()}.title`)}</span>
        <span
          className={`text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
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
      </div>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0D0D0D] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl z-50 animate-fadeIn">
          {/* max-h-48 на мобильных, чтобы список не перекрывал весь экран телефона */}
          <div className="max-h-48 sm:max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => {
                  onChange(pkg.id);
                  setIsOpen(false);
                }}
                /* py-3.5 увеличивает область тапа (Touch Target), чтобы было легко попадать пальцем */
                className={`px-4 py-3.5 md:py-3 text-base md:text-sm font-medium cursor-pointer transition-colors select-none ${
                  pkg.id === value
                    ? "text-accent bg-neutral-900/60"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900 active:bg-neutral-900"
                }`}
              >
                {/* ФИКС: Читаем переведенное название каждого тарифа в списке по ID в верхнем регистре */}
                {tPackages(`${pkg.id.toUpperCase()}.title`)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
