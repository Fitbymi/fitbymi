import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Apple, Award, ChevronsUp, Heart, PersonStanding, Target, Users, AlignCenterVertical as Certificate, GraduationCap, Dumbbell, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { michelleProfileImage, michelleGraduate, competitionImage, drOliveira, trophyWin, trophyWin2 } from '../assets';

const AboutPage: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: missionRef, inView: missionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [currentImage, setCurrentImage] = useState(0);
  
  // Images for the carousel
  const carouselImages = [
    { src: drOliveira, alt: "Dr. Oliveira" },
    { src: trophyWin, alt: "Michelle with trophy" },
    { src: trophyWin2, alt: "Michelle competition win" }
  ];
  
  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };
  
  // Function to navigate to the previous image
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  
  // Auto rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };
  
  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${michelleGraduate})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-dark-950/75"></div>
          </div>
          <div className="container relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">About <span className="text-primary-500">Michelle Oliveira</span></h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-300">Certified Personal Trainer & Nutrition Coach</p>
          </div>
        </section>

        {/* About Content - Two Column Layout */}
        <section ref={ref} className="py-20 bg-dark-900">
          <div className="container">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
              variants={staggerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Left Column - Image */}
              <motion.div variants={itemVariants} className="sticky top-32 self-start lg:block hidden">
                <div className="rounded-lg overflow-hidden shadow-2xl relative">
                  <img 
                    src={competitionImage}
                    alt="Michelle Oliveira" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 p-3 bg-primary-600 rounded-lg shadow-lg">
                    <div className="text-center">
                      <p className="text-4xl font-bold">9+</p>
                      <p className="font-medium">Years Experience</p>
                    </div>
                  </div>
                </div>

                {/* Client Success Box - Moved here */}
                <div className="mt-20 bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-lg text-primary-500">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Client Success</h4>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <PersonStanding className="text-primary-500" size={16} />
                      <span className="text-gray-300">50+ Transformations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="text-primary-500" size={16} />
                      <span className="text-gray-300">Personalized Coaching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="text-primary-500" size={16} />
                      <span className="text-gray-300">Goal-oriented Programs</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-300">
                    I've helped hundreds of clients achieve their fitness goals, from weight loss and muscle gain to competition preparation. As a competitive bodybuilder myself, I understand the dedication and consistency required to transform your physique.
                  </p>
                </div>

                <div className="p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
                  <p className="text-gray-300">
                    My approach combines evidence-based training methods, customized nutrition plans, and motivational coaching to ensure you not only reach your goals but maintain your results long-term. I blend the discipline of a competitor with the compassion of someone who truly listens.
                  </p>
                </div>
              </motion.div>

              {/* Mobile Image - Only shown on mobile */}
              <motion.div variants={itemVariants} className="lg:hidden mb-8">
                <div className="rounded-lg overflow-hidden shadow-2xl relative">
                  <img 
                    src={competitionImage}
                    alt="Michelle Oliveira" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 p-3 bg-primary-600 rounded-lg shadow-lg">
                    <div className="text-center">
                      <p className="text-3xl font-bold">9+</p>
                      <p className="font-medium text-sm">Years Experience</p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Client Success Box */}
                <div className="mt-8 bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-lg text-primary-500">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Client Success</h4>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <PersonStanding className="text-primary-500" size={16} />
                      <span className="text-gray-300">50+ Transformations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="text-primary-500" size={16} />
                      <span className="text-gray-300">Personalized Coaching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="text-primary-500" size={16} />
                      <span className="text-gray-300">Goal-oriented Programs</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-300">
                    I've helped hundreds of clients achieve their fitness goals, from weight loss and muscle gain to competition preparation. As a competitive bodybuilder myself, I understand the dedication and consistency required to transform your physique.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div variants={itemVariants} className="flex flex-col space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">My <span className="text-primary-500">Journey</span></h2>
                  <div className="space-y-6 text-gray-300">
                    <p>
                      Hi, I'm Michelle Oliveira—fitness and nutrition coach, posing coach, competitor, and the founder of Fit by Mi. I created this coaching space to be more than just workouts and meal plans. This is about empowerment, confidence, and building the strongest version of you—inside and out.
                    </p>
                    
                    {/* Image Carousel - Positioned between text blocks */}
                    <div className="max-w-4xl mx-auto">
                      <div className="relative overflow-hidden rounded-xl shadow-2xl">
                        {/* Carousel Images with Motion */}
                        <div className="h-[300px] md:h-[400px] relative">
                          <motion.div
                            key={currentImage}
                            className="absolute inset-0 w-full h-full"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={imageVariants}
                          >
                            <img 
                              src={carouselImages[currentImage].src}
                              alt={carouselImages[currentImage].alt}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          
                          {/* Caption */}
                          <div className="absolute bottom-0 left-0 right-0 bg-dark-950/75 backdrop-blur-sm p-4">
                            <p className="text-white text-center">
                              {carouselImages[currentImage].alt}
                            </p>
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <button
                          onClick={prevImage}
                          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-dark-900/80 hover:bg-primary-600 transition-colors duration-300 p-2 rounded-full"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="text-white" size={24} />
                        </button>
                        
                        <button
                          onClick={nextImage}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-dark-900/80 hover:bg-primary-600 transition-colors duration-300 p-2 rounded-full"
                          aria-label="Next image"
                        >
                          <ChevronRight className="text-white" size={24} />
                        </button>
                        
                        {/* Pagination Dots */}
                        <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
                          {carouselImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImage(index)}
                              className={`w-2 h-2 rounded-full ${index === currentImage ? 'bg-primary-500' : 'bg-white/50'}`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      I was born and raised in Brazil, and I bring that passion, energy, and resilience into everything I do. As a trilingual coach (English, Portuguese, and Spanish), I'm proud to serve a diverse community of women and men around the world. My clients say they feel seen, heard, and supported—and that's exactly the experience I aim to deliver.
                    </p>
                    
                     {/* Education Box */}
                     <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 md:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="rounded-lg text-primary-500">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">Education</h4>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="rounded-lg">
                          <p className="font-medium">B.S. Ag Engineering</p>
                          <p className="text-gray-400 text-sm">University of São Paulo</p>
                        </div>
                        <div className="rounded-lg">
                          <p className="font-medium">B.A. Education</p>
                          <p className="text-gray-400 text-sm">University of São Paulo</p>
                        </div>
                        <div className="rounded-lg">
                          <p className="font-medium">M.S. Plant Sciences</p>
                          <p className="text-gray-400 text-sm">University of Florida</p>
                        </div>
                        <div className="rounded-lg">
                          <p className="font-medium">Ph.D. Plant Sciences</p>
                          <p className="text-gray-400 text-sm">University of Florida</p>
                        </div>
                      </div>
                    </div>

                     {/* NASM Certifications Row */}
                    <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="rounded-lg text-primary-500">
                          <Certificate size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">NASM Certified</h4>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <Dumbbell className="text-primary-500" size={16} />
                          <span className="text-gray-300">Certified Personal Trainer</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Apple className="text-primary-500" size={16} />
                          <span className="text-gray-300">Certified Nutrition Coach</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Video className="text-primary-500" size={16} />
                          <span className="text-gray-300">Online Coach</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronsUp className="text-primary-500" size={16} />
                          <span className="text-gray-300">Performance Enhancement Coach</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Details Section - Redesigned for better mobile experience */}
        <section className="py-20 bg-dark-950" ref={missionRef}>
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-12 text-center">My <span className="text-primary-500">Philosophy</span></h2>
                
                {/* Cards Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Why I Do What I Do Card */}
                  <motion.div 
                    className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="p-6 border-b-2 border-dark-700">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Heart className="mr-3 text-primary-500" size={24} />
                        Why I Do What I Do
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 leading-relaxed">
                        Because I know what it feels like to want change but not know where to start. I've walked the road of transformation myself, and now I help others walk theirs—with structure, heart, and accountability. Coaching is my calling, and watching clients grow in strength and confidence lights me up every single day.
                      </p>
                    </div>
                  </motion.div>

                  {/* What I Care About Card */}
                  <motion.div 
                    className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="p-6 border-b-2 border-dark-700">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Target className="mr-3 text-primary-500" size={24} />
                        What I Care About
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 leading-relaxed">
                        I care about helping people rewrite their stories—breaking free from diet culture, insecurity, and the belief that they have to do it all alone. I care about lasting change, not quick fixes. My mission is to guide my clients toward results they can sustain—physically, emotionally, and mentally.
                      </p>
                    </div>
                  </motion.div>

                  {/* Core Values Card */}
                  <motion.div 
                    className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="p-6 border-b-2 border-dark-700">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Award className="mr-3 text-primary-500" size={24} />
                        Core Values
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <li className="flex items-center">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">Empowerment through consistency</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">Body-positive coaching</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">Deep personal connection</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">Authenticity and honesty</span>
                        </li>
                        <li className="flex items-center sm:col-span-2">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">Celebrating wins—big and small</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* My Mission Card */}
                  <motion.div 
                    className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="p-6 border-b-2 border-dark-700">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Dumbbell className="mr-3 text-primary-500" size={24} />
                        My Mission
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 leading-relaxed">
                        To empower every person I coach to feel strong, confident, and proud of the skin they're in—without extremes, without shame, and without doing it alone. Through Fit by Mi, I'm here to guide, encourage, and uplift you every step of the way.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* What Makes Me Different */}
                <motion.div 
                  className="mt-12 bg-gradient-to-r from-dark-800 to-dark-900 p-8 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-center">What Makes Me <span className="text-primary-500">Different</span></h3>
                  <p className="text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                    I blend the discipline of a competitor with the compassion of someone who truly listens. I coach with heart, grit, and a whole lot of joy. I don't just write plans—I build relationships, tailored to your real life. This is coaching with soul, built to last.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default AboutPage;