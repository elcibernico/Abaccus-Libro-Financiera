'use client';
// Fuerza compilación estable v1.1.4
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TabType } from './ContentTabs';

interface NavigationContextType {
  activeUnit: string;
  activeTopic: string;
  contentTopic: string;
  activeTab: TabType;
  availableTabs: TabType[];
  isSidebarOpen: boolean;
  setActiveUnit: (unitId: string) => void;
  setActiveTopic: (topicId: string) => void;
  setContentTopic: (topicId: string) => void;
  setActiveTab: (tab: TabType) => void;
  setAvailableTabs: (tabs: TabType[]) => void;
  toggleSidebar: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeUnit, setActiveUnit] = useState<string>('U01');
  const [activeTopic, setActiveTopic] = useState<string>('U01_Pto01');
  const [contentTopic, setContentTopic] = useState<string>('U01_Pto01');
  const [activeTab, setActiveTab] = useState<TabType>('Desarrollo');
  const [availableTabs, setAvailableTabs] = useState<TabType[]>(['Desarrollo', 'Glosario', 'Casos Prácticos', 'Autoevaluación', 'Gráficos']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <NavigationContext.Provider value={{
      activeUnit,
      activeTopic,
      contentTopic,
      activeTab,
      availableTabs,
      isSidebarOpen,
      setActiveUnit,
      setActiveTopic,
      setContentTopic,
      setActiveTab,
      setAvailableTabs,
      toggleSidebar,
      setIsSidebarOpen
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    // Fallback: provide safe defaults to avoid crashing when provider is missing.
    return {
      activeUnit: 'U01',
      activeTopic: 'U01_Pto01',
      contentTopic: 'U01_Pto01',
      activeTab: 'Desarrollo' as TabType,
      availableTabs: ['Desarrollo', 'Glosario', 'Casos Prácticos', 'Autoevaluación', 'Gráficos'],
      isSidebarOpen: true,
      setActiveUnit: () => {},
      setActiveTopic: () => {},
      setContentTopic: () => {},
      setActiveTab: () => {},
      setAvailableTabs: () => {},
      toggleSidebar: () => {},
      setIsSidebarOpen: () => {}
    } as NavigationContextType;
  }
  return context;
}
