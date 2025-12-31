import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { Product } from '../types';
import { products } from '../products';
import whiteBottleDetail from '../assets/images/细胞平衡小白瓶详情页.jpg';
import blackBottleDetail from '../assets/images/女士焕能小黑瓶详情页.jpg';

export const ProductShowcase: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="py-0">
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} t={t} />
      ))}
    </section>
  );
};

const ProductSection: React.FC<{ product: Product; index: number; t: (key: string) => string }> = ({ product, index, t }) => {
  const isEven = index % 2 === 0;
  const isBlueTheme = product.colorTheme === 'blue';
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Specific Data for Chart (only used for white bottle)
  const purityData = [
    { name: t('prod.chart.common'), purity: 30, color: '#94a3b8' },
    { name: t('prod.chart.mednutro'), purity: 97, color: '#3b82f6' },
  ];

  return (
    <div className={`min-h-screen flex items-center py-20 relative overflow-hidden ${isBlueTheme ? 'bg-brand-blue/10 text-gray-800' : 'bg-[#1a0f2e] text-white'}`}>
      
      {/* Background Effects */}
      {isBlueTheme ? (
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent opacity-50"></div>
      ) : (
         <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full bg-purple-500/20 blur-xl"
                    style={{
                        width: Math.random() * 100 + 50 + 'px',
                        height: Math.random() * 100 + 50 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`
                    }}
                ></div>
            ))}
         </div>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`order-2 ${isEven ? 'md:order-1' : 'md:order-2'} min-w-0`}
          >
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
                isBlueTheme 
                ? 'bg-blue-100 text-blue-800 border-transparent' 
                : 'bg-purple-900/50 text-purple-200 border-purple-500/30'
            }`}>
              {t(product.badge)}
            </div>
            <h2 className={`text-5xl font-serif mb-6 ${isBlueTheme ? 'text-brand-purple' : 'text-white'}`}>
              {t(product.name)}
            </h2>
            <h3 className={`text-xl mb-8 ${isBlueTheme ? 'text-gray-500' : 'text-purple-200'}`}>
              {t(product.tagline)}
            </h3>
            
            {/* Description or Features List */}
            {product.description && (
                <p className={`mb-8 leading-relaxed ${isBlueTheme ? 'text-gray-700' : 'text-gray-400'}`}>
                    {t(product.description)}
                </p>
            )}

            {product.features && product.features.length > 0 && (
                <ul className="space-y-4 mb-10">
                    {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isBlueTheme ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                            <span className={isBlueTheme ? 'text-gray-700' : 'text-gray-300'}>{t(feat)}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Extra Content: Stats (Black Bottle) */}
            {product.stats && product.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {product.stats.map((stat, i) => (
                         <div key={i} className={`p-4 border rounded-lg backdrop-blur-sm ${
                            isBlueTheme ? 'bg-white border-blue-100' : 'bg-white/5 border-white/10'
                         }`}>
                            <span className={`block text-2xl font-bold mb-1 ${
                                i === 0 ? (isBlueTheme ? 'text-blue-600' : 'text-purple-400') : (isBlueTheme ? 'text-blue-400' : 'text-pink-400')
                            }`}>
                                {stat.value}
                            </span>
                            <span className="text-xs text-gray-400 uppercase">{t(stat.label)}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Extra Content: Chart (White Bottle specific) */}
            {product.id === 'white-bottle' && (
                 <div className="w-full bg-white p-6 rounded-xl shadow-xl border border-blue-100 mt-8">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">{t('prod.chart.title')}</h4>
                    {/* Explicit styling to ensure dimensions are present before hydration/render complete */}
                    <div style={{ width: '100%', height: 200, minHeight: 200 }}>
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                                <BarChart data={purityData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis type="number" domain={[0, 100]} hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#64748b'}} interval={0} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="purity" radius={[0, 4, 4, 0]} barSize={24}>
                                        {purityData.map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            )}
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative flex justify-center order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}
          >
             {product.id === 'white-bottle' ? (
                <WhiteBottleVisual t={t} />
             ) : (
                <BlackBottleVisual t={t} />
             )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Sub-components for unique visuals to preserve "LOOK AMAZING" quality
const WhiteBottleVisual: React.FC<{t: (key: string) => string}> = ({ t }) => (
    <div className="relative w-64 h-[400px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent"></div>
        <div className="text-center relative z-10 flex flex-col items-center">
            <h3 className="text-2xl font-serif text-brand-purple font-bold">IPE. EPA</h3>
            <p className="text-xs text-gray-500 uppercase mt-2">{t('prod.white.bottle_sub')}</p>
            <img
                src={whiteBottleDetail}
                alt={t('prod.white.title')}
                className="my-6 w-40 h-40 object-contain drop-shadow-2xl"
            />
            <p className="text-sm font-medium text-gray-800">{t('prod.white.bottle_badge')}</p>
        </div>
    </div>
);

const BlackBottleVisual: React.FC<{t: (key: string) => string}> = ({ t }) => (
    <div className="relative w-64 h-[400px] bg-black border border-purple-500/30 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center flex flex-col items-center">
            <h3 className="text-2xl font-serif text-white font-bold">{t('prod.black.bottle_name')}</h3>
            <p className="text-xs text-purple-300 uppercase mt-2">{t('prod.black.bottle_sub')}</p>
            <img
                src={blackBottleDetail}
                alt={t('prod.black.title')}
                className="my-6 w-40 h-40 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            />
            <p className="text-sm font-medium text-purple-200">{t('prod.black.tech')}</p>
        </div>
    </div>
);
