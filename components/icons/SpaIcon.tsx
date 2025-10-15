import React from 'react';

const SpaIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H8a3 3 0 0 1 3 3v2.5" />
        <path d="M13 3.5a2.5 2.5 0 0 1 2.5 2.5V8a3 3 0 0 1-3 3H2" />
        <path d="M9.5 16.5a2.5 2.5 0 0 1 2.5-2.5H16a3 3 0 0 1 3 3V20" />
        <path d="M22 8a2.5 2.5 0 0 1-2.5 2.5h-1.5" />
    </svg>
);

export default SpaIcon;