import { NextResponse } from 'next/server'

// Idiomas soportados
const locales = ['es', 'en']
const defaultLocale = 'es'

// Función para obtener idioma preferido del usuario
function getLocale(request) {
  // Verificar si ya hay un locale en la URL
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Obtener idioma del header Accept-Language
    const acceptLanguage = request.headers.get('accept-language')
    let preferredLocale = defaultLocale

    if (acceptLanguage) {
      // Parsear Accept-Language header
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase())
        .filter(lang => lang.length >= 2)

      // Buscar el primer idioma soportado
      for (const lang of languages) {
        if (lang.startsWith('en')) {
          preferredLocale = 'en'
          break
        } else if (lang.startsWith('es')) {
          preferredLocale = 'es'
          break
        }
      }
    }

    // Si el idioma preferido no es español, redirigir a /en
    if (preferredLocale === 'en') {
      const url = request.nextUrl.clone()
      url.pathname = `/en${pathname}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export function middleware(request) {
  return getLocale(request)
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
