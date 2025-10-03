import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
import ThemeToggle from '../ThemeToggle'

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between px-4 md:px-28 py-4 bg-green-900 dark:bg-neutral-900 relative">
      <Link className="flex items-center text-2xl md:text-3xl mb-2 md:mb-0" to="/">
        <Box size={28} className="mr-1 text-white" />
        <span className="text-white font-semibold">Dxd</span>
        <span className="text-neutral-900 font-bold dark:text-neutral-400">Code</span>
      </Link>

      <div className="flex flex-row items-center gap-2 md:gap-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-700 hover:bg-neutral-800 rounded-md font-semibold transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-white hover:bg-white/90 rounded-md font-semibold transition-colors text-neutral-900"
        >
          Register
        </Link>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
