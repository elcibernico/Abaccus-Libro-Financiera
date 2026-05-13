'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type LearningMode = 'essential' | 'expert';

interface UserPreferencesContextType {
  theme: Theme;
  learningMode: LearningMode;
  toggleTheme: () => void;
  setLearningMode: (mode: LearningMode) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [learningMode, setLearningMode] = useState<LearningMode>('essential');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedMode = localStorage.getItem('learningMode') as LearningMode;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    if (savedMode) {
      setLearningMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSetLearningMode = (mode: LearningMode) => {
    setLearningMode(mode);
    localStorage.setItem('learningMode', mode);
  };

  return (
    <UserPreferencesContext.Provider value={{ 
      theme, 
      learningMode, 
      toggleTheme, 
      setLearningMode: handleSetLearningMode 
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
