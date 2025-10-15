import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPreviewCardProps {
    image: string;
    title: string;
    excerpt: string;
    readMore: string;
    link: string;
}

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ image, title, excerpt, readMore, link }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group h-full flex flex-col">
            <div className="overflow-hidden">
                <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">{excerpt}</p>
                <Link to={link} className="font-bold text-gold hover:underline self-start">
                    {readMore} &rarr;
                </Link>
            </div>
        </div>
    );
};

export default BlogPreviewCard;