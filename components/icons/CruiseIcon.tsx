import React from 'react';

const CruiseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="2 2 20 20" // smaller viewBox = zoomed-in look
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9" // slightly thinner lines
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Ship deck and structure */}
        <path d="M3 14h18l-2 5H5l-2-5z" />
        <path d="M7 14v-2h10v2" />
        <path d="M9 12V9h6v3" />
        <rect x="10" y="7" width="4" height="2" />
        
        {/* Windows */}
        <circle cx="8" cy="15.5" r="0.6" />
        <circle cx="10.5" cy="15.5" r="0.6" />
        <circle cx="13" cy="15.5" r="0.6" />
        <circle cx="15.5" cy="15.5" r="0.6" />
        
        {/* Waves under the ship */}
        <path d="M-2 20c.8.5 1.6.5 2.4 0s1.6-.5 2.4 0 1.6.5 2.4 0 1.6-.5 2.4 0 1.6.5 2.4 0 1.6-.5 2.4 0 1.6.5 2.4 0 1.6-.5 2.4 0 1.6.5 2.4 0 1.6-.5 2.4 0 1.6.5 2.4 0" />
    </svg>
);

export default CruiseIcon;
