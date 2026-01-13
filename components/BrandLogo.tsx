import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-12 w-auto" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 100" 
      fill="none"
      className={className}
      aria-label="MedNutro - Natural Balance"
    >
      {/* MédNutro Text - Using serif style font simulation with path-like styling */}
      <g fill="#737373" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '600' }}>
        <text x="5" y="60" fontSize="56" letterSpacing="-1">M</text>
        <text x="58" y="60" fontSize="56" letterSpacing="-1">é</text>
        <text x="88" y="60" fontSize="56" letterSpacing="-1">d</text>
        <text x="120" y="60" fontSize="56" letterSpacing="-1">N</text>
        <text x="162" y="60" fontSize="56" letterSpacing="-1">utro</text>
      </g>

      {/* The green leaf accent on the 'é' */}
      <path 
        d="M65 18 C 72 15, 82 15, 88 18 C 82 23, 72 23, 65 18 Z" 
        fill="#4CAF50" 
      />

      {/* Subtitle: Natural Balance */}
      <text 
        x="8" 
        y="85" 
        fontFamily="'Inter', sans-serif" 
        fontWeight="400" 
        fontSize="18" 
        letterSpacing="2" 
        fill="#A3A3A3"
      >
        Natural Balance
      </text>

      {/* Right side Graphic: Capsule and Swoosh */}
      <g opacity="0.8">
        {/* Swoosh Curve */}
        <path 
          d="M165 65 C 220 85, 280 80, 295 45" 
          stroke="#737373" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Capsule Shape */}
        <rect 
          x="285" y="25" width="12" height="28" rx="6" 
          fill="#737373" 
          transform="rotate(45, 291, 39)" 
        />
        
        {/* Small leaf on the capsule */}
        <path 
          d="M278 35 C 282 32, 286 32, 288 35 C 286 38, 282 38, 278 35 Z" 
          fill="#737373" 
        />
      </g>
    </svg>
  );
};
