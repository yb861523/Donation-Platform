import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-100 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">FoodShare</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">Home</Link>
            <Link to="/donate" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">Donate</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">Contact</Link>
            <Link to="/admin/login" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium">Admin</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-700 dark:text-green-400 font-semibold">Hello, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">Login</Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-green-100 dark:bg-gray-700 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-green-100 dark:bg-gray-700 text-green-600 dark:text-green-400"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-green-100 dark:bg-gray-700 text-green-600 dark:text-green-400"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-green-100 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium px-4" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/donate" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium px-4" onClick={() => setMobileMenuOpen(false)}>Donate</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium px-4" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium px-4" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/admin/login" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium px-4" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              {user ? (
                <div className="flex items-center space-x-2 mx-4">
                  <span className="text-green-700 dark:text-green-400 font-semibold">Hello, {user.name}</span>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout && onLogout(); }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium mx-4" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 