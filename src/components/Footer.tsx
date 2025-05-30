import React from 'react';
import { Instagram, Mail, Dumbbell, MapPin, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8 bg-dark-950 justify-center">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 pb-8 border-b border-dark-800 md:grid-cols-4">
          {/* Logo and Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 text-2xl font-bold">
              <Dumbbell className="text-primary-500" size={28} />
              <span>Fit By Mi, LLC</span>
            </Link>
            <p className="mb-6 text-gray-400">
              Dedicated to helping you achieve your fitness goals through personalized training programs and nutrition plans.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 mt-1 text-primary-500" size={18} />
                <span className="text-gray-400">Indianapolis, IN</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="flex-shrink-0 mt-1 text-primary-500" size={18} />
                <span className="text-gray-400">Michelle2.0fit@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                  <a href="https://www.instagram.com/michelleoliveira.fit/" target="_blank" className="flex items-start gap-3 transition-colors duration-300 rounded-full hover:bg-primary-600/25">
                    <Instagram className="flex-shrink-0 mt-1 text-primary-500" size={18} />
                    <span className="text-gray-400"> michelleoliveira.fit</span>
                  </a>
              </li>
              <li className="flex items-start gap-3">
                  <a href="https://www.buymeacoffee.com/MichelleO" target="_blank" className="flex items-start gap-3 transition-colors duration-300 rounded-full hover:bg-primary-600/25">
                    <Coffee className="flex-shrink-0 mt-1 text-primary-500" size={18} />
                    <span className="text-gray-400"> Support My Work</span>
                  </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
                  Subscribe to my Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} FitByMi, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;