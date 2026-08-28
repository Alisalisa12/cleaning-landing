"use client";

import { useTranslations } from "next-intl";

export default function OptionsGrid({ options, selected, onToggle }) {
  // Инициализируем словари для интерфейса и названий опций
  const tGrid = useTranslations("calculator.options");
  const tOptions = useTranslations("pricing.options");

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-4">
        {tGrid("title")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={`flex items-center justify-between gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                checked
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/5"
                  : "border-neutral-900 bg-[#0D0D0D] hover:border-neutral-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                    checked ? "bg-accent border-accent" : "border-neutral-700"
                  }`}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </span>
                {/* ФИКС: Приводим ID к верхнему регистру .toUpperCase(), чтобы next-intl точно находил строки из полного JSON */}
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  {tOptions(option.id.toUpperCase())}
                </span>
              </span>
              <span className="font-mono text-xs text-neutral-500 shrink-0">
                +{option.price} ₾
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
