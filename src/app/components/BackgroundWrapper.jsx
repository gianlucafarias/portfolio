"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

export default function BackgroundWrapper({ children }) {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = `antialiased overflow-auto min-h-screen ${theme === 'dark' ? 'bg-dark-theme' : 'bg-light-theme'}`;
        
        return () => {
            document.body.className = 'antialiased overflow-auto min-h-screen';
        };
    }, [theme]);

    return <>{children}</>;
}
