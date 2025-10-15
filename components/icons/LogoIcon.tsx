import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 50"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Central petal */}
        <path d="M50 10 V 40" />
        {/* Left petal */}
        <path d="M50 40 C 30 40, 30 20, 40 15" />
        {/* Right petal */}
        <path d="M50 40 C 70 40, 70 20, 60 15" />
    </svg>
);

export default LogoIcon;
