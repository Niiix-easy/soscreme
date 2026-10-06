import React from 'react';

interface BottleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showReflection?: boolean;
}

export const DyusarBottleGraphic: React.FC<BottleProps> = ({
  className = '',
  size = 'lg',
  showReflection = true,
}) => {
  const sizeClasses = {
    sm: 'w-36 h-64',
    md: 'w-48 h-80',
    lg: 'w-64 h-[420px]',
    xl: 'w-72 md:w-80 h-[480px]',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent blur-3xl rounded-full transform scale-90 pointer-events-none" />

      {/* SVG Bottle Vector Render */}
      <svg
        viewBox="0 0 320 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] filter transition-transform duration-500 hover:scale-[1.02]`}
        aria-label="Frasco Máscara S.O.S Capilar Antiemborrachamento Dyusar Professional 250ml"
        role="img"
      >
        <defs>
          {/* Bottle White Pearl Gradient */}
          <linearGradient id="bottleBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFE3E8" />
            <stop offset="12%" stopColor="#F9FAFB" />
            <stop offset="45%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#ECEFF3" />
            <stop offset="100%" stopColor="#BFC5CE" />
          </linearGradient>

          {/* Pump Nozzle Metallic & White */}
          <linearGradient id="pumpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DDE1E6" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#D0D5DD" />
            <stop offset="100%" stopColor="#98A2B3" />
          </linearGradient>

          {/* Gold Metallic Ring */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF8E1" />
            <stop offset="75%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#F5D061" />
          </linearGradient>

          {/* Burgundy Label Accent */}
          <linearGradient id="burgundyLabel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A2C3E" />
            <stop offset="50%" stopColor="#6C1E2D" />
            <stop offset="100%" stopColor="#4A121D" />
          </linearGradient>

          {/* Glossy Reflection Sheen */}
          <linearGradient id="glossSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Shadow Below */}
          <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="160" cy="510" rx="95" ry="18" fill="url(#baseShadow)" />

        {/* PUMP DISPENSER HEAD */}
        {/* Horizontal Nozzle */}
        <path
          d="M120 45 C120 38, 126 32, 134 32 L205 32 C210 32, 214 36, 215 41 L220 54 C221 57, 219 60, 216 60 L140 60 C132 60, 120 55, 120 45 Z"
          fill="url(#pumpGrad)"
        />
        {/* Nozzle spout tip */}
        <path d="M216 43 L238 48 C241 49, 241 53, 238 54 L216 57 Z" fill="#D0D5DD" />

        {/* Pump Stem */}
        <rect x="150" y="58" width="20" height="28" rx="2" fill="url(#pumpGrad)" />

        {/* Collar Neck */}
        <rect x="142" y="84" width="36" height="12" rx="3" fill="#BAC0CA" />

        {/* Metallic Gold Collar Ring */}
        <rect x="134" y="96" width="52" height="16" rx="4" fill="url(#goldMetallic)" stroke="#926B0E" strokeWidth="0.75" />
        <line x1="135" y1="104" x2="185" y2="104" stroke="#FFF9C4" strokeWidth="1" strokeOpacity="0.7" />

        {/* Screw Neck Upper Shoulder */}
        <path
          d="M136 112 L184 112 C194 112, 206 122, 210 134 L216 156 C218 162, 218 170, 218 178 L102 178 C102 170, 102 162, 104 156 L110 134 C114 122, 126 112, 136 112 Z"
          fill="url(#bottleBodyGrad)"
        />

        {/* BOTTLE CYLINDRICAL MAIN BODY */}
        <path
          d="M102 174 L218 174 L218 472 C218 484, 208 494, 196 494 L124 494 C112 494, 102 484, 102 472 Z"
          fill="url(#bottleBodyGrad)"
          stroke="#CED3DB"
          strokeWidth="1.2"
        />

        {/* Bottle Gloss Curve Highlight on Left Edge */}
        <path
          d="M106 178 L124 178 L124 484 C124 488, 120 491, 116 491 L110 488 C107 485, 106 480, 106 476 Z"
          fill="url(#glossSheen)"
        />

        {/* BOTTLE FRONT LABEL AREA */}
        <g id="BottleLabel">
          {/* Subtle Label Boundary */}
          <rect x="108" y="196" width="104" height="276" rx="4" fill="#FFFFFF" fillOpacity="0.88" />

          {/* DYUSAR BRAND LOGO & STAR */}
          {/* Gold Star Emblem */}
          <polygon
            points="160,208 163,215 171,215 165,219 167,226 160,222 153,226 155,219 149,215 157,215"
            fill="url(#goldMetallic)"
          />
          {/* Dyusar Wordmark */}
          <text
            x="160"
            y="238"
            textAnchor="middle"
            fill="#1A1C20"
            fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="12.5"
            letterSpacing="2.5"
          >
            DYUSAR
          </text>
          <text
            x="160"
            y="248"
            textAnchor="middle"
            fill="#697386"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="600"
            fontSize="6.2"
            letterSpacing="3"
          >
            PROFESSIONAL
          </text>

          {/* Burgundy / Rose Gold S.O.S Centerpiece */}
          {/* Decorative Divider Line */}
          <line x1="126" y1="258" x2="194" y2="258" stroke="#D1D5DB" strokeWidth="0.8" />

          {/* Clock Icon inside S.O.S */}
          <circle cx="160" cy="274" r="8" stroke="#8A2C3E" strokeWidth="1.2" fill="none" />
          <path d="M160 269 L160 274 L163 274" stroke="#8A2C3E" strokeWidth="1.2" strokeLinecap="round" />

          {/* Giant S.O.S Typography */}
          <text
            x="160"
            y="306"
            textAnchor="middle"
            fill="url(#burgundyLabel)"
            fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="2"
          >
            S·O·S
          </text>

          {/* Antiemborrachamento Badge Bar */}
          <rect x="114" y="315" width="92" height="15" rx="3" fill="url(#burgundyLabel)" />
          <text
            x="160"
            y="325"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="6.4"
            letterSpacing="0.8"
          >
            ANTIEMBORRACHAMENTO
          </text>

          {/* 3 Minutes Callout */}
          <text
            x="160"
            y="346"
            textAnchor="middle"
            fill="#1E232B"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="8.5"
            letterSpacing="0.4"
          >
            RECUPERAÇÃO EM 3 MINUTOS
          </text>

          {/* Product Description */}
          <text
            x="160"
            y="360"
            textAnchor="middle"
            fill="#5D6679"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="600"
            fontSize="6.6"
            letterSpacing="0.3"
          >
            HIDRATAÇÃO DE IMPACTO
          </text>
          <text
            x="160"
            y="370"
            textAnchor="middle"
            fill="#717D96"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="500"
            fontSize="6.2"
            letterSpacing="0.2"
          >
            PRÉ E PÓS QUÍMICA
          </text>

          {/* Steps Indicator / Efeito Teia Badge */}
          <circle cx="160" cy="392" r="9" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="0.8" />
          <text
            x="160"
            y="396"
            textAnchor="middle"
            fill="#8A2C3E"
            fontFamily="'Syne', sans-serif"
            fontWeight="800"
            fontSize="10"
          >
            1
          </text>

          {/* Gold Guarantee Seal Ribbon */}
          <rect x="122" y="416" width="76" height="1" fill="url(#goldMetallic)" />

          {/* Bottle Volume */}
          <text
            x="160"
            y="432"
            textAnchor="middle"
            fill="#1A1C20"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="9.5"
            letterSpacing="1"
          >
            250 mL
          </text>
          <text
            x="160"
            y="442"
            textAnchor="middle"
            fill="#8C94A0"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="500"
            fontSize="6"
            letterSpacing="0.8"
          >
            8.45 fl.oz
          </text>
        </g>

        {/* Glass Surface Highlights */}
        <path d="M214 182 L214 472" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.4" />
      </svg>
    </div>
  );
};
