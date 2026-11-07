import React from 'react';

export const KidneyWatermark: React.FC<{ className?: string; opacity?: number }> = ({ 
  className = '', 
  opacity = 0.12 
}) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
    >
      <svg 
        viewBox="0 0 500 700" 
        className="w-[340px] sm:w-[420px] max-h-[560px]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Kidney Gradients */}
          <radialGradient id="leftKidneyGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f3c2b2" />
            <stop offset="40%" stopColor="#df9c8b" />
            <stop offset="85%" stopColor="#c57867" />
            <stop offset="100%" stopColor="#a35747" />
          </radialGradient>
          <radialGradient id="rightKidneyGrad" cx="60%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f3c2b2" />
            <stop offset="40%" stopColor="#df9c8b" />
            <stop offset="85%" stopColor="#c57867" />
            <stop offset="100%" stopColor="#a35747" />
          </radialGradient>
          {/* Bladder Gradient */}
          <radialGradient id="bladderGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fae0d7" />
            <stop offset="60%" stopColor="#e8b1a3" />
            <stop offset="100%" stopColor="#c78677" />
          </radialGradient>
          {/* Aorta Gradient (Red) */}
          <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e57373" />
            <stop offset="50%" stopColor="#ef9a9a" />
            <stop offset="100%" stopColor="#c62828" />
          </linearGradient>
          {/* Vena Cava Gradient (Blue) */}
          <linearGradient id="venaCavaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64b5f6" />
            <stop offset="50%" stopColor="#bbdefb" />
            <stop offset="100%" stopColor="#1976d2" />
          </linearGradient>
          {/* Ureter Gradient */}
          <linearGradient id="ureterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff3e0" />
            <stop offset="50%" stopColor="#ffe0b2" />
            <stop offset="100%" stopColor="#ffcc80" />
          </linearGradient>
        </defs>

        {/* Central Blood Vessels */}
        {/* Abdominal Aorta */}
        <path 
          d="M242 160 L242 330 Q242 340 236 370 L234 400" 
          stroke="url(#aortaGrad)" 
          strokeWidth="16" 
          strokeLinecap="round" 
        />
        {/* Inferior Vena Cava */}
        <path 
          d="M258 170 L258 330 Q258 340 264 370 L266 400" 
          stroke="url(#venaCavaGrad)" 
          strokeWidth="18" 
          strokeLinecap="round" 
        />

        {/* Left Renal Artery & Vein */}
        <path d="M242 225 C210 220 190 230 170 235" stroke="url(#aortaGrad)" strokeWidth="8" strokeLinecap="round" />
        <path d="M256 235 C220 232 195 242 172 245" stroke="url(#venaCavaGrad)" strokeWidth="10" strokeLinecap="round" />

        {/* Right Renal Artery & Vein */}
        <path d="M245 220 C280 216 305 226 328 232" stroke="url(#aortaGrad)" strokeWidth="8" strokeLinecap="round" />
        <path d="M258 230 C285 228 310 238 330 242" stroke="url(#venaCavaGrad)" strokeWidth="10" strokeLinecap="round" />

        {/* Left Kidney (Anatomical Right of image viewer) */}
        <path
          d="M175 185
             C130 185 105 225 105 270
             C105 320 125 365 165 375
             C185 380 205 350 200 310
             C195 275 190 265 178 245
             C172 225 190 185 175 185 Z"
          fill="url(#leftKidneyGrad)"
          stroke="#944838"
          strokeWidth="1.5"
        />

        {/* Right Kidney (Slightly lower due to liver) */}
        <path
          d="M325 195
             C370 195 395 235 395 280
             C395 330 375 375 335 385
             C315 390 295 360 300 320
             C305 285 310 275 322 255
             C328 235 310 195 325 195 Z"
          fill="url(#rightKidneyGrad)"
          stroke="#944838"
          strokeWidth="1.5"
        />

        {/* Renal Pelvis & Ureters */}
        {/* Left Ureter */}
        <path
          d="M185 305
             C178 350 180 430 198 510
             C210 560 225 610 235 635"
          fill="none"
          stroke="#e0af93"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M185 305
             C178 350 180 430 198 510
             C210 560 225 610 235 635"
          fill="none"
          stroke="#fff8e7"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Right Ureter */}
        <path
          d="M315 315
             C322 360 320 440 302 510
             C290 560 275 610 265 635"
          fill="none"
          stroke="#e0af93"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M315 315
             C322 360 320 440 302 510
             C290 560 275 610 265 635"
          fill="none"
          stroke="#fff8e7"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Urinary Bladder (At the bottom, inverted teardrop / balloon shape) */}
        <path
          d="M250 625
             C205 625 190 660 195 700
             C200 740 230 780 250 810
             C270 780 300 740 305 700
             C310 660 295 625 250 625 Z"
          fill="url(#bladderGrad)"
          stroke="#a66254"
          strokeWidth="1.5"
          transform="matrix(1 0 0 0.85 0 95)"
        />

        {/* Subtle highlights */}
        <ellipse cx="145" cy="245" rx="14" ry="32" fill="#fff" opacity="0.25" transform="rotate(-20 145 245)" />
        <ellipse cx="355" cy="255" rx="14" ry="32" fill="#fff" opacity="0.25" transform="rotate(20 355 255)" />
      </svg>
    </div>
  );
};
