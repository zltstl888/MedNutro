import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-12 w-auto" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 280 80" 
      fill="none"
      className={className}
      aria-label="MedNutro - Natural Balance"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D1D5DB" /> {/* Silver/Gray */}
          <stop offset="100%" stopColor="#F3F4F6" /> {/* White-ish */}
        </linearGradient>
      </defs>

      {/* Main Brand Text: MédNutro */}
      <text 
        x="10" 
        y="48" 
        fontFamily="'Playfair Display', serif" 
        fontWeight="700" 
        fontSize="44" 
        fill="url(#logoGradient)"
        letterSpacing="-1"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
      >
        MédNutro
      </text>
      
      {/* Subtitle: Natural Balance */}
      <text 
        x="12" 
        y="70" 
        fontFamily="'Inter', sans-serif" 
        fontWeight="400" 
        fontSize="12" 
        letterSpacing="3" 
        fill="#9CA3AF"
      >
        NATURAL BALANCE
      </text>
      
      {/* Leaf/Organic Accent - Integrated simple shape */}
      <path 
        d="M225 35 C 235 25, 245 15, 250 12 C 255 15, 255 30, 245 40 C 240 42, 235 42, 225 35 Z" 
        fill="url(#logoGradient)" 
        opacity="0.9"
      />
      
      {/* Decorative Swoosh */}
      <path 
        d="M130 58 Q 200 65 250 45" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.5" 
        strokeLinecap="round"
      />
    </svg>
  );
};
