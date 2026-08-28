"use client";

import { useTranslations } from "next-intl";
import { Wrench, Leaf, Users, ShieldCheck } from "lucide-react";

// Оставляем в коде только технические данные (номера, иконки)
const advantagesData = [
  {
    num: "01",
    icon: Wrench,
    key: "item_01",
  },
  {
    num: "02",
    icon: Leaf,
    key: "item_02",
  },
  {
    num: "03",
    icon: Users,
    key: "item_03",
  },
  {
    num: "04",
    icon: ShieldCheck,
    key: "item_04",
  },
];

export default function Advantages() {
  // Подключаем пространство имен 'advantages' из JSON-файлов
  const t = useTranslations("advantages");

  return (
    <section className="relative bg-gradient-to-b from-[#111111] to-[#0D0D0D] w-full select-none font-sans overflow-hidden py-6 md:py-10 border-y border-neutral-900/30">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Сетка карточек преимуществ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {advantagesData.map((item) => (
            <div
              key={item.num}
              className="group bg-[#121212] border border-neutral-950 rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-neutral-800 hover:bg-[#141414]"
            >
              <div>
                <div className="w-full flex items-center justify-between border-b border-neutral-900/60 pb-4 mb-5">
                  <span className="font-mono text-xs text-accent font-black tracking-wider">
                    {item.num}
                  </span>
                  <div className="text-neutral-500 group-hover:text-accent transition-colors duration-300">
                    <item.icon size={16} strokeWidth={2} />
                  </div>
                </div>

                {/* Динамически берем заголовок из словаря по ключу карточки */}
                <h3 className="font-black text-xs md:text-sm text-white tracking-wide uppercase mb-3">
                  {t(`${item.key}.title`)}
                </h3>

                {/* Динамически берем описание из словаря по ключу карточки */}
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
