"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  // ОПТИМИЗАЦИЯ: Если страницу смотрит поисковый робот, сразу ставим true,
  // чтобы контент мгновенно попал в индексацию Google для SEO-продвижения вверх
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const isBot =
        /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yand/i.test(
          navigator.userAgent,
        );
      return isBot;
    }
    return false;
  });

  useEffect(() => {
    // Если уже виден (например, роботом),observer не нужен
    if (visible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // Снимаем слежку сразу при фиксации, экономя ресурсы процессора
        }
      },
      {
        threshold: 0.15,
        // rootMargin снизу (-60px) гарантирует, что элемент начнет вылетать
        // чуть раньше, чем дойдет до края экрана, делая скролл плавным
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(el);

    // ОПТИМИЗАЦИЯ: Чистим за собой слежку при размонтировании компонента (убирает утечки памяти)
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      // ОПТИМИЗАЦИЯ: Базовый класс 'reveal' теперь зашит жестко, предотвращая сдвиги CLS
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay && visible ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
