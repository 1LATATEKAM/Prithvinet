import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="relative z-10">
        {isDark ? (
          <Sun className="text-amber-400 group-hover:rotate-90 transition-transform duration-500" size={20} />
        ) : (
          <Moon className="text-blue-500 group-hover:-rotate-12 transition-transform duration-500" size={20} />
        )}
      </div>
      <div className={`absolute inset-0 opacity-20 ${isDark ? 'bg-amber-400/10' : 'bg-blue-500/10'} group-hover:opacity-40 transition-opacity`}></div>
    </button>
  );
};

export default ThemeToggle;
