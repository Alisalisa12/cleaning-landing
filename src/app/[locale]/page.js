import { routing } from "@/i18n/routing";
import { BookingProvider } from "@/contexts/BookingContext";

// Импортируем все ваши компоненты
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import MobileTeam from "@/components/MobileTeam";
import PriceList from "@/components/PriceList";
import Standards from "@/components/Standards";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// 1. Генерация статических параметров (ОБЯЗАТЕЛЬНО для работы /ru, /en, /ka без 404)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 2. Серверный компонент главной страницы
export default async function Home({ params }) {
  // В Next.js 16 объект params — это Promise, его необходимо развернуть через await
  const { locale } = await params;

  return (
    // Обертываем все блоки в стейт бронирования/калькулятора
    <BookingProvider>
      <main className="min-h-screen bg-[#0D0D0D] text-white font-sans antialiased selection:bg-accent selection:text-black">
        {/* Шапка сайта с переключателем языков */}
        <Header />

        {/* Главный экран (Hero) — виден сразу, без задержки на анимацию */}
        <Hero />

        {/* Интерактивный Калькулятор стоимости */}
        <ScrollReveal>
          <Calculator />
        </ScrollReveal>

        {/* Преимущества компании */}
        <ScrollReveal>
          <Advantages />
        </ScrollReveal>

        {/* Стандарты работы */}
        <ScrollReveal>
          <Standards />
        </ScrollReveal>

        {/* Мобильная версия блока команды */}
        <ScrollReveal>
          <MobileTeam />
        </ScrollReveal>

        {/* Прайс-лист */}
        <ScrollReveal>
          <PriceList />
        </ScrollReveal>

        {/* Форма обратной связи */}
        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        {/* Подвал сайта */}
        <Footer />
      </main>
    </BookingProvider>
  );
}
