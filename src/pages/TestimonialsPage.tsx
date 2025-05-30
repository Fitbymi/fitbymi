import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, BookOpenCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Roy B.",
    star: 5,
    text: "I notice an improvement in the development of my overall legs. Michelle makes sure that you don't give up and that you complete your sets and reps."
  },
  {
    id: 2,
    name: "Allison G.",
    star: 5,
    text: "Michelle is very committed to helping her clients succeed at working out. She is calm and motivational, I feel at ease working out with her. I know she will excel at her career in this field and I am so proud to say I am one of her first clients :) I already notice a difference in my strength and can't wait to reach my goals with Michelle!"
  },
  {
    id: 3,
    name: "Glenda S.",
    star: 5,
    text: "Michelle is very personable and knowledgeable. She tailors my workouts to best suit my needs and ailments for every session. I have already become leaner and stronger in the short time working with Michelle. She is a great coach and model of fitness!"
  },
  {
    id: 4,
    name: "Maria R.",
    star: 5,
    text: "She know exactly how to targeted my concerns !!"
  },
  {
    id: 5,
    name: "Thomas M.",
    star: 5,
    text: "Michelle is an excellent trainer to work with. I feel confident with her that I will hit my goal and that I will feel much better when I do. I believe Michelle is an asset to the company because she takes her work very serious and she takes her time and she gives you good information and if she doesn't know she'll find out and get back with you. I thank Michelle because she has motivated me to want to work out even when we don't have a scheduled time. Thank you Michelle."
  },
  {
    id: 6,
    name: "Unim R.",
    star: 5,
    text: "Michelle, is very Knowledgeable. She taught me how I can still eat and meet my goals. I use to think I had to eat a low carb diet or not eat much to lose weight. I hope to work with her again in the near future."
  },
  {
    id: 7,
    name: "Geunjoo C.",
    star: 5,
    text: "I didn't know anything about working out at first, but after meeting Michelle, it became fun and I felt myself getting stronger with each repetition. I am so grateful to Michelle for giving me the confidence that I can be healthy through exercise, and it's all because she guided me. She had a good grasp of what I needed and what I wanted, and all I had to do was just following her. The experience so far has been very successful and I look forward to upcoming time with her. Thank you, Michelle!"
  },
  {
    id: 8,
    name: "Susan H.",
    star: 5,
    text: "She challenges me to lift heavier, try new exercises and push through hard sets. At the same time she is very positive and encouraging. She praises my efforts and helps me to feel good about the work I'm doing. She is very knowledgeable about the machines and how slight modifications change the muscle being used. She is also very good at assessing my form and how I can approve - posture, balance, flexibility. I love how I feel physically and mentally about myself after working with Michelle."
  },
  {
    id: 9,
    name: "Gwen B.",
    star: 5,
    text: "Michelle is a very attentive and knowledgeable Trainer. My time with her is a priority and that is clear because she is never on her phone, her attention and focus is on me, and she ensures that I don't push myself so hard that I lose good quality form. She challenges me each session, but is strategic about what I am lifting, and makes modifications and adjustments throughout our session when needed. She is very positive and also very patient with me when my schedule is inconsistent, as I am a new mom. She's good at checking in without being overbearing on the times we have gaps between training sessions. I often am in there, while others are getting trained in the gym, and I count my blessings that I have her as my trainer. I know others are not getting this level of support, even though they are paying the same amount for training services."
  },
  {
    id: 10,
    name: "Allison G.",
    star: 5,
    text: "Michelle was the best. She gave me all the tools I needed to achieve my fitness and nutrition goals. After a year of working together, I feel confident in my own skin and compelled to continue everything she taught me. She's kind, personable, motivating, and pushes you to do your best during every session."
  },
  {
    id: 11,
    name: "Rob S.",
    star: 5,
    text: "Working with Michelle was a great experience. She wore me out on every one of our 1:1 sessions, had good workouts for me to do throughout the week, and was focused on the goals I wanted to achieve."
  },
  {
    id: 12,
    name: "Francisco A.",
    star: 5,
    text: "Michelle has been an amazing trainer and motivator for my health journey! She is thoughtful and attentive to my needs. I could not be happier with her services."
  },
  {
    id: 13,
    name: "Anna Z.",
    star: 5,
    text: "I initiated my training program in mid December and after just 2 sessions my holiday getaway stopped in person training. Michelle took the time and delivered by text and email training I could do on my own while away.\nI also revealed to Michelle that I was having moderate to severe lower back pain and was scheduled for an MRI in February. The pain was interfering with my sleep and daily activities. My family doctor suggested that I pause training but I suggested to Michelle that we should continue with training which would not put stress on the lower back.\nIn two months and by the time the MRI was completed my pain had reduced from a previous 9-10 to 3,4,5.\nThe Doctor referred me to PT the most conservative intervention. I attribute the significance in pain reduction to Michelle's individualized weight training program. Cheers and gratitude to Michelle."
  },
  {
    id: 14,
    name: "Jeff H.",
    star: 5,
    text: "Before I started working with Michelle I would workout, but I had no real plan other than 'hitting the machines'. Michelle has taught me so much, including proper technique and makes sure I get the most out of my workouts. The proof is in the results. Six months in I've lost fat, gained muscle, and feeling great. I played golf a few times this month and I'm definitely hitting the ball much farther. Thank you Michelle!"
  },
  {
    id: 15,
    name: "Monica H.",
    star: 5,
    text: "Aumente mi peso y bajo mi grasa corporal me siento mucho mejor física y emocionalmente porque estába perdiendo mucha masa muscular."
  }
];

const TestimonialsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const itemsPerPage = isMobile ? 1 : 2; // Changed from 3 to 2
      if (prev === 0) {
        return Math.floor((testimonials.length - 1) / itemsPerPage) * itemsPerPage;
      }
      return Math.max(0, prev - itemsPerPage);
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const itemsPerPage = isMobile ? 1 : 2; // Changed from 3 to 2
      if (prev + itemsPerPage >= testimonials.length) {
        return 0;
      }
      return prev + itemsPerPage;
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 }
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

  // Create groups of testimonials based on screen size
  const getVisibleTestimonials = () => {
    const itemsPerPage = isMobile ? 1 : 2; // Changed from 3 to 2
    const startIdx = activeIndex;
    const endIdx = Math.min(startIdx + itemsPerPage, testimonials.length);
    return testimonials.slice(startIdx, endIdx);
  };

  const itemsPerPage = isMobile ? 1 : 2; // Changed from 3 to 2
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentPage = Math.floor(activeIndex / itemsPerPage);

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main className="flex-1 pt-24">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-dark-900"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <BookOpenCheck className="inline-block mr-3 text-primary-500" size={36} />
                What My Clients Say
              </h1>
              <p className="text-gray-300">
                Here's what my clients have to say about their transformation journeys.
              </p>
            </div>
          </div>
          
          <section id="testimonials" className="section-padding" ref={ref}>
          <div className="container">
            <div className="relative max-w-5xl mx-auto">
              {/* Testimonial Grid */}
              <AnimatePresence mode="wait">
                <div 
                  key={activeIndex}
                  className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-8`}
                >
                  {getVisibleTestimonials().map((testimonial) => (
                    <motion.div 
                      key={testimonial.id} 
                      className="p-6 bg-dark-800 rounded-xl h-full flex flex-col"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                          <div className="flex mt-1">
                            {[...Array(testimonial.star)].map((_, i) => (
                              <Star key={i} className="text-yellow-500" size={16} fill="#EAB308" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 italic flex-1">
                        "{testimonial.text}"
                      </blockquote>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {/* Navigation Buttons - only show if there are multiple pages */}
              {totalPages > 1 && (
                <>
                  <button 
                    className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 shadow-lg z-10"
                    onClick={handlePrev}
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 shadow-lg z-10"
                    onClick={handleNext}
                    aria-label="Next testimonials"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Pagination Dots - only show if there are multiple pages */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentPage ? 'bg-primary-600' : 'bg-dark-700'
                      }`}
                      onClick={() => setActiveIndex(index * itemsPerPage)}
                      aria-label={`Go to testimonial page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default TestimonialsPage;