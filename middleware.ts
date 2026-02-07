import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en"] as const;
const defaultLocale = "es";
const EN_SUBDOMAIN = "en.gianluca.dev";

function getLocale(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;
  // Usar header host (Vercel) en lugar de nextUrl.hostname
  const hostHeader = request.headers.get("host") || request.headers.get("x-forwarded-host") || "";
  const hostname = hostHeader.split(":")[0];

  // Si el host es en.gianluca.dev, siempre servir contenido en inglés
  if (hostname === EN_SUBDOMAIN || hostname.startsWith("en.")) {
    const pathnameHasEn = pathname.startsWith("/en") || pathname === "/en";
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", "en");
    if (!pathnameHasEn) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
      return NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const resolvedLocale = pathname.startsWith("/en") ? "en" : "es";

  if (pathnameIsMissingLocale) {
    const acceptLanguage = request.headers.get("accept-language");
    let preferredLocale = defaultLocale;

    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().toLowerCase())
        .filter((lang) => lang.length >= 2);

      for (const lang of languages) {
        if (lang.startsWith("en")) {
          preferredLocale = "en";
          break;
        } else if (lang.startsWith("es")) {
          preferredLocale = "es";
          break;
        }
      }
    }

    if (preferredLocale === "en") {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", resolvedLocale);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function middleware(request: NextRequest) {
  return getLocale(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
