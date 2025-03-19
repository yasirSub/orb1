"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaRobot, FaLaptopCode, FaCode, FaPaintBrush, FaMobileAlt, FaSearch, FaCamera, FaVideo } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Check for dark mode on client side
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    setDarkMode(isDarkMode);
    
    // Listen for changes to the dark mode class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark-mode');
          setDarkMode(isDarkMode);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const services = [
    { icon: FaRobot, name: 'AI Solutions', color: 'bg-indigo-500', link: '/services/ai-solutions' },
    { icon: FaLaptopCode, name: 'Software Dev', color: 'bg-cyan-600', link: '/services/software-development' },
    { icon: FaCode, name: 'Web Development', color: 'bg-blue-600', link: '/services/web-development' },
    { icon: FaSearch, name: 'SEO Services', color: 'bg-green-600', link: '/services/seo-services' },
    { icon: FaPaintBrush, name: 'UI/UX Design', color: 'bg-amber-500', link: '/services/ui-ux-design' },
    { icon: FaMobileAlt, name: 'Mobile Apps', color: 'bg-slate-500', link: '/services/mobile-apps' },
    { icon: FaCamera, name: 'Photography', color: 'bg-rose-500', link: '/services/photography' },
    { icon: FaVideo, name: 'Video Production', color: 'bg-purple-500', link: '/services/video-production' },
  ];

  return (
    <section className="relative bg-background py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="heading-lg mb-6"
              variants={fadeInUp}
            >
              We Build{' '}
              <span className="text-primary">AI Solutions</span>,{' '}
              <span className="text-green-600">Boost SEO</span>{' '}
              & Create Digital Experiences
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-secondary mb-8"
              variants={fadeInUp}
            >
              Transform your vision into reality with our expert team. From cutting-edge AI to rapid software development, 
              SEO optimization, and creative content production, we deliver high-quality solutions within your budget and timeline.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="btn-primary">
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/portfolio" className="btn-secondary">
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Service Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + (index * 0.1) } 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={service.link}
                    className={`flex items-center px-4 py-2 rounded-full ${service.color} text-white text-sm font-medium`}
                  >
                    <service.icon className="mr-2 h-4 w-4" />
                    {service.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* 3D-like layered effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6 scale-95" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl transform rotate-3 scale-97" />
              
              {/* Main image */}
              <div className="relative bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-custom-lg border border-[var(--border-color)]">
                <Image
                  src={darkMode 
                    ? "https://placehold.co/600x600/1e293b/f8fafc?text=Software+Solutions" 
                    : "https://placehold.co/600x600/f8fafc/0f172a?text=Software+Solutions"
                  }
                  alt="Software Solutions"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-6 left-6 bg-white/90 dark:bg-slate-800/90 p-4 rounded-lg shadow-md"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <FaRobot className="h-8 w-8 text-indigo-500" />
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-800/90 p-4 rounded-lg shadow-md"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <FaLaptopCode className="h-8 w-8 text-cyan-600" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 p-4 rounded-lg shadow-md"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <FaSearch className="h-8 w-8 text-green-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 