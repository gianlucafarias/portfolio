import "./globals.css";
import Navbar from "./components/Navbar";
import { seo } from "@/data/data";
import Footer from "./components/Footer";

export const metadata = {
    title: `${seo.title}`,
    icons: {
        icon: [{ url: "/favicon.ico" }],
    },
    description: `${seo.description}`,
    keywords: `${seo.keywords}`
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
            <body
className={`antialiased overflow-auto min-h-screen bg-radial-[at_5%_5%] from-teal-100 via-blue-50 to-white dark:bg-radial-[at_5%_5%] dark:from-teal-900 dark:via-slate-800 dark:to-black`}>               
 <div className="w-[100%] md:w-[700px] m-auto">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
