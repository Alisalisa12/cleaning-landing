"use client";

import { useTranslations } from "next-intl";
import { MIN_AREA, MAX_AREA } from "@/lib/pricing";

export default function AreaControl({ area, onChange }) {
  // Подключаем переводы для блока управления площадью
  const t = useTranslations("calculator.area");

  function handleSliderChange(e) {
    onChange(Number(e.target.value));
  }

  // Свободный ввод: не режем значение, разрешаем и меньше 30, и больше 300
  function handleInputChange(e) {
    const raw = e.target.value.replace(/\D/g, "");
    onChange(raw === "" ? 0 : Number(raw));
  }

  // Слайдер физически ограничен диапазоном — просто зажимаем для его позиции
  const sliderValue = Math.min(MAX_AREA, Math.max(MIN_AREA, area || MIN_AREA));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 gap-4">
        <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
          {t("label")}
        </p>

        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="text"
            inputMode="numeric"
            value={area}
            onChange={handleInputChange}
            className="w-16 bg-[#0D0D0D] border border-neutral-800 focus:border-accent outline-none rounded-lg px-2 py-1.5 font-mono font-black text-sm text-accent text-right transition-colors"
          />
          <span className="font-mono font-black text-sm text-accent">
            {t("unit")}
          </span>
        </div>
      </div>

      <input
        type="range"
        min={MIN_AREA}
        max={MAX_AREA}
        step={5}
        value={sliderValue}
        onChange={handleSliderChange}
        className="w-full h-2 rounded-full bg-neutral-900 accent-accent cursor-pointer mb-1"
      />
      <div className="flex justify-between text-xs text-neutral-600 font-medium">
        <span>
          {MIN_AREA} {t("minLimit")}
        </span>
        <span>
          {MAX_AREA} {t("maxLimit")}
        </span>
      </div>
    </div>
  );
}
