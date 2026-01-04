import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { ArrowRight } from 'lucide-react';
import matter from 'gray-matter';
import { BlogPost } from '../types';

/**
 * 🔹 BUILD-TIME FILE IMPORT (STATIC, VITE-SAFE)
 */
const blogFiles = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/**
 * 🔹 PARSE POSTS AT BUILD TIME
 * (EXPORTED for BlogDetail.tsx reuse)
 */
export const posts: BlogPost[] = Object.entries(blogFiles)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);

    const slug = path.split('/').pop()?.replace('.md', '') ?? '';

    return {
      id: slug,
      slug,
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      date: data.date ?? '',
      image: data.image ?? null,
      category: data.category ?? '',
      body: content, // ✅ Markdown body
    };
  })
  // 🔥 Newest first
  .sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

/**
 * 🔹 BLOG LIST PAGE
 */
const Blog: React.FC = () => {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="bg-punchline-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black font-heading text-punchline-black mb-6">
              Insights & <span className="text-punchline-blue">Knowledge</span>
            </h1>
            <p className="text-xl text-punchline-gray leading-relaxed">
              CMS-powered thought leadership on sales and marketing trends in Africa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center text-punchline-gray font-bold">
              No posts published yet.
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {posts.map((post, idx) => (
                <FadeIn key={post.id} delay={idx * 0.1}>
                  <article className="group">
                    {/* IMAGE */}
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden mb-6">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                            No Image
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* CONTENT */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-punchline-blue">
                        <span>{post.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400">
                          {post.date
                            ? new Date(post.date).toLocaleDateString()
                            : ''}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold font-heading text-punchline-black group-hover:text-punchline-blue transition-colors leading-tight">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-punchline-gray leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="pt-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center space-x-2 font-bold text-punchline-black group-hover:translate-x-2 transition-transform"
                        >
                          <span>Read Article</span>
                          <ArrowRight size={18} className="text-punchline-blue" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
