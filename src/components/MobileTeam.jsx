"use client";

import { useTranslations } from "next-intl";
import { Wrench, FlaskConical, Sparkles } from "lucide-react";
import Image from "next/image";

// Оставляем в коде исключительно статичную конфигурацию
const mobileItemsConfig = [
  {
    id: "equipment",
    icon: Wrench,
  },
  {
    id: "chemicals",
    icon: FlaskConical,
  },
  {
    id: "inventory",
    icon: Sparkles,
  },
];

export default function MobileTeam() {
  // Инициализируем пространство имен 'mobile_team'
  const t = useTranslations("mobile_team");

  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden select-none font-sans pt-4 pb-4 md:pt-6 md:pb-6">
      {/* Боковое премиальное свечение */}
      <div className="pointer-events-none absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full px-4 md:px-8">
        {/* Шапка блока — текст полностью переведен и очищен от опечаток */}
        <div className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-accent font-black text-xs tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white mb-4">
            {t("title")}
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Панорамный кино-кадр */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.1/1] rounded-2xl overflow-hidden shadow-2xl border border-neutral-900 group mb-6 md:mb-8">
          <Image
            src="/images/mobile-station.png"
            // Передаем качественный alt-текст для SEO-доступности картинок
            alt={t("title")}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/40 pointer-events-none" />
        </div>

        {/* Сетка карточек по правилу 4/8 (Завязана на id объектов из конфига) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {mobileItemsConfig.map((item) => (
            <div
              key={item.id}
              className="bg-[#121212] border border-neutral-950 rounded-2xl p-6 lg:p-8 flex flex-col transition-all duration-300 hover:border-neutral-800"
            >
              <div className="text-accent mb-6">
                <item.icon size={24} strokeWidth={2} />
              </div>

              {/* Чтение заголовка карточки из JSON */}
              <h3 className="font-black text-xs md:text-sm text-white tracking-wide uppercase mb-3">
                {t(`items.${item.id}.title`)}
              </h3>

              {/* Чтение описания карточки из JSON */}
              <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed">
                {t(`items.${item.id}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
