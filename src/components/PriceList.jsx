"use client";


import { useTranslations } from "next-intl"; 
import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/pricing";
import { useBooking } from "@/contexts/BookingContext";

const tableAreas = [30, 50, 60, 70, 80, 100, 150];
const tablePackages = PACKAGES.filter((p) => p.points !== null);

function priceAt(points, area) {
  const found = points.find(([a]) => a === area);
  return found ? found[1] : null;
}

export default function PriceList() {
  // Подключаем пространства имен для интерфейса прайс-листа и тарифов
  const tPL = useTranslations("pricelist");
  const tPackages = useTranslations("pricing.packages");

  const { packageId, selectPackageAndGo } = useBooking();

  return (
    <section className="relative bg-gradient-to-b from-[#111111] to-[#0D0D0D] overflow-hidden select-none font-sans py-6 md:py-10 border-y border-neutral-900/30">
      <div className="pointer-events-none absolute top-1/2 -right-24 sm:-right-48 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8">
        
        {/* Шапка блока */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-1.5 text-accent font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{tPL("badge")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-white mb-2 sm:mb-4 leading-tight">
            {tPL("title_part1")}<span className="text-accent">{tPL("title_accent")}</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-xl mx-auto px-2">
            {tPL("description")}
          </p>
        </div>

        {/* Сетка тарифов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {tablePackages.map((pkg) => {
            const minPrice = pkg.points?.[0]?.[1] ?? 0;
            const isSelected = packageId === pkg.id;

            // Считываем массив фич для конкретного пакета из JSON-файла перевода
            const featuresCount = 3; // у нас заложено по 3 фичи в каждом массиве
            const features = Array.from({ length: featuresCount }, (_, i) => 
              tPackages(`${pkg.id.toUpperCase()}.features.${i}`)
            );

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl border p-5 sm:p-6 lg:p-8 transition-all duration-300 ${
                  isSelected
                    ? "border-accent bg-[#121212] shadow-xl shadow-accent/10 z-10 scale-[1.01]"
                    : "border-neutral-800 bg-[#161616] hover:border-accent/30 hover:bg-[#1a1a1a] hover:shadow-xl hover:shadow-accent/[0.02]"
                }`}
              >
                {/* Бейдж «Популярный выбор» */}
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-1 sm:px-4 sm:py-1.5 rounded-full whitespace-nowrap shadow-md">
                    {tPL("popularBadge")}
                  </span>
                )}

                {/* Название пакета, приведенное к верхнему регистру для соответствия JSON */}
                <h3 className="font-black text-sm sm:text-base md:text-lg uppercase tracking-wide text-white mb-1 mt-1 sm:mt-0">
                  {tPackages(`${pkg.id.toUpperCase()}.title`)}
                </h3>

                <div className="flex items-baseline gap-1.5 mt-1 sm:mt-2 mb-4 sm:mb-6">
                  <span className="text-neutral-500 text-[10px] sm:text-xs font-medium uppercase">
                    {tPL("priceFrom")}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-white">
                    {minPrice} ₾
                  </span>
                </div>

                <div className="w-full h-px bg-neutral-900/60 mb-4 sm:mb-6" />

                {/* Переведенный список фич */}
                <ul className="flex flex-col gap-2.5 mb-6 sm:mb-8 flex-1">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs md:text-sm text-neutral-400 font-medium leading-normal"
                    >
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Выпадающий список цен по м² (с фиксом скролла под iOS Safari) */}
                <details className="group mb-5 sm:mb-6 border border-neutral-900 rounded-xl overflow-hidden transition-all duration-200">
                  <summary className="list-none flex items-center justify-between p-3 text-[11px] sm:text-xs font-black uppercase text-neutral-400 tracking-wider cursor-pointer hover:bg-neutral-900/40 select-none">
                    <span>{tPL("showMeters")}</span>
                    <span className="text-accent transition-transform duration-200 group-open:rotate-180 text-xs">
                      ↓
                    </span>
                  </summary>
                  <div className="p-3 bg-neutral-950/40 border-t border-neutral-900/60 flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar [-webkit-overflow-scrolling:touch]">
                    {tableAreas.map((areaVal) => (
                      <div
                        key={areaVal}
                        className="flex items-center justify-between text-xs py-0.5"
                      >
                        <span className="text-neutral-500 font-medium">
                          {areaVal} {tPL("unitArea")}
                        </span>
                        <span className="font-mono font-bold text-neutral-300">
                          {priceAt(pkg.points, areaVal)} ₾
                        </span>
                      </div>
                    ))}
                  </div>
                </details>

                <button
                  type="button"
                  onClick={() => selectPackageAndGo(pkg.id)}
                  className={`w-full h-12 rounded-xl font-black text-xs md:text-sm uppercase tracking-wide transition-all duration-200 active:scale-[0.98] flex items-center justify-center text-center whitespace-nowrap select-none cursor-pointer ${
                    isSelected
                      ? "bg-accent border border-transparent text-black hover:bg-accent/90 shadow-md shadow-accent/5"
                      : "bg-transparent border border-accent text-white hover:bg-accent/[0.03] hover:border-accent/80"
                  }`}
                >
                  {tPL("selectButton")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}