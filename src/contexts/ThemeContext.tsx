"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelectorAll<HTMLLinkElement>('link[data-theme-favicon]')
    .forEach((favicon) => favicon.setAttribute('href', `/favicon-${theme}.svg`));
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => {
      const nextTheme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : mediaQuery.matches
          ? 'dark'
          : 'light';
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    syncTheme();
    if (!savedTheme) mediaQuery.addEventListener('change', syncTheme);
    return () => mediaQuery.removeEventListener('change', syncTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
