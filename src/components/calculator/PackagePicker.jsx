"use client";

import { useTranslations } from "next-intl";

export default function PackagePicker({ packages, selectedId, onSelect }) {
  const tPicker = useTranslations("calculator.packages");
  const tPackages = useTranslations("pricing.packages");

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-4">
        {tPicker("title")}
      </p>
      {/* ВОЗВРАЩЕНО: Ваша оригинальная сетка строго в две колонки */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => onSelect(pkg.id)}
            className={`text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
              selectedId === pkg.id
                ? "border-accent bg-accent/10"
                : "border-neutral-900 bg-[#0D0D0D] hover:border-neutral-800"
            }`}
          >
            {/* ФИКС ПЕРЕВОДА: Приводим ID к верхнему регистру */}
            <p
              className={`font-black text-xs uppercase tracking-wide mb-1 ${
                selectedId === pkg.id ? "text-accent" : "text-white"
              }`}
            >
              {tPackages(`${pkg.id.toUpperCase()}.title`)}
            </p>
            <p className="text-xs text-neutral-500 font-medium">
              {tPackages(`${pkg.id.toUpperCase()}.hint`)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
