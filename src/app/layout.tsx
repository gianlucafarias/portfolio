import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getMessages } from "@/lib/i18n";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/layout/MotionProvider";
import PortfolioShell from "@/components/layout/PortfolioShell";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const SITE_NAME = "Gianluca Palmier";
const DEFAULT_SITE_URL = "https://gianluca.dev";
const DEFAULT_OG_IMAGE = "/profile.jpg";

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
          width: 919,
          height: 919,
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
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}


interface RootLayoutProps {
  children: ReactNode;
  project: ReactNode;
}

export default async function RootLayout({ children, project }: RootLayoutProps) {
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
      className={geist.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var r=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',r);var f=document.querySelector('link[data-theme-favicon]');if(!f){f=document.createElement('link');f.setAttribute('rel','icon');f.setAttribute('type','image/svg+xml');f.setAttribute('data-theme-favicon','');document.head.appendChild(f);}f.setAttribute('href','/favicon-'+r+'.svg');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-canvas font-sans text-zinc-900 antialiased dark:text-zinc-50">
        <ThemeProvider>
          <MotionProvider>
            <LanguageProvider initialLocale={locale} initialMessages={messages}>
              <div className="flex min-h-screen w-full flex-col">
                <PortfolioShell project={project}>
                  <Header />
                  {children}
                  <Analytics/>
                  <Footer />
                </PortfolioShell>
              </div>
            </LanguageProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
