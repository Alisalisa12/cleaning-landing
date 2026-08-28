"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "@/contexts/BookingContext";

export default function SuccessMessage({ name, phone, onReset }) {
  // Подключаем словарь с пространством имен для экрана успешной отправки формы
  const t = useTranslations("form.success");
  const { total } = useBooking();

  return (
    <section
      id="book"
      className="relative bg-[#0D0D0D] overflow-hidden font-sans border-t border-neutral-900 pt-4 pb-12 sm:pt-6 sm:pb-20 md:pt-8 md:pb-28"
    >
      <div className="relative max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className="bg-[#121212] border border-accent/20 rounded-2xl p-5 sm:p-8 md:p-12 text-center shadow-2xl">
          {/* Чекбокс-иконка */}
          <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-scaleIn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          {/* Информационный бэдж */}
          <p className="text-accent font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 sm:mb-4">
            {t("badge")}
          </p>

          {/* Заголовок с подстановкой имени клиента */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 sm:mb-4 px-2 leading-tight">
            {t("thanks", { name })}
          </h2>

          {/* Описание заказа с подстановкой цены, стилизованной под моноширинный шрифт */}
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto px-1">
            {t.rich("description", {
              total: () => (
                <span className="text-accent font-mono font-bold">{total}</span>
              ),
              phone: () => (
                <span className="text-white font-bold whitespace-nowrap">
                  {phone}
                </span>
              ),
            })}
          </p>

          {/* Кнопка сброса */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 py-2 text-[11px] sm:text-xs font-black uppercase tracking-widest text-accent hover:text-accent/80 active:scale-95 transition-all select-none mx-auto group cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span>{t("resetButton")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
