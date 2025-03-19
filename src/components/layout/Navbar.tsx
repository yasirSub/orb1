"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaMoon, FaSun, FaGlobe, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      const workerAuth = localStorage.getItem('workerAuthenticated');
      const userAuth = localStorage.getItem('userAuthenticated');
      const userData = localStorage.getItem('userData');

      if (adminAuth) {
        setIsAuthenticated(true);
        setUserRole('admin');
        const email = localStorage.getItem('adminEmail') || 'admin@orb1.com';
        setUserEmail(email);
        setUserName('Admin');
      } else if (workerAuth) {
        setIsAuthenticated(true);
        setUserRole('worker');
        const workerData = localStorage.getItem('workerData');
        if (workerData) {
          const { email, name } = JSON.parse(workerData);
          setUserEmail(email);
          setUserName(name);
        }
      } else if (userAuth && userData) {
        setIsAuthenticated(true);
        setUserRole('user');
        const { email, name } = JSON.parse(userData);
        setUserEmail(email);
        setUserName(name);
      }
    };

    checkAuth();
  }, []);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target as Node) &&
        searchButtonRef.current && 
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear all auth-related localStorage items
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('workerAuthenticated');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('workerData');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('workerRole');

    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    setUserName(null);
    setIsUserMenuOpen(false);

    router.push('/login');
  };

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark-mode');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode class to document
    if (!darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50">
      {/* Search Bar (Expanded) - Moved to top */}
      {searchOpen && (
        <div ref={searchRef} className="py-4 border-b border-gray-200 dark:border-gray-700 container-custom">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search for services, projects..."
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg transition-colors"
              aria-label="Submit search"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}
      
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaGlobe className="text-3xl text-[#00F0FF]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#0066FF] bg-clip-text text-transparent">
              Orb1
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            
            {/* Search Button */}
            <button 
              ref={searchButtonRef}
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="text-foreground hover:text-primary transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>
            
            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-500 transition-colors"
                  aria-label="Open user menu"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="text-sm font-medium">{userName || userEmail}</span>
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
                  >
                    {/* Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Signed in as
                      </p>
                      <p className="text-sm text-yellow-400 font-medium truncate">
                        {userName || userEmail}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userEmail}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userRole === 'worker' ? (
                        // Worker Menu Items
                        <Link
                          href="/worker/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Worker Dashboard
                        </Link>
                      ) : userRole === 'user' ? (
                        // Regular User Menu Items
                        <>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/my-services"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            My Services
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Order History
                          </Link>
                        </>
                      ) : (
                        // Admin Menu Items
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      {/* Common Menu Items */}
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile Settings
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Search Button (Mobile) */}
            <button 
              ref={searchButtonRef}
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            
            {/* Dark Mode Toggle (Mobile) */}
            <button 
              onClick={toggleDarkMode}
              className="text-foreground hover:text-primary transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>

            {/* Authentication (Mobile) */}
            {isAuthenticated ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Toggle user menu"
              >
                <FaUser className="w-5 h-5" />
              </button>
            ) : (
              <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                <FaUser className="w-5 h-5" />
              </Link>
            )}
            
            {/* Hamburger Menu */}
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
                Portfolio
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  {userRole === 'admin' && (
                    <Link href="/admin/dashboard" className="text-foreground hover:text-primary transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  {userRole === 'worker' && (
                    <Link href="/worker/dashboard" className="text-foreground hover:text-primary transition-colors">
                      Worker Dashboard
                    </Link>
                  )}
                  {userRole === 'user' && (
                    <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn-primary inline-block text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile User Menu */}
        {isUserMenuOpen && isAuthenticated && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 px-4">
                Signed in as {userName || userEmail}
              </p>
              {userRole === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Admin Dashboard
                </Link>
              )}
              {userRole === 'worker' && (
                <Link
                  href="/worker/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Worker Dashboard
                </Link>
              )}
              {userRole === 'user' && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;