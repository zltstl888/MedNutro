import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-purple text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 text-white">
                <BrandLogo className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 max-w-sm mb-8 font-light">
              {t('footer.text')}
            </p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder={t('footer.placeholder')} 
                className="bg-white/5 border border-white/10 px-4 py-2 rounded text-sm focus:outline-none focus:border-brand-blue text-white w-64"
              />
              <button className="px-6 py-2 bg-white text-brand-purple font-bold text-sm uppercase tracking-wide hover:bg-brand-blue transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>

          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-6">{t('footer.col_prod')}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_prod_1')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_prod_2')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_prod_3')}</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-6">{t('footer.col_co')}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_co_1')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_co_2')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_co_3')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.col_co_4')}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          {t('footer.copy')}
        </div>
      </div>
    </footer>
  );
};
