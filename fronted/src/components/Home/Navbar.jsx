import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-row items-center justify-between px-4 md:px-28 py-4 bg-green-900 dark:bg-neutral-900 shadow-md">


      <Link className="flex items-center text-2xl md:text-3xl mb-2 md:mb-0" to="/">
        <Box size={28} className="mr-1 text-white" />
        <span className="text-white font-semibold">Dxd</span>
        <span className="text-neutral-900 font-bold dark:text-neutral-400">Code</span>
      </Link>

      <div className="flex flex-row items-center gap-2 md:gap-4">
        <Link
          to="/models"
          className="px-4 py-2 bg-neutral-800 text-white dark:bg-neutral-700 hover:bg-neutral-800 hover:text-white  rounded-md font-semibold transition-colors"
        >
          Modelos
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-neutral-800 text-white dark:bg-neutral-700 hover:bg-neutral-800 hover:text-white  rounded-md font-semibold transition-colors"
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

    </nav>
  );
};

export default Navbar;
