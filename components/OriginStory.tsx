import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const OriginStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="origin" className="py-24 bg-white text-black relative overflow-hidden" aria-labelledby="origin-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative background box */}
            <div className="absolute inset-0 bg-brand-purple/10 transform translate-x-4 translate-y-4" aria-hidden="true"></div>
            <img
              src="https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?auto=format&fit=crop&q=80&w=800"
              alt="MedNutro Founder"
              className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Changed from h3 to span/div to avoid heading hierarchy issues before h2 */}
            <span className="block text-brand-purple text-sm uppercase font-bold tracking-widest mb-4">
              {t('origin.label')}
            </span>
            <h2 id="origin-title" className="text-4xl md:text-5xl font-serif mb-8 leading-tight whitespace-pre-line text-black">
              {t('origin.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6 font-light leading-relaxed">
              {t('origin.text')}
            </p>
            <blockquote className="border-l-4 border-brand-purple pl-6 py-2 my-8 italic text-xl text-gray-800 font-serif">
              {t('origin.quote')}
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};