'use client';
import { useEffect } from 'react';
import config from '../../../data_content/locales/config.json';

interface TitleTagProps {
  subtitle?: string;
  theme?: 'light' | 'dark';
}

export default function TitleTag({ subtitle, theme }: TitleTagProps) {
  useEffect(() => {
    // 1. Inyectar título dinámico en document.title
    const baseTitle = config.titletag.title;
    document.title = subtitle ? `${subtitle} | ${baseTitle}` : baseTitle;

    // 2. Resolver favicon dinámico según el tema del sistema o de la app
    const updateFavicon = (currentTheme: 'light' | 'dark') => {
      let faviconUrl = currentTheme === 'dark' 
        ? config.titletag.faviconDarkModeUrl 
        : config.titletag.faviconLightModeUrl;

      // Buscar o crear la etiqueta link de favicon
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    };

    // Si recibimos el tema explícito lo aplicamos, de lo contrario escuchamos el matchMedia del sistema
    if (theme) {
      updateFavicon(theme);
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        updateFavicon(e.matches ? 'dark' : 'light');
      };
      
      updateFavicon(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [subtitle, theme]);

  return null; // Componente lógico server-safe sin interfaz física
}
