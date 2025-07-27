import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusCircle, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors"
          >
            <div className="flex items-center">
              <PlusCircle className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">My Dental Care</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/classification"
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              Classification
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2 border-t mt-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/classification"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Classification
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;