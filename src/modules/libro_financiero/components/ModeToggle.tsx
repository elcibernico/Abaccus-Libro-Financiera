'use client';
import { Sparkles, GraduationCap } from 'lucide-react';

interface ModeToggleProps {
  mode: 'essential' | 'expert';
  setMode: (mode: 'essential' | 'expert') => void;
}

export default function ModeToggle({ mode, setMode }: ModeToggleProps) {
  return (
    <div className="mode-switch">
      <div className="switch-container">
        <button 
          className={`switch-btn ${mode === 'essential' ? 'active' : ''}`}
          onClick={() => setMode('essential')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <GraduationCap size={18} />
          Modo Esencial
        </button>
        <button 
          className={`switch-btn ${mode === 'expert' ? 'active' : ''}`}
          onClick={() => setMode('expert')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Sparkles size={18} />
          Modo Experto
        </button>
      </div>
    </div>
  );
}
