import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'testimonials', label: 'Testimonials', href: '/testimonials' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'partners', label: 'Partners', href: '/partners' },
  { id: 'cart', label: 'Cart', href: '/cart' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update cart count whenever localStorage changes
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        try {
          const items = JSON.parse(cart);
          setCartItemCount(items.length);
        } catch (e) {
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    // Initial count
    updateCartCount();

    // Set up event listener for localStorage changes
    window.addEventListener('storage', updateCartCount);
    
    // Check every second for changes (for same-window updates)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
    // Scroll to top when navigating to a new page
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const navItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  const isActive = (path: string) => {
    // Check if we're on the home page
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // For other pages, check if the current path starts with the link's path
    // This prevents '/about' from matching '/about/something'
    return path !== '/' && location.pathname === path;
  };

  const renderNavLink = (link: { id: string; label: string; href: string }) => {
    const active = isActive(link.href);
    return (
      <Link 
        to={link.href} 
        className={`nav-link ${active ? 'active text-primary-500' : ''}`}
      >
        {link.label}
        {link.id === 'cart' && cartItemCount > 0 && (
          <span className="ml-1 bg-primary-600 text-white text-xs rounded-full px-2 py-1">
            {cartItemCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Dumbbell className="text-primary-500" size={28} />
          <span>Fit By Mi, LLC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link, index) => (
              <li key={link.id}>
                {renderNavLink(link)}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="p-2 md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 top-0 bg-dark-950 z-[70] md:hidden flex flex-col overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container py-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                <Dumbbell className="text-primary-500" size={28} />
                <span>Fit By Mi, LLC</span>
              </Link>
              <button 
                className="p-2 text-white"
                onClick={toggleMenu}
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="container py-6 flex-1 flex flex-col">
              <ul className="flex flex-col gap-2 items-center justify-center flex-1">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.id}
                    custom={i}
                    variants={navItemVariants}
                    initial="closed"
                    animate="open"
                    className="w-full text-center"
                  >
                    <Link 
                      to={link.href} 
                      className={`block py-4 text-2xl font-bold transition-colors duration-300 ${
                        isActive(link.href) ? 'text-primary-500' : 'hover:text-primary-500'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      {link.id === 'cart' && cartItemCount > 0 && (
                        <span className="ml-2 bg-primary-600 text-white text-sm rounded-full px-2 py-1">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;