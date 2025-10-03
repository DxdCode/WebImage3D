import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 bottom-4 p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-white/50 transition-all duration-300 shadow-lg z-50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-white dark:text-neutral-900" />
      ) : (
        <Sun className="w-5 h-5 text-white dark:text-neutral-900" />
      )}
    </button>
  );
};

export default ThemeToggle;
