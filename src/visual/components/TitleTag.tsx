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
      const faviconUrl = currentTheme === 'dark' 
        ? config.titletag.faviconDarkModeUrl 
        : config.titletag.faviconLightModeUrl;

      const fileType = faviconUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';

      // Remover de manera agresiva todas las etiquetas de favicon previas para evitar conflictos
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(link => link.parentNode?.removeChild(link));

      // Crear e insertar la etiqueta única y definitiva
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = fileType;
      link.href = faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    updateFavicon(activeTheme);
  }, [subtitle, activeTheme]);

  return null; // Componente lógico server-safe sin interfaz física
}
