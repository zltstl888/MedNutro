import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import globalMap from '../assets/images/全球引擎2.png';

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

  const locations: Location[] = [
    { id: 'ca', nameKey: 'global.can_title', descKey: 'global.can_desc', x: 24, y: 40, svgX: 240, svgY: 205 },
    { id: 'dc', nameKey: 'global.usa_title', descKey: 'global.usa_desc', x: 37, y: 41, svgX: 370, svgY: 210 },
    { id: 'ch', nameKey: 'global.swiss_title', descKey: 'global.swiss_desc', x: 60, y: 42, svgX: 600, svgY: 215 },
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
            <svg viewBox="0 0 1000 500" className="w-full h-full drop-shadow-2xl">
              <defs>
                {/* Gradient for connecting lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
                
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <image
                href={globalMap}
                x="0"
                y="0"
                width="1000"
                height="500"
                preserveAspectRatio="xMidYMid slice"
                opacity="0.95"
              />

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
                      <div className="absolute w-full h-full bg-brand-blue/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
                      <div className="absolute w-4 h-4 bg-brand-blue/50 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
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

          {/* Bottom HUD Text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[10px] text-brand-blue uppercase tracking-[0.35em] mb-1">GLOBAL LAYOUT 3</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-[0.35em] mb-1">QUALITY BENCHMARK</div>
            <div className="text-xl font-bold font-serif text-white/90">Clinical Grade+</div>
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
      
      {/* Animated Flowing Dash */}
      <motion.path 
        d={path} 
        fill="none" 
        stroke="url(#lineGradient)" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
        animate={{ strokeDashoffset: [0, -32], opacity: [0.2, 0.9, 0.2] }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "linear",
          delay: delay,
          repeatDelay: 0
        }}
        filter="url(#glow)"
      />
    </g>
  );
};
