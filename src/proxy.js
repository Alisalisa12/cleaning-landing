import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Именованный экспорт "proxy" — актуальная конвенция Next.js 16
// (раньше называлось "middleware", export default больше не подхватывается)
export function proxy(request) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
