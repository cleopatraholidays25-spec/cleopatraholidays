import React from 'react';

const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M9.983 3v7.391c0 2.908-2.352 5.261-5.261 5.261h-1.722v-3.956h1.722c.723 0 1.304-.583 1.304-1.305v-7.391h3.957zm10.017 0v7.391c0 2.908-2.353 5.261-5.261 5.261h-1.722v-3.956h1.722c.722 0 1.304-.583 1.304-1.305v-7.391h3.957z"/>
    </svg>
);

export default QuoteIcon;
