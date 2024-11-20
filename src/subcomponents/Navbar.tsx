import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
    { name: 'Products', path: '/products' },
    { name: 'Events', path: '/events' },
    { name: 'Photos', path: '/photos' },
    { name: 'Memberships', path: '/memberships' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },

  ];

  return (
    <nav className="bg-pink-100 shadow-lg fixed top-6 left-20 right-20 z-50 rounded-md text-pink-600 opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">Mesa Enterprice</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`py-4 px-2 text-white font-semibold transition duration-300 ${
                  location.pathname === item.path ? 'opacity-100 border-b-4 border-white' : 'opacity-50'
                } hover:opacity-100`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block py-2 px-4 text-sm transition duration-300 ${
                  location.pathname === item.path ? 'bg-pink-400 opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
