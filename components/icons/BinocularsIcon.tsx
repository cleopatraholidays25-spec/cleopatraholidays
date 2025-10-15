import React from 'react';

const BinocularsIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        <circle cx="6" cy="12" r="4" />
        <circle cx="18" cy="12" r="4" />
        <line x1="6" y1="16" x2="6" y2="18" />
        <line x1="18" y1="16" x2="18" y2="18" />
        <path d="M9 12h6" />
        <path d="M12 5l2 3" />
        <path d="M12 5l-2 3" />
    </svg>
);

export default BinocularsIcon;