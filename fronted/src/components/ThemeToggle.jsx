import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  // aplicar tema al cargar la página
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 p-3 rounded-full bg-neutral-900 dark:bg-white dark:hover:bg-white/50 transition-all duration-300 shadow-lg z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 dark:text-neutral-900 text-white" />
      ) : (
        <Sun className="w-5 h-5 dark:text-neutral-900 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
