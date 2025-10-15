import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { blogData } from '../data/blogData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const post = blogData.find(p => p.slug === slug);

    const contentRef = useRef<HTMLDivElement>(null);
    const contentEntry = useIntersectionObserver(contentRef, { threshold: 0.1, triggerOnce: true });
    const isContentVisible = contentEntry?.isIntersecting;

    if (!post) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className={`text-3xl font-bold text-gold ${headingFont}`}>{t('blog_post.not_found')}</h1>
                <Link to="/blog" className="mt-8 inline-block text-gold hover:underline">
                    &larr; {t('blog_post.back_to_blog')}
                </Link>
            </div>
        );
    }
    
    const postContent = post[language];
    const paragraphs = postContent.content.split('\n\n');

    return (
        <div className={`bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
            {/* Hero Image */}
            <div className="h-64 md:h-96 relative">
                <img src={post.image} alt={postContent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            <div className="container mx-auto px-6 -mt-16 md:-mt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12 relative z-10">
                        <h1 className={`text-3xl md:text-5xl font-bold text-gold mb-4 text-center ${headingFont}`}>
                            {postContent.title}
                        </h1>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{t('blog_post.by')} {postContent.author}</span>
                            <span className="mx-2">|</span>
                            <span>{t('blog_post.published_on')} {postContent.date}</span>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <article 
                        ref={contentRef}
                        className={`prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 transition-all duration-700 ease-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                       {paragraphs.map((p, index) => (
                           <p key={index}>{p}</p>
                       ))}
                    </article>

                    <div className="text-center mt-12">
                        <Link to="/blog" className="font-bold text-gold hover:underline">
                            &larr; {t('blog_post.back_to_blog')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;