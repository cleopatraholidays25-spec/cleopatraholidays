import React from 'react';

const TransferIcon: React.FC<{ className?: string }> = ({ className }) => (
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
        {/* Base */}
        <path d="M2 21h20" />
        {/* Tower Shaft */}
        <path d="M10 21V8" />
        <path d="M14 21V8" />
        {/* Control Room */}
        <path d="M8 8h8" />
        <path d="M6 5h12" />
        <path d="M8 8l-2-3" />
        <path d="M16 8l2-3" />
        {/* Antenna */}
        <path d="M12 5V2" />
    </svg>
);

export default TransferIcon;