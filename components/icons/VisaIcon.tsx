import React from 'react';

interface VisaIconProps {
  className?: string;
}

const VisaIcon: React.FC<VisaIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 512 512" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa Services"
    >
      <rect 
        x="104" y="48" 
        width="360" height="416" 
        rx="12" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="16" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <line 
        x1="104" y1="280" 
        x2="464" y2="280" 
        stroke="currentColor" 
        strokeWidth="16" 
        strokeLinecap="round"
      />
      
      <text 
        x="256" y="200" 
        textAnchor="middle" 
        fontFamily="Arial, sans-serif" 
        fontSize="72" 
        fontWeight="bold" 
        fill="currentColor"
      >
        VISA
      </text>
      
      <circle 
        cx="190" 
        cy="340" 
        r="24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="12"
      />
      
      <path 
        d="M160 400Q160 370 190 370Q220 370 220 400" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      
      <line 
        x1="150" y1="430" 
        x2="250" y2="430" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      
      <line 
        x1="290" y1="350" 
        x2="430" y2="350" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      
      <line 
        x1="290" y1="390" 
        x2="350" y2="390" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      
      <line 
        x1="290" y1="430" 
        x2="350" y2="430" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      
      {[350, 390, 430].map((y) => (
        <React.Fragment key={y}>
          <circle cx="390" cy={y} r="6" fill="currentColor"/>
          <circle cx="420" cy={y} r="6" fill="currentColor"/>
        </React.Fragment>
      ))}
     
      
     
    </svg>
  );
};

export default VisaIcon;
