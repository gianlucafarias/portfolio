"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Languages } from "lucide-react";

export default function Navbar() {
    const [hideOnMobile, setHideOnMobile] = useState(true);
    const { messages, changeLanguage, isEnglish } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="flex justify-center sticky top-2 items-center gap-[25px] w-full z-10">
               
                <div className="w-[80%] sm:w-[80%] border-1 flex items-center sm:justify-center justify-between bg-gray-10/50 backdrop-blur-sm rounded-4xl py-3 px-4">
                <span className="sm:hidden">
                                    Gianluca.dev
                                </span>
                    <div className="flex items-center sm:gap-8 gap-5">
                    
                        <div className="flex items-center gap-4">
                        
                            <ul
                                className={`py-5 w-[90%] sm:w-full sm:flex-row flex-col sm:bg-transparent bg-base-200 backdrop-blur-sm sm:static fixed top-12 left-[5%] rounded-2xl sm:border-transparent
                                         border mx-auto items-center text-base sm:p-0 p-2 gap-1 sm:gap-4 ${
                                             hideOnMobile ? "hidden" : "flex"
                                         } sm:flex`}
                            >
                                
                                <li>
                                    <Link
                                        href={isEnglish ? "/en/#about" : "/#about"}
                                        className="hover:underline"
                                    >
                                        {messages?.nav?.about || "Sobre mi"}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={isEnglish ? "/en/#projects" : "/#projects"}
                                        className="hover:underline"
                                    >
                                        {messages?.nav?.projects || "Proyectos"}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={isEnglish ? "/en/#experience" : "/#experience"}
                                        className="hover:underline"
                                    >
                                        {messages?.nav?.experience || "Experiencia"}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={isEnglish ? "/en/contact" : "/contact"}
                                        className="hover:underline"
                                    >
                                     {messages?.nav?.contact || "Contacto"}
                                    </Link>
                                </li>
                            </ul>

                            
                        </div>
                        <div className="flex items-center gap-2">
                            
                            <button className="flex">
                                <label className="toggle text-base-content toggle-sm">
                                    <input
                                        type="checkbox"
                                        checked={theme === 'dark'}
                                        onChange={toggleTheme}
                                        className="theme-controller"
                                    />

                                    <svg
                                        aria-label="sun"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="4"
                                            ></circle>
                                            <path d="M12 2v2"></path>
                                            <path d="M12 20v2"></path>
                                            <path d="m4.93 4.93 1.41 1.41"></path>
                                            <path d="m17.66 17.66 1.41 1.41"></path>
                                            <path d="M2 12h2"></path>
                                            <path d="M20 12h2"></path>
                                            <path d="m6.34 17.66-1.41 1.41"></path>
                                            <path d="m19.07 4.93-1.41 1.41"></path>
                                        </g>
                                    </svg>

                                    <svg
                                        aria-label="moon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                        </g>
                                    </svg>
                                </label>
                            </button>
                            <button 
                                onClick={() => changeLanguage(isEnglish ? 'es' : 'en')}
                                className="ml-2 flex items-center gap-2 hover:underline rounded-md p-1 px-2 py-1 border border-gray-300"
                            >
                                <Languages className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {isEnglish ? 'ES' : 'EN'}
                                </span>
                            </button>
                            <button
                                className="flex sm:hidden"
                                onClick={() => {
                                    setHideOnMobile(!hideOnMobile);
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    menu
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
