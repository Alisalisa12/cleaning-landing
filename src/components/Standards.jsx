"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

// Оставляем только технические данные объектов
const numberedItems = [
  {
    number: "01",
    key: "item_01",
    image: "/images/team.jpg",
  },
  {
    number: "02",
    key: "item_02",
    image: "/images/equipment.jpg",
  },
  {
    number: "03",
    key: "item_03",
    image: "/images/safety.jpg",
  },
];

export default function Standards() {
  // Подключаем переводы секции стандартов
  const t = useTranslations("standards");

  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden select-none font-sans pt-6 pb-6 md:pt-10 md:pb-10">
      {/* Фоновое свечение */}
      <div className="pointer-events-none absolute bottom-1/4 -right-48 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8">
        {/* Шапка блока */}
        <div className="text-center max-w-5xl mx-auto mb-8 md:mb-12">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-white leading-tight">
            {t("section_title_part1")}
            <span className="text-accent">{t("section_title_accent")}</span>
          </h2>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {numberedItems.map((item) => (
            <div
              key={item.number}
              className="group flex flex-col bg-[#121212] border border-neutral-950 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-800"
            >
              {/* Коробка картинки (Пропорции 4:3) */}
              <div className="relative aspect-[4/3] w-full bg-neutral-950 overflow-hidden">
                <Image
                  src={item.image}
                  // Локализованный alt-текст для SEO-доступности
                  alt={t(`${item.key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
              </div>

              {/* Текстовый контейнер */}
              <div className="p-5 sm:p-6 flex flex-col gap-2.5 sm:gap-3">
                <div className="font-mono font-black text-xs md:text-sm text-accent tracking-wider">
                  {item.number}
                </div>

                {/* Динамическое название карточки */}
                <h3 className="font-black text-sm md:text-base text-white tracking-wide uppercase leading-tight">
                  {t(`${item.key}.title`)}
                </h3>

                {/* Динамическое описание */}
                <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed">
                  {t(`${item.key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
