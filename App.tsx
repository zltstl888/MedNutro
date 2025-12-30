import React from 'react';
import { StickyHeader } from './components/StickyHeader';
import { HeroSection } from './components/HeroSection';
import { OriginStory } from './components/OriginStory';
import { GlobalEngine } from './components/GlobalEngine';
import { ProductShowcase } from './components/ProductShowcase';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const JoinButton = () => {
  const { t } = useLanguage();
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <button className="w-14 h-14 bg-brand-purple text-white rounded-full shadow-2xl flex items-center justify-center border border-white/20">
        <span className="text-[10px] font-bold text-center leading-tight">{t('nav.join')}</span>
      </button>
    </div>
  );
};

function AppContent() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased selection:bg-brand-purple selection:text-white relative">
      <StickyHeader />
      
      <main>
        <HeroSection />
        <OriginStory />
        <GlobalEngine />
        <ProductShowcase />
      </main>

      <JoinButton />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;