import React, { useRef } from 'react';
import { useI18n } from '../hooks/useI18n';
import BlogPreviewCard from '../components/BlogPreviewCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { blogData } from '../data/blogData';

const BlogPage: React.FC = () => {
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const headerRef = useRef<HTMLDivElement>(null);
    const blogGridRef = useRef<HTMLDivElement>(null);

    const headerEntry = useIntersectionObserver(headerRef, { threshold: 0.1, triggerOnce: true });
    const blogGridEntry = useIntersectionObserver(blogGridRef, { threshold: 0.1, triggerOnce: true });

    const isHeaderVisible = headerEntry?.isIntersecting;
    const isBlogGridVisible = blogGridEntry?.isIntersecting;

    return (
        <div className={`py-16 md:py-24 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
            <div className="container mx-auto px-6">
                <div 
                    ref={headerRef}
                    className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('blog_page.title')}</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{t('blog_page.subtitle')}</p>
                </div>
                
                <div ref={blogGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogData.map((post, index) => {
                      const postContent = post[language];
                      return (
                          <div
                              key={post.slug}
                              className={`transition-all duration-500 ease-out ${isBlogGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                              style={{ transitionDelay: `${100 + (index % 3) * 150}ms` }}
                          >
                              <BlogPreviewCard
                                  image={post.image}
                                  title={postContent.title}
                                  excerpt={postContent.excerpt}
                                  readMore={t('home.blog.read_more')}
                                  link={`/blog/${post.slug}`}
                              />
                          </div>
                      );
                  })}
              </div>
            </div>
        </div>
    );
};

export default BlogPage;