"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
// import { Languages } from "lucide-react";

export default function Navbar() {
    const [hideOnMobile, setHideOnMobile] = useState(true);
    const pathname = usePathname();
    // const blogs = pathname === "/blogs";

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
                                        href="/#about"
                                        className="hover:underline"
                                    >
                                        Sobre mi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#projects"
                                        className="hover:underline"
                                    >
                                        Proyectos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#experience"
                                        className="hover:underline"
                                    >
                                        Experiencia
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:underline"
                                    >
                                     Contacto
                                    </Link>
                                </li>
                            </ul>

                            
                        </div>
                        <div className="flex items-center gap-2">
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
                            <button className="flex">
                                <label className="toggle text-base-content toggle-sm">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            const isNight = e.target.checked;
                                            document.documentElement.setAttribute(
                                                "data-theme",
                                                isNight ? "dark" : "light"
                                            );
                                        }}
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
                            {/*
                            <button className="flex items-center gap-2 hover:underline rounded-md p-1">
                            <Languages className="w-5 h-5" />
                            <span className="text-sm">EN</span>
                            </button>
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
