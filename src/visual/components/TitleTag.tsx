'use client';
import { useEffect } from 'react';
import config from '../../../data_content/locales/config.json';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';

interface TitleTagProps {
  subtitle?: string;
  theme?: 'light' | 'dark';
}

export default function TitleTag({ subtitle, theme: propTheme }: TitleTagProps) {
  const preferences = usePreferences();
  const contextTheme = preferences ? preferences.theme : undefined;
  const activeTheme = propTheme || contextTheme || 'light';

  useEffect(() => {
    // 1. Inyectar título dinámico en document.title
    const baseTitle = config.titletag.title;
    document.title = subtitle ? `${subtitle} | ${baseTitle}` : baseTitle;

    // 2. Resolver favicon dinámico según el tema activo de la aplicación
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

    updateFavicon(activeTheme);
  }, [subtitle, activeTheme]);

  return null; // Componente lógico server-safe sin interfaz física
}
