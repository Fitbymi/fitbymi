import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Coffee, Dumbbell, ShoppingBag, Utensils, Handshake } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Partner {
  name: string;
  description: string;
  link: string;
  code: string;
  category: string;
  image: string;
}

// Partner images
const partnerImages = {
  SteelFit: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=600",
  AngelCompetition: "https://images.pexels.com/photos/4046704/pexels-photo-4046704.jpeg?auto=compress&cs=tinysrgb&w=600",
  ShoeFairy: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg",
  ZillaMeals: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
  TeamFitLife: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600",
  Nuethix: "https://live.staticflickr.com/4649/28192624949_b6a0d5c4f9.jpg",
  Prozis: "https://static.sscontent.com/thumb/750/750/products/124/v1377463_prozis_creatine-creapure-300-g_newin.webp",
  Buckedup: "https://images.pexels.com/photos/3821871/pexels-photo-3821871.jpeg?auto=compress&cs=tinysrgb&w=600",
};

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'Supplements & Nutrition':
      return <Utensils className="text-primary-500" size={24} />;
    case 'Competition Wear':
      return <ShoppingBag className="text-primary-500" size={24} />;
    case 'Fitness':
      return <Dumbbell className="text-primary-500" size={24} />;
    case 'Nutrition':
      return <Coffee className="text-primary-500" size={24} />;
    default:
      return <ExternalLink className="text-primary-500" size={24} />;
  }
};

const partners: Partner[] = [
  {
    name: "SteelFit",
    description: "Topical Creams",
    link: "https://steelfitusa.com/MICHELLE",
    code: "Michelle",
    category: "Supplements & Nutrition",
    image: partnerImages.SteelFit
  },
  {
    name: "Angel Competition Bikinis",
    description: "Competition Wear",
    link: "https://angelcompetitionbikinis.com?dt_id=2320020",
    code: "MichelleO",
    category: "Competition Wear",
    image: partnerImages.AngelCompetition
  },
  {
    name: "The Shoe Fairy",
    description: "Competition Footwear",
    link: "https://shoefairyofficial.com/?ref=xifkcysh",
    code: "Mi10",
    category: "Competition Wear",
    image: partnerImages.ShoeFairy
  },
  {
    name: "Zilla Meals",
    description: "Meal Prep Services",
    link: "https://zilla-meals.com/michelleoliveira",
    code: "Michelle10",
    category: "Nutrition",
    image: partnerImages.ZillaMeals
  },
  {
    name: "Team Fit Life",
    description: "Fitness Community",
    link: "https://team-fit-life.com/",
    code: "Michelle10",
    category: "Fitness",
    image: partnerImages.TeamFitLife
  },
  {
    name: "Nuethix Formulations",
    description: "Supplements",
    link: "https://nuethix.com/?rfsn=8011637.a25284&utm_source=refersion&utm_medium=affiliate&utm_campaign=8011637.a25284",
    code: "M10",
    category: "Supplements & Nutrition",
    image: partnerImages.Nuethix
  },
  {
    name: "Prozis Nutrition",
    description: "Supplements & Nutrition",
    link: "https://www.prozis.com/1vN1P",
    code: "FitByMi10",
    category: "Supplements & Nutrition",
    image: partnerImages.Prozis
  },
  {
    name: "Buckedup",
    description: "Supplements",
    link: "https://bckd.co/OFyJWUY",
    code: "MSO20",
    category: "Supplements & Nutrition",
    image: partnerImages.Buckedup
  }
];

// Group partners by category
const groupedPartners = partners.reduce((acc, partner) => {
  if (!acc[partner.category]) {
    acc[partner.category] = [];
  }
  acc[partner.category].push(partner);
  return acc;
}, {} as Record<string, Partner[]>);

// Order of categories to display
const categoryOrder = [
  "Supplements & Nutrition", 
  "Competition Wear", 
  "Fitness", 
  "Nutrition"
];

// Sort the categories
const sortedCategories = Object.keys(groupedPartners).sort((a, b) => {
  return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
});

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <div className="price-card bg-gradient-to-r from-dark-800 to-dark-900 transition-all duration-300 hover:scale-105 h-full flex flex-col overflow-hidden"
         style={{
           boxShadow: '0 0 20px rgba(255, 0, 0, 0.25)',
         }}>
      <div className="h-48 overflow-hidden rounded-md">
        <img 
          src={partner.image} 
          alt={partner.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{partner.name}</h3>
            <p className="text-gray-400">{partner.description}</p>
          </div>
        </div>
        
        {partner.code && (
          <div className="mb-4 flex items-center gap-2">
            <p className="text-sm text-gray-400">Use code:</p>
            <span className="font-mono font-bold text-primary-500 bg-dark-700 px-3 py-1 rounded-md">{partner.code}</span>
          </div>
        )}

        <div className="mt-auto w-full">
          <a 
            href={partner.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full py-3 text-sm font-semibold text-center rounded-md transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center"
            style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }}
          >
            Visit {partner.name}
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

interface CategoryCarouselProps {
  category: string;
  partners: Partner[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ category, partners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  const itemsPerPage = 1;
  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const showNavigation = partners.length > 1;

  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      scrollToIndex(activeIndex - 1);
    }
  };
  
  const scrollRight = () => {
    if (activeIndex < totalPages - 1) {
      setActiveIndex(activeIndex + 1);
      scrollToIndex(activeIndex + 1);
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.querySelector('.carousel-item')?.clientWidth || 0;
      const gap = 16; // gap between items
      container.scrollTo({
        left: index * (cardWidth + gap) * itemsPerPage,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.carousel-item')?.clientWidth || 0;
        const gap = 16;
        const newIndex = Math.round(scrollLeft / ((cardWidth + gap) * itemsPerPage));
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < totalPages) {
          setActiveIndex(newIndex);
        }
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, totalPages, itemsPerPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div ref={ref} className="mb-12">
      <div className="flex items-center justify-center mb-6">
        {getCategoryIcon(category)}
        <h2 className="text-2xl font-bold ml-3">
          {category}
        </h2>
      </div>

      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {partners.map((partner, index) => (
            <div 
              key={partner.name} 
              className="carousel-item flex-shrink-0 snap-center"
              style={{ width: isMobile ? '100%' : `calc(${100/itemsPerPage}% - ${16 * (itemsPerPage - 1) / itemsPerPage}px)` }}
            >
              <PartnerCard partner={partner} />
            </div>
          ))}
        </div>
        
        {/* Navigation buttons - only show if there are multiple items */}
        {showNavigation && (
          <>
            <button 
              onClick={scrollLeft} 
              className={`absolute top-1/3 left-4 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 shadow-lg z-10 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              disabled={activeIndex === 0}
              aria-label="Previous partners"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={scrollRight} 
              className={`absolute top-1/3 right-4 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 shadow-lg z-10 ${activeIndex >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              disabled={activeIndex >= totalPages - 1}
              aria-label="Next partners"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Pagination Dots - only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-primary-600' : 'bg-dark-700'
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  scrollToIndex(index);
                }}
                aria-label={`Go to partner page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PartnersPage: React.FC = () => {
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
        <section className="py-16 bg-dark-900" ref={ref}>
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <Handshake className="inline-block mr-3 text-primary-500" size={36} />
                Our <span className="text-primary-500">Partners</span>
              </h1>
              <p className="text-gray-300">
                I'm proud to partner with these amazing brands. Use my discount codes to save on your purchases!
              </p>
            </div>

            {/* 2x2 Grid Layout for Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {sortedCategories.map(category => (
                <CategoryCarousel 
                  key={category} 
                  category={category} 
                  partners={groupedPartners[category]} 
                />
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto text-center mt-16">
              <p className="text-gray-400 text-sm">
                Note: The discount codes are valid on the partner websites. I may receive a small commission from your purchases, which helps support my coaching work. Thank you for your support!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PartnersPage;