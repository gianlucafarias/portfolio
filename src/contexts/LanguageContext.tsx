"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Locale = 'es' | 'en';

// Tipo genérico para los mensajes (estructura de los JSON de traducciones)
type Messages = Record<string, unknown> | null;

interface LanguageContextValue {
  locale: Locale;
  messages: Messages;
  changeLanguage: (newLocale: Locale) => void;
  isEnglish: boolean;
  isSpanish: boolean;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>('es');
  const [messages, setMessages] = useState<Messages>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Detectar idioma basado en la ruta
    if (pathname.startsWith('/en')) {
      setLocale('en');
    } else {
      setLocale('es');
    }
  }, [pathname]);

  useEffect(() => {
    // Cargar traducciones
    const loadMessages = async () => {
      try {
        const msgs = await import(`../messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error(`Error loading translations for ${locale}:`, error);
        const fallback = await import(`../messages/es.json`);
        setMessages(fallback.default);
      }
    };
    loadMessages();
  }, [locale]);

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === 'en') {
      // Redirigir a /en
      const newPath = '/en' + pathname.replace('/en', '');
      router.push(newPath);
    } else {
      // Redirigir a español (sin /en)
      const newPath = pathname.replace('/en', '');
      // Si la ruta resultante está vacía, ir a la raíz
      if (newPath === '') {
        router.push('/');
      } else {
        router.push(newPath);
      }
    }
  };

  const value: LanguageContextValue = {
    locale,
    messages,
    changeLanguage,
    isEnglish: locale === 'en',
    isSpanish: locale === 'es'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
