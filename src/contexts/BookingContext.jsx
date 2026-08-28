"use client";

import { createContext, useContext, useState, useMemo } from "react";
import {
  PACKAGES,
  OPTIONS,
  getBasePrice,
  getOptionsPrice,
} from "@/lib/pricing";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [packageId, setPackageId] = useState("general");
  const [area, setArea] = useState(70);
  const [options, setOptions] = useState([]);

  // Безопасный расчет базовой стоимости
  const basePrice = useMemo(() => {
    return getBasePrice(packageId, area || 0);
  }, [packageId, area]);

  // Безопасный расчет стоимости дополнительных услуг
  const optionsPrice = useMemo(() => {
    return getOptionsPrice(options || []);
  }, [options]);

  const total = basePrice + optionsPrice;

  // Безопасное получение объектов выбранных опций (защита от undefined)
  const selectedOptionsDetails = useMemo(() => {
    if (!options || !Array.isArray(options)) return [];
    return OPTIONS.filter((o) => options.includes(o.id)) || [];
  }, [options]);

  function selectPackageAndGo(id) {
    setPackageId(id);
    const el = document.getElementById("book");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function toggleOption(id) {
    setOptions((prev) => {
      const current = prev || [];
      return current.includes(id)
        ? current.filter((o) => o !== id)
        : [...current, id];
    });
  }

  return (
    <BookingContext.Provider
      value={{
        packageId,
        setPackageId,
        area,
        setArea,
        options: options || [],
        setOptions,
        toggleOption,
        total: total || 0,
        selectedOptionsDetails,
        selectPackageAndGo,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking должен использоваться внутри BookingProvider");
  }
  return ctx;
}
