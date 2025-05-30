import React, { useState } from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { heroBackground } from '../assets';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    
    setIsSubmitted(true);
    setError('');
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 bg-dark-950"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      id="home"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark-950/50"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-[-80px]"
          variants={heroVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1 
            className="mb-24 font-extrabold leading-tight tracking-tight"
            variants={itemVariants}
          >
            <div className="opacity-60">
              <span>GET</span>
              <span className="text-primary-500"> FIT</span>
              <span> BY</span>
              <span className="text-primary-500"> MI</span>
            </div>
          </motion.h1>
          
          <motion.p 
            className="mb-10 text-lg text-gray-300"
            variants={itemVariants}
          >
            <p className="opacity-75">Personalized workout plans, nutrition guidance, and expert coaching to help reach your peak physical condition.</p>
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <Link to="/services" className="btn btn-primary px-8 py-3 flex items-center gap-2">
              <span>Start Your Transformation</span>
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;