"use client";

import { useTranslations } from "next-intl";

export default function EstimateCard({
  total,
  packageId, // Принимаем packageId
  area,
  selectedOptions,
}) {
  // Подключаем пространства имен для интерфейса чека, пакетов и опций
  const tEstimate = useTranslations("calculator.estimate");
  const tPackages = useTranslations("pricing.packages");
  const tOptions = useTranslations("pricing.options");

  // Функция для плавного перехода к блоку бронирования
  function handleOrderClick() {
    const formElement = document.getElementById("book");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="lg:col-span-2 bg-accent rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-black/60 mb-2">
          {tEstimate("title")}
        </p>
        <p className="font-mono font-black text-5xl lg:text-6xl text-black leading-none mb-2">
          {total} {tEstimate("currencyUnit")}
        </p>
        <p className="text-xs font-bold text-black/70 mb-8">
          {/* ФИКС ТАРИФА: Принудительно переводим packageId в верхний регистр (.toUpperCase()) */}
          {tPackages(`${packageId.toUpperCase()}.title`)} · {area}{" "}
          {tEstimate("areaUnit")}
        </p>

        <p className="text-xs font-black uppercase tracking-wider text-black/60 mb-3">
          {tEstimate("optionsTitle")}
        </p>
        {selectedOptions.length === 0 ? (
          <p className="text-xs font-bold text-black/50">
            {tEstimate("emptyOptions")}
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {selectedOptions.map((o) => (
              <li key={o.id} className="text-xs font-bold text-black/80">
                {/* ФИКС ОПЦИЙ: Принудительно переводим id опции в верхний регистр (.toUpperCase()) */}
                {tOptions(o.id.toUpperCase())}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={handleOrderClick}
        className="w-full mt-8 bg-black text-white font-black text-xs md:text-sm uppercase tracking-wide h-12 rounded-lg transition-all duration-200 hover:bg-neutral-900 active:scale-[0.98] cursor-pointer"
      >
        {tEstimate("orderButton")}
      </button>
    </div>
  );
}
