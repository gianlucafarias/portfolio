import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata = {
    title: "Gianluca Palmier | Técnico Universitario en Programación - Full Stack Developer",
    description: "Desarrollador Full-Stack con experiencia práctica en el desarrollo de aplicaciones web utilizando frameworks como React y Angular, junto con herramientas como Next.js y Node.",
    keywords: "portfolio, web developer, Next.js, developer portfolio, minimal portfolio",
    icons: {
        icon: [{ url: "/favicon.ico" }],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" data-theme="light" data-scroll-behavior="smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu"
                />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased overflow-auto min-h-screen">
                <ThemeProvider>
                    <BackgroundWrapper>
                        <LanguageProvider>
                            <div className="w-[100%] md:w-[700px] m-auto content-wrapper">
                                <Navbar />
                                {children}
                                <Footer />
                            </div>
                        </LanguageProvider>
                    </BackgroundWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
