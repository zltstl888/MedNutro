import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface Location {
  id: string;
  nameKey: string;
  descKey: string;
  x: number; // percentage 0-100 relative to container
  y: number; // percentage 0-100 relative to container
  svgX: number; // exact coordinate for SVG line connection (based on 1000x500 viewBox)
  svgY: number;
}

export const GlobalEngine: React.FC = () => {
  const { t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // Adjusted coordinates for the new detailed map projection
  const locations: Location[] = [
    { id: 'ca', nameKey: 'global.can_title', descKey: 'global.can_desc', x: 20, y: 30, svgX: 200, svgY: 150 },
    { id: 'us', nameKey: 'global.usa_title', descKey: 'global.usa_desc', x: 27, y: 38, svgX: 270, svgY: 190 },
    { id: 'ch', nameKey: 'global.swiss_title', descKey: 'global.swiss_desc', x: 50.5, y: 31, svgX: 505, svgY: 155 },
  ];

  return (
    <section id="global" className="py-24 bg-[#030917] text-white overflow-hidden relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-white mb-4"
          >
            {t('global.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-blue/60 max-w-2xl mx-auto text-lg"
          >
            {t('global.desc')}
          </motion.p>
        </div>

        {/* Map Container */}
        <div className="relative w-full aspect-[1.8/1] md:aspect-[2/1] bg-[#050C1F]/50 backdrop-blur-sm rounded-3xl border border-white/5 shadow-2xl overflow-hidden group">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* 
              ViewBox 0 0 1000 500 covers the world map area.
            */}
            <svg viewBox="0 0 1000 500" className="w-full h-full drop-shadow-2xl">
              <defs>
                {/* Gradient for connecting lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
                
                {/* Dot Pattern for "Tech" Continent Fill */}
                <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" className="fill-brand-blue/20" />
                </pattern>

                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* World Map Group - More detailed paths */}
              <g className="stroke-none">
                 {/* North America */}
                 <path 
                   d="M160,70 L250,60 L350,70 L380,110 L320,150 L280,180 L260,230 L220,240 L190,200 L150,180 L120,120 L160,70 Z M100,70 L130,60 L140,80 L110,90 Z" 
                   fill="url(#dotPattern)" 
                   className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                 />
                 
                 {/* South America */}
                 <path 
                   d="M260,245 L320,245 L360,280 L340,380 L300,430 L280,450 L260,350 L240,280 Z" 
                   fill="url(#dotPattern)"
                   className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                 />

                 {/* Europe & Asia (Combined for smoother visual) */}
                 <path 
                   d="M440,110 L500,80 L600,70 L750,70 L850,90 L900,150 L850,220 L750,260 L650,240 L600,200 L550,180 L520,150 L480,160 L460,140 Z" 
                   fill="url(#dotPattern)"
                   className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                 />
                 {/* Japan */}
                 <path d="M860,160 L890,150 L900,190 L870,200 Z" fill="url(#dotPattern)" className="opacity-80" />
                 {/* UK */}
                 <path d="M430,100 L450,90 L460,120 L440,130 Z" fill="url(#dotPattern)" className="opacity-80" />

                 {/* Africa */}
                 <path 
                   d="M450,180 L540,180 L570,240 L540,350 L500,380 L460,280 L440,220 Z" 
                   fill="url(#dotPattern)"
                   className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                 />

                 {/* Australia */}
                 <path 
                   d="M780,320 L880,310 L900,380 L800,400 Z" 
                   fill="url(#dotPattern)"
                   className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                 />
              </g>

              {/* Connections Layer */}
              <g className="pointer-events-none">
                 {/* CA to CH */}
                 <AnimatedConnection x1={locations[0].svgX} y1={locations[0].svgY} x2={locations[2].svgX} y2={locations[2].svgY} curvature={-60} delay={0} />
                 {/* US to CH */}
                 <AnimatedConnection x1={locations[1].svgX} y1={locations[1].svgY} x2={locations[2].svgX} y2={locations[2].svgY} curvature={60} delay={1.5} />
                 {/* CA to US (Local) */}
                 <AnimatedConnection x1={locations[0].svgX} y1={locations[0].svgY} x2={locations[1].svgX} y2={locations[1].svgY} curvature={-30} delay={3} />
              </g>

            </svg>
          </div>

          {/* HTML Overlay for Interactive Dots (Better Accessibility & Handling) */}
          <div className="absolute inset-0 pointer-events-none">
             {locations.map((loc) => (
                <div 
                  key={loc.id}
                  className="absolute pointer-events-auto"
                  style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  onMouseEnter={() => setActiveLocation(loc.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                   {/* Interactive Node */}
                   <div className="relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center cursor-pointer group">
                      {/* Outer Ring Animation */}
                      <div className="absolute w-full h-full bg-brand-blue/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                      <div className="absolute w-4 h-4 bg-brand-blue/40 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] group-hover:scale-125 transition-transform duration-300 relative z-10"></div>
                      
                      {/* Label Label */}
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center opacity-70 group-hover:opacity-100 transition-all duration-300">
                         <div className="w-6 h-px bg-brand-blue/50 mr-2"></div>
                         <span className="text-xs font-bold tracking-widest text-white whitespace-nowrap drop-shadow-md">
                            {t(loc.nameKey).split(' ')[0]}
                         </span>
                      </div>
                   </div>

                   {/* Hover Tooltip */}
                   <AnimatePresence>
                     {activeLocation === loc.id && (
                       <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 10 }}
                         className="absolute top-0 left-10 z-50 w-72"
                       >
                          <div className="bg-[#0B1120]/95 backdrop-blur-xl border border-brand-blue/40 p-5 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                             {/* Decorative shimmer */}
                             <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue"></div>
                             <div className="absolute -right-10 -top-10 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl"></div>

                             <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">{t(loc.nameKey)}</h4>
                             <p className="text-xs text-gray-300 leading-relaxed font-light">{t(loc.descKey)}</p>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
          </div>

          {/* HUD Elements - Updated for customer meaningfulness */}
          <div className="absolute bottom-8 left-8 flex gap-8 pointer-events-none">
             <div>
                <div className="text-xs text-brand-blue uppercase tracking-[0.2em] mb-1">{t('global.stat_hubs')}</div>
                <div className="text-xl font-bold font-serif">3</div>
             </div>
             <div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-1">{t('global.stat_quality')}</div>
                <div className="text-xl font-bold font-serif">{t('global.val_quality')}</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component for animated SVG lines
const AnimatedConnection: React.FC<{ x1: number, y1: number, x2: number, y2: number, curvature: number, delay: number }> = ({ x1, y1, x2, y2, curvature, delay }) => {
  // Quadratic Bezier Calculation
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx = mx;
  const cy = my - curvature; // Curve control point

  const path = `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;

  return (
    <g>
      {/* Base faint line */}
      <path d={path} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      
      {/* Animated Glowing Packet */}
      <motion.path 
        d={path} 
        fill="none" 
        stroke="url(#lineGradient)" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 1" 
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{ 
            pathLength: [0, 0.4, 0], // Grow then shrink
            pathOffset: [0, 0.6, 1], // Move along path
            opacity: [0, 1, 0] // Fade in/out
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay,
          repeatDelay: 0.5
        }}
        filter="url(#glow)"
      />
    </g>
  );
};