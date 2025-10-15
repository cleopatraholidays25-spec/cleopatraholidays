import React from 'react';

const HotelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <line x1="7" y1="9" x2="9" y2="9" />
        <line x1="15" y1="9" x2="17" y2="9" />
        <line x1="7" y1="13" x2="9" y2="13" />
        <line x1="15" y1="13" x2="17" y2="13" />
    </svg>
);

export default HotelIcon;