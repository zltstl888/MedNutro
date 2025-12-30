import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { BrandLogo } from './BrandLogo';

const languages: { code: Language; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'CN', label: '简体中文' },
  { code: 'HK', label: '繁體中文' },
];

export const StickyHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t('nav.origin'), href: '#origin' },
    { label: t('nav.global'), href: '#global' },
    { label: t('nav.solutions'), href: '#solutions' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Close language menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-purple/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo area */}
        <div className="flex items-center gap-2 cursor-pointer text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <BrandLogo className="h-12 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
             <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider group"
             >
                <Globe className="w-4 h-4 group-hover:text-brand-blue transition-colors" />
                <span>{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
             </button>

             {langMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-40 bg-[#1a0f2e]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                    {languages.map((lang) => (
                        <button 
                            key={lang.code}
                            onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between group
                                ${language === lang.code ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            <span className="font-medium">{lang.label}</span>
                            {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                        </button>
                    ))}
                </div>
             )}
          </div>

          <button className="px-6 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-brand-purple transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {t('nav.join')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-purple/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 h-screen">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-white font-serif"
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Language Selector */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Select Language</p>
            <div className="flex flex-wrap gap-3">
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            language === lang.code 
                            ? 'border-brand-blue text-brand-blue bg-brand-blue/10' 
                            : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                        }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
          </div>

          <button className="w-full py-3 bg-white text-brand-purple uppercase tracking-widest text-sm font-bold mt-4">
            {t('nav.join')}
          </button>
        </div>
      )}
    </nav>
  );
};
