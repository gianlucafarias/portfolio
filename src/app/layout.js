import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gianluca Palmier | Técnico Universitario en Programación - Full Stack Developer",
  description:
    "Desarrollador Full-Stack con experiencia práctica en el desarrollo de aplicaciones web utilizando frameworks como React y Angular, junto con herramientas como Next.js y Node.",
  keywords:
    "portfolio, web developer, Next.js, developer portfolio, minimal portfolio",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen w-full flex-col">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
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
