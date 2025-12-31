import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import whiteBottleHero from '../assets/images/小白瓶_IPE.EPA鱼油.jpg';
import blackBottleHero from '../assets/images/小黑瓶_Women40+.jpg';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      id: 'white-bottle',
      src: whiteBottleHero,
      alt: "MedNutro IPE EPA White Bottle",
      bgColor: "bg-brand-blue"
    },
    {
      id: 'black-bottle',
      src: blackBottleHero,
      alt: "MedNutro Women's 40+ Beauty Formula",
      bgColor: "bg-brand-purple"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); 

    return () => clearInterval(timer);
  }, []);

  const currentTheme = heroImages[currentImageIndex].bgColor;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] transition-colors duration-1000"
      aria-label="Introduction"
    >
      {/* Dynamic Ambient Background based on Product */}
      <AnimatePresence>
        <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`absolute inset-0 ${currentTheme === 'bg-brand-blue' ? 'bg-[#1e3a8a]' : 'bg-[#2e1065]'}`}
            aria-hidden="true"
        />
      </AnimatePresence>

      {/* Decorative Glows */}
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <div className={`absolute w-[600px] h-[600px] rounded-full blur-[100px] -top-20 -left-20 animate-pulse-slow transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}></div>
        <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] bottom-0 right-0 animate-pulse-slow transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'bg-cyan-500/20' : 'bg-pink-500/20'}`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Eyebrow text */}
          <p className={`uppercase tracking-[0.2em] text-sm mb-4 font-bold transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'text-blue-300' : 'text-purple-300'}`}>
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6 text-white">
            {t('hero.title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {t('hero.title_highlight')}
            </span> <br />
            {t('hero.title_2')}
          </h1>
          <div className={`h-px w-24 mb-8 transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'bg-blue-500' : 'bg-purple-500'}`} role="presentation"></div>
          <p className="text-xl text-gray-300 font-light mb-8 max-w-lg">
            {t('hero.tagline')}
          </p>
          <button 
            className={`group relative px-8 py-3 overflow-hidden rounded-full bg-white font-semibold tracking-wide transition-all focus:outline-none ${currentTheme === 'bg-brand-blue' ? 'text-blue-900 hover:bg-blue-50' : 'text-purple-900 hover:bg-purple-50'}`}
            aria-label={`${t('hero.cta')} - Learn more about MedNutro science`}
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10 ${currentTheme === 'bg-brand-blue' ? 'bg-blue-600' : 'bg-purple-600'}`} aria-hidden="true"></div>
          </button>
        </motion.div>

        {/* 3D Product Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] flex items-center justify-center w-full"
          role="region"
          aria-label="Product Showcase Carousel"
        >
          {/* Abstract Orbit Rings - Colors match product */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute w-[400px] h-[400px] border rounded-full transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'border-blue-400/20' : 'border-purple-400/20'}`}
            aria-hidden="true"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute w-[300px] h-[300px] border rounded-full transition-colors duration-1000 ${currentTheme === 'bg-brand-blue' ? 'border-cyan-400/20' : 'border-pink-400/20'}`}
            aria-hidden="true"
          ></motion.div>

          {/* Product Image Container */}
          <div className="relative z-10 w-64 md:w-80 aspect-[3/4] flex items-center justify-center">
            {/* 
              Using AnimatePresence without mode='wait' allows images to overlap during transition.
              We use absolute positioning to stack them.
            */}
            <AnimatePresence>
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.9, y: 20, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20, rotateY: -10 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                    {/* Shadow Blob */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-10 rounded-full blur-xl ${currentTheme === 'bg-brand-blue' ? 'bg-black/50' : 'bg-black/60'}`}></div>
                    
                    {/* Image */}
                    <img
                        src={heroImages[currentImageIndex].src}
                        alt={heroImages[currentImageIndex].alt}
                        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                        // Fallback in case image fails to load
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                    {/* Fallback Placeholder Text if Image Fails */}
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-center p-4">
                       <span className="text-xs text-white/50">{heroImages[currentImageIndex].alt}<br/>(Image Not Found)</span>
                    </div>
                </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-20 flex gap-3 z-20">
            {heroImages.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                        idx === currentImageIndex 
                        ? (currentTheme === 'bg-brand-blue' ? 'bg-blue-400 w-8' : 'bg-purple-400 w-8') 
                        : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                    aria-label={`Show product ${idx + 1}`}
                />
            ))}
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">{t('hero.scroll')}</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};
