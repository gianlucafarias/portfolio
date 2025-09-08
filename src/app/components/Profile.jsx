"use client";

import { socials } from "@/data/data";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Profile() {
    const { messages } = useLanguage();
    
    return (
        <>
            <img
                src="https://i.imgur.com/zjGPTRC.jpeg"
                className="w-[70px] h-[70px] rounded-[50%] object-cover object-center"
                alt={`${messages?.profile?.name || 'Gianluca Palmier'}'s profile`}
            />
            <div className="flex gap-[5px] items-center mt-1">
                <h1 className="text-2xl font-semibold">{messages?.profile?.name || 'Gianluca Palmier'}</h1>
               
            </div>
            <div className="mt-1.5 flex items-center gap-1">
                <p className="text-base text-base-content/60">{messages?.profile?.role || 'Técnico Universitario en Programación - Full Stack Developer'} </p>
                
            </div>
            <div className="flex items-center mt-3 gap-3">

                <a href={socials.github}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-github-icon lucide-github cursor-pointer"
                    >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                </a>

                <a href={socials.linkedin}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 192 192" 
                fill="none"><rect 
                width="132" 
                height="132" x="30" y="30" 
                stroke="currentColor" 
                strokeWidth="12" rx="16"/><path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="12" d="M66 86v44"/><circle cx="66" cy="64" r="8" 
                fill="currentColor"/><path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeWidth="12" d="M126 130v-26c0-9.941-8.059-18-18-18v0c-9.941 0-18 8.059-18 18v26"/></svg>
                </a>

                <a href={socials.instagram}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-instagram-icon lucide-instagram cursor-pointer"
                    >
                        <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                </a>

                <a href={socials.twitter}>
                <svg 
                width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="m15.08,2.1h2.68l-5.89,6.71,6.88,9.1h-5.4l-4.23-5.53-4.84,5.53H1.59l6.24-7.18L1.24,2.1h5.54l3.82,5.05,4.48-5.05Zm-.94,14.23h1.48L6,3.61h-1.6l9.73,12.71h0Z" />
</svg>
                 
                </a>

                <a href={`mailto:${messages?.profile?.email || 'palmiergianluca@gmail.com'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M20 4C21.6569 4 23 5.34315 23 7V17C23 18.6569 21.6569 20 20 20H4C2.34315 20 1 18.6569 1 17V7C1 5.34315 2.34315 4 4 4H20ZM19.2529 6H4.74718L11.3804 11.2367C11.7437 11.5236 12.2563 11.5236 12.6197 11.2367L19.2529 6ZM3 7.1688V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7.16882L13.8589 12.8065C12.769 13.667 11.231 13.667 10.1411 12.8065L3 7.1688Z" fill="currentColor"/>
</svg>
                </a>
                <span className="text-sm text-base-content/60">|</span>
                <Link href="/CV_Gianluca-Palmier.pdf" target="_blank">
                <button className="text-sm hover:underline cursor-pointer">
                {messages?.sections?.downloadCV || 'Descargar CV'}
                </button>
                </Link>
            </div>
        </>
    );
}
