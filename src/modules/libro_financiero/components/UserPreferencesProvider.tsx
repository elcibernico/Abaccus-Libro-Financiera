'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
export type LearningMode = 'basic' | 'expert';

interface UserPreferencesContextType {
  theme: Theme;
  learningMode: LearningMode;
  toggleTheme: () => void;
  toggleLearningMode: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [learningMode, setLearningMode] = useState<LearningMode>('basic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLearningMode = localStorage.getItem('learningMode') as LearningMode;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (savedLearningMode === 'basic' || savedLearningMode === 'expert') {
      setLearningMode(savedLearningMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLearningMode = () => {
    const newMode: LearningMode = learningMode === 'basic' ? 'expert' : 'basic';
    setLearningMode(newMode);
    localStorage.setItem('learningMode', newMode);
  };

  return (
    <UserPreferencesContext.Provider value={{ 
      theme,
      learningMode,
      toggleTheme,
      toggleLearningMode
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a UserPreferencesProvider');
  }
  return context;
}
