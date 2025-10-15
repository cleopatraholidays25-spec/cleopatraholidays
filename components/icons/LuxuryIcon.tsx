
import React from 'react';

const LuxuryIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        <path d="M2.7 10.3a2.41 2.41 0 0 0-1.2 2.1 2.41 2.41 0 0 0 1.2 2.1L12 22l9.3-7.5a2.41 2.41 0 0 0 1.2-2.1 2.41 2.41 0 0 0-1.2-2.1L12 2 2.7 10.3z" />
        <path d="m12 2 10.3 8.3-10.3 4.2-10.3-4.2z" />
        <path d="m2.7 14.5 9.3 7.5 9.3-7.5" />
        <path d="M12 2v20" />
    </svg>
);

export default LuxuryIcon;
