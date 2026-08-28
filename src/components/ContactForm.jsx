"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PACKAGES, MIN_AREA } from "@/lib/pricing";
import { PHONE_PREFIX, isPhoneComplete } from "@/lib/phoneMask";
import { useBooking } from "@/contexts/BookingContext";
import Field from "@/components/contact-form/Field";
import PhoneInput from "@/components/contact-form/PhoneInput";
import PackageSelect from "@/components/contact-form/PackageSelect";
import SuccessMessage from "@/components/contact-form/SuccessMessage";

export default function ContactForm() {
  // Подключаем пространства имен для текстовых меток формы и названий опций
  const t = useTranslations("form");
  const tOptions = useTranslations("pricing.options");

  const {
    packageId,
    setPackageId,
    area,
    setArea,
    options,
    total,
    selectedOptionsDetails,
    setOptions,
    toggleOption,
  } = useBooking();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleAreaChange(e) {
    const raw = e.target.value.replace(/\D/g, "");
    setArea(raw === "" ? "" : Number(raw));
  }

  function handleAreaBlur() {
    if (area === "" || isNaN(area) || area <= 0) {
      setArea(MIN_AREA);
    }
  }

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("errorNameEmpty");
    } else if (name.trim().length < 2) {
      newErrors.name = t("errorNameShort");
    }

    if (!isPhoneComplete(phone)) {
      newErrors.phone = t("errorPhoneInvalid");
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    // ФИКС БАГА: Исправлен невалидный синтаксис Object.keys
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    console.log("Заявка:", {
      name: name.trim(),
      phone: phone.trim(),
      packageId,
      area,
      options: options,
      totalPrice: total,
    });

    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setName("");
    setPhone(PHONE_PREFIX);
    setOptions([]);
    setErrors({});
  }

  if (submitted) {
    return <SuccessMessage name={name} phone={phone} onReset={handleReset} />;
  }

  return (
    <section
      id="book"
      className="relative bg-[#0D0D0D] overflow-hidden font-sans py-6 md:py-10"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[800px] h-[280px] sm:h-[400px] bg-accent/[0.02] rounded-full blur-[80px] sm:blur-[140px]" />

      <div className="relative max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className="bg-[#121212] border border-neutral-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-5 sm:mb-6">
            <div className="flex items-center justify-center gap-1.5 text-accent font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{t("badge")}</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-3xl font-black tracking-tight uppercase text-white mb-1.5 sm:mb-2 leading-tight">
              {t("title")}
            </h2>
            <p className="text-neutral-400 text-[11px] sm:text-xs md:text-sm font-medium max-w-md mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Field label={t("labelName")}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder={t("placeholderName")}
                  className={`w-full h-12 bg-[#0D0D0D] border ${
                    errors.name
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-neutral-800 focus:border-accent"
                  } text-white placeholder:text-neutral-700 outline-none rounded-xl px-4 text-base md:text-sm font-medium transition-all duration-200 focus:shadow-md focus:shadow-accent/5`}
                />
                {errors.name && (
                  <span className="text-red-400 text-[11px] font-bold mt-1.5 block">
                    {errors.name}
                  </span>
                )}
              </Field>

              <Field label={t("labelPhone")}>
                <PhoneInput
                  value={phone}
                  onChange={(val) => {
                    setPhone(val);
                    if (errors.phone)
                      setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  hasError={!!errors.phone}
                />
                {errors.phone && (
                  <span className="text-red-400 text-[11px] font-bold mt-1.5 block">
                    {errors.phone}
                  </span>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Field label={t("labelType")}>
                <PackageSelect
                  packages={PACKAGES}
                  value={packageId}
                  onChange={setPackageId}
                />
              </Field>

              <Field label={t("labelArea")}>
                <div className="relative w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={area}
                    onChange={handleAreaChange}
                    onBlur={handleAreaBlur}
                    placeholder={`${MIN_AREA}+`}
                    className="w-full h-12 bg-[#0D0D0D] border border-neutral-800 focus:border-accent text-white placeholder:text-neutral-700 outline-none rounded-xl px-4 text-base md:text-sm font-medium transition-all duration-200 focus:shadow-md focus:shadow-accent/5 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 font-bold text-xs uppercase tracking-wide pointer-events-none">
                    {t("unitArea")}
                  </span>
                </div>
              </Field>
            </div>

            {/* Вывод добавленных услуг в тегах под инпутами */}
            {selectedOptionsDetails.length > 0 && (
              <div className="mt-1 p-3 bg-[#0D0D0D] border border-neutral-900 rounded-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-2">
                  {t("addedServices")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedOptionsDetails.map((o) => (
                    <div
                      key={o.id}
                      className="inline-flex items-center gap-2 text-[11px] bg-[#121212] border border-neutral-800 text-neutral-300 pl-3 pr-2 py-1.5 rounded-xl font-medium"
                    >
                      {/* ФИКС: Считываем локализованные названия опций по id в верхнем регистре */}
                      <span>{tOptions(o.id.toUpperCase())}</span>
                      <button
                        type="button"
                        onClick={() => toggleOption(o.id)}
                        className="w-4 h-4 rounded-md bg-neutral-900 text-neutral-500 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Динамический блок цены */}
            <div className="flex items-center justify-between mt-2 px-1 py-2 border-t border-neutral-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {t("totalLabel") || "Итого к оплате:"}
              </span>
              <span className="text-xl sm:text-2xl font-mono font-black text-accent">
                {total} ₾
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-black font-black text-xs md:text-sm uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-accent/5 select-none cursor-pointer"
            >
              {t("orderButton") || "Забронировать уборку"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
