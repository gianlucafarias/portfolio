import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getMessages } from "@/lib/i18n";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Gianluca Palmier";
const DEFAULT_SITE_URL = "https://gianluca.dev";
const DEFAULT_OG_IMAGE = "/portfolio-thumbnail.png";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale");
  const locale = localeHeader === "en" ? "en" : "es";
  const messages = getMessages(locale);
  const seo = messages?.seo as { title?: string; description?: string; keywords?: string } | undefined;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const baseUrl = new URL(siteUrl);
  const canonical = locale === "en" ? "/en" : "/";
  const ogImageUrl = DEFAULT_OG_IMAGE;

  return {
    metadataBase: baseUrl,
    title: seo?.title || SITE_NAME,
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical,
      languages: {
        es: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: seo?.title || SITE_NAME,
      description: seo?.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "es_AR",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo?.title || SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.title || SITE_NAME,
      description: seo?.description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [{ url: "/favicon.ico" }],
    },
  };
}


interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale");
  const locale = localeHeader === "en" ? "en" : "es";
  const messages = getMessages(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const profile = messages?.profile as { name?: string; role?: string } | undefined;
  const seo = messages?.seo as { description?: string } | undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name || SITE_NAME,
    url: siteUrl,
    jobTitle: profile?.role,
    description: seo?.description,
  };

  return (
    <html
      lang={locale}
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-white tracking-tight antialiased dark:bg-zinc-950">
        <ThemeProvider>
          <LanguageProvider initialLocale={locale} initialMessages={messages}>
            <div className="flex min-h-screen w-full flex-col">
              <div className="relative mx-auto w-full max-w-screen-md flex-1 px-4 pt-20">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
