import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-dark-900 py-20 px-4">
        <motion.div 
          className="max-w-xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-gray-300 mb-10">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;