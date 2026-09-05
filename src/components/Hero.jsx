"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShieldCheck, Sparkles, Clock, Handshake } from "lucide-react";

export default function Hero() {
  // Подключаем пространство имен 'hero' для перевода интерфейса
  const t = useTranslations("hero");

  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden flex items-start select-none font-sans px-4 sm:px-8 md:px-12">
      <div className="pointer-events-none absolute top-1/4 -left-48 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      {/* ФИКС СЕТКИ: Контент плотно собран к центру */}
      <div className="relative max-w-6xl mx-auto w-full pt-6 md:pt-10 lg:pt-12 pb-12 md:pb-16 flex justify-center">
        <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-12 xl:gap-16 w-full">
          {/* Левая колонка — Текстовый контент */}
          <div className="flex flex-col justify-center w-full lg:max-w-[480px] xl:max-w-[520px] shrink-0">
            {/* Строка локации */}
            <div className="flex items-center gap-2 text-accent font-black text-xs tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{t("location")}</span>
            </div>

            {/* Заголовок (Исправлен баг адаптивности: заменен lg:text-4xl на lg:text-5xl) */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-5xl font-black leading-[1.1] tracking-tight text-white mb-5">
              {t("titlePart1")}
              <span className="text-accent">{t("titleAccent")}</span>
              {t("titlePart2")}
            </h1>

            {/* Описание лендинга */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              {t("description")}
            </p>

            <div className="w-full h-px bg-neutral-900 my-6" />

            {/* ПРЕИМУЩЕСТВА (Вынос захардкоженного текста в систему локализации next-intl) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 mb-8 w-full">
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="text-accent mb-0.5">
                  <ShieldCheck size={24} strokeWidth={2} />
                </div>
                <span className="font-black text-xs md:text-sm text-white tracking-wide uppercase">
                  {t("benefits.reliable_title")}
                </span>
                <p className="text-xs text-neutral-400 font-medium leading-tight max-w-[130px]">
                  {t("benefits.reliable_desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="text-accent mb-0.5">
                  <Sparkles size={24} strokeWidth={2} />
                </div>
                <span className="font-black text-xs md:text-sm text-white tracking-wide uppercase">
                  {t("benefits.clean_title")}
                </span>
                <p className="text-xs text-neutral-400 font-medium leading-tight max-w-[130px]">
                  {t("benefits.clean_desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="text-accent mb-0.5">
                  <Clock size={24} strokeWidth={2} />
                </div>
                <span className="font-black text-xs md:text-sm text-white tracking-wide uppercase">
                  {t("benefits.fast_title")}
                </span>
                <p className="text-xs text-neutral-400 font-medium leading-tight max-w-[130px]">
                  {t("benefits.fast_desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="text-accent mb-0.5">
                  <Handshake size={24} strokeWidth={2} />
                </div>
                <span className="font-black text-xs md:text-sm text-white tracking-wide uppercase">
                  {t("benefits.safe_title")}
                </span>
                <p className="text-xs text-neutral-400 font-medium leading-tight max-w-[130px]">
                  {t("benefits.safe_desc")}
                </p>
              </div>
            </div>

            {/* КОМПЛЕКТ КНОПОК */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-56 bg-accent border border-transparent text-black font-black text-xs md:text-sm h-12 rounded-lg transition-all duration-200 hover:bg-accent/90 active:scale-[0.98] flex items-center justify-center text-center whitespace-nowrap shadow-md shadow-accent/5 cursor-pointer"
              >
                <span>{t("ctaCalc")}</span>
              </button>

              <a
                href="tel:+995595779997"
                className="w-full sm:w-56 flex items-center justify-center gap-2.5 text-white bg-transparent border border-accent hover:border-accent/80 hover:bg-accent/[0.04] font-black text-xs md:text-sm h-12 rounded-lg transition-all duration-200 active:scale-[0.98] text-center whitespace-nowrap group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-4 h-4 text-accent transition-transform duration-200 group-hover:scale-105"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6 l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{t("ctaCall")}</span>
              </a>
            </div>
          </div>

          {/* Правая колонка — Фото пылесоса/оборудования */}
          <div className="w-full relative lg:w-[420px] xl:w-[460px] rounded-2xl overflow-hidden bg-[#121212] border border-neutral-900 shadow-2xl group/img hidden lg:block shrink-0">
            <Image
              src="/images/image.jpg"
              alt="Премиальный клининг"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              priority
              className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
