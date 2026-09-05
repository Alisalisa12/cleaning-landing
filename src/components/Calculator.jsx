"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  PACKAGES,
  OPTIONS,
  getBasePrice,
  getOptionsPrice,
} from "@/lib/pricing";
import { useBooking } from "@/contexts/BookingContext";
import PackagePicker from "@/components/calculator/PackagePicker";
import AreaControl from "@/components/calculator/AreaControl";
import OptionsGrid from "@/components/calculator/OptionsGrid";
import EstimateCard from "@/components/calculator/EstimateCard";

export default function Calculator() {
  // Подключаем пространство имен 'calculator' для текстов шапки блока
  const t = useTranslations("calculator");

  const { packageId, setPackageId, area, setArea, options, toggleOption } =
    useBooking();

  const basePrice = useMemo(
    () => getBasePrice(packageId, area || 0),
    [packageId, area],
  );
  const optionsPrice = useMemo(() => getOptionsPrice(options || []), [options]);
  const total = basePrice + optionsPrice;

  const selectedOptions = OPTIONS.filter((o) => options?.includes(o.id));

  return (
    <section
      id="calculator"
      className="relative bg-[#0D0D0D] overflow-hidden select-none font-sans py-6 md:py-10"
    >
      {/* Декоративный фон — уменьшен под мобилки, чтобы не вылезал за границы экрана */}
      <div className="pointer-events-none absolute top-1/3 -left-24 sm:-left-48 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8">
        {/* Шапка блока */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-1.5 text-accent font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-white mb-2 sm:mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium px-2">
            {t("description")}
          </p>
        </div>

        {/* Сетка калькулятора — gap-4 на мобилках экономит место */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Левая панель выбора */}
          <div className="lg:col-span-3 bg-[#121212] border border-neutral-950 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6">
            <PackagePicker
              packages={PACKAGES}
              selectedId={packageId}
              onSelect={setPackageId}
            />

            <AreaControl area={area} onChange={setArea} />

            <OptionsGrid
              options={OPTIONS}
              selected={options || []}
              onToggle={toggleOption}
            />
          </div>

          {/* Правая карточка с чеком стоимости */}
          {/* Изменен пропс packageLabel на packageId для корректного перевода внутри EstimateCard */}
          <EstimateCard
            total={total}
            packageId={packageId}
            area={area}
            selectedOptions={selectedOptions || []}
          />
        </div>
      </div>
    </section>
  );
}
