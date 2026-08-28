import { formatGeorgianPhone, PHONE_PREFIX } from "@/lib/phoneMask";

export default function PhoneInput({ value, onChange, hasError }) {
  function handleChange(e) {
    onChange(formatGeorgianPhone(e.target.value));
  }

  function handleKeyDown(e) {
    if (e.key === "Backspace" && value === PHONE_PREFIX) {
      e.preventDefault();
    }
  }

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="+995 5XX XX-XX-XX"
      /* text-base (16px) на мобильных отключает автозум в iOS. md:text-sm возвращает 14px на компьютерах. */
      /* Добавлена динамическая смена цвета рамки при ошибке */
      className={`w-full h-12 bg-[#0D0D0D] border ${
        hasError
          ? "border-red-500/60 focus:border-red-500"
          : "border-neutral-800 focus:border-accent"
      } text-white placeholder:text-neutral-700 outline-none rounded-xl px-4 text-base md:text-sm font-medium transition-all duration-200 focus:shadow-md focus:shadow-accent/5 selection:bg-accent/20`}
    />
  );
}
