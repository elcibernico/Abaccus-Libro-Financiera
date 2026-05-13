'use client';
import { useEffect } from 'react';
import { usePreferences } from './UserPreferencesProvider';
import config from '@/config.json';

export default function DynamicFavicon() {
  const { theme } = usePreferences();

  useEffect(() => {
    const faviconUrl = theme === 'dark' ? config.titletag.faviconDarkModeUrl : config.titletag.faviconLightModeUrl;
    
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconUrl;
    
    // Explicitly set title to override any Next.js defaults
    if (document.title !== config.titletag.title) {
      document.title = config.titletag.title;
    }
  }, [theme]);

  return null;
}
